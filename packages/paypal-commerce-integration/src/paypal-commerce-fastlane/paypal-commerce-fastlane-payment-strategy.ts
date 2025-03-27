import {
    CardInstrument,
    InvalidArgumentError,
    isHostedInstrumentLike,
    isVaultedInstrument,
    OrderFinalizationNotRequiredError,
    OrderPaymentRequestBody,
    OrderRequestBody,
    Payment,
    PaymentArgumentInvalidError,
    PaymentInitializeOptions,
    PaymentIntegrationService,
    PaymentMethodClientUnavailableError,
    PaymentRequestOptions,
    PaymentStrategy,
    VaultedInstrument,
} from '@bigcommerce/checkout-sdk/payment-integration-api';
import {
    getFastlaneStyles,
    isPayPalFastlaneCustomer,
    PayPalCommerceFastlaneUtils,
    PayPalCommerceInitializationData,
    PayPalCommerceSdk,
    PayPalFastlaneAuthenticationState,
    PayPalFastlaneCardComponentMethods,
    PayPalFastlaneCardComponentOptions,
    PayPalFastlanePaymentFormattedPayload,
} from '@bigcommerce/checkout-sdk/paypal-commerce-utils';

import PayPalCommerceRequestSender from '../paypal-commerce-request-sender';

import { WithPayPalCommerceFastlanePaymentInitializeOptions } from './paypal-commerce-fastlane-payment-initialize-options';
import { LiabilityShiftEnum } from '../paypal-commerce-types';

export default class PaypalCommerceFastlanePaymentStrategy implements PaymentStrategy {
    private paypalComponentMethods?: PayPalFastlaneCardComponentMethods;
    private paypal3DSecure?: any;
    private paypalFastlaneSdk?: any;

    constructor(
        private paymentIntegrationService: PaymentIntegrationService,
        private paypalCommerceRequestSender: PayPalCommerceRequestSender,
        private paypalCommerceSdk: PayPalCommerceSdk,
        private paypalCommerceFastlaneUtils: PayPalCommerceFastlaneUtils,
    ) {}

    /**
     *
     * Default methods
     *
     * */
    async initialize(
        options: PaymentInitializeOptions & WithPayPalCommerceFastlanePaymentInitializeOptions,
    ): Promise<void> {
        const { methodId, paypalcommercefastlane } = options;

        if (!methodId) {
            throw new InvalidArgumentError(
                'Unable to initialize payment because "options.methodId" argument is not provided.',
            );
        }

        if (!paypalcommercefastlane) {
            throw new InvalidArgumentError(
                'Unable to initialize payment because "options.paypalcommercefastlane" argument is not provided.',
            );
        }

        if (!paypalcommercefastlane.onInit || typeof paypalcommercefastlane.onInit !== 'function') {
            throw new InvalidArgumentError(
                'Unable to initialize payment because "options.paypalcommercefastlane.onInit" argument is not provided or it is not a function.',
            );
        }

        if (
            !paypalcommercefastlane.onChange ||
            typeof paypalcommercefastlane.onChange !== 'function'
        ) {
            throw new InvalidArgumentError(
                'Unable to initialize payment because "options.paypalcommercefastlane.onChange" argument is not provided or it is not a function.',
            );
        }

        await this.paymentIntegrationService.loadPaymentMethod(methodId);

        const state = this.paymentIntegrationService.getState();
        const cart = state.getCartOrThrow();
        const paymentMethod =
            state.getPaymentMethodOrThrow<PayPalCommerceInitializationData>(methodId);
        const { isDeveloperModeApplicable, isFastlaneStylingEnabled } =
            paymentMethod.initializationData || {};

        this.paypalFastlaneSdk = await this.paypalCommerceSdk.getPayPalFastlaneSdk(
            paymentMethod,
            cart.currency.code,
            cart.id,
        );

        this.paypal3DSecure = await this.paypalCommerceSdk.getPayPal3DSecure(
            paymentMethod,
            cart.currency.code,
        );

        const paypalFastlaneStyling = isFastlaneStylingEnabled
            ? paymentMethod?.initializationData?.fastlaneStyles
            : {};

        const fastlaneStyles = getFastlaneStyles(
            paypalFastlaneStyling,
            paypalcommercefastlane?.styles,
        );

        await this.paypalCommerceFastlaneUtils.initializePayPalFastlane(
            this.paypalFastlaneSdk,
            !!isDeveloperModeApplicable,
            fastlaneStyles,
        );

        if (this.shouldRunAuthenticationFlow()) {
            await this.runPayPalAuthenticationFlowOrThrow(methodId);
        }

        await this.initializePayPalPaymentComponent();

        paypalcommercefastlane.onInit((container: string) =>
            this.renderPayPalPaymentComponent(container),
        );
        paypalcommercefastlane.onChange(() => this.handlePayPalStoredInstrumentChange(methodId));
    }

    async execute(orderRequest: OrderRequestBody, options?: PaymentRequestOptions): Promise<void> {
        const { payment, ...order } = orderRequest;

        if (!payment) {
            throw new PaymentArgumentInvalidError(['payment']);
        }

        const { paymentData, methodId } = payment;

        const isVaultedFlow = paymentData && isVaultedInstrument(paymentData);

        try {
            const paymentPayload = isVaultedFlow
                ? await this.prepareVaultedInstrumentPaymentPayload(methodId, paymentData)
                : await this.preparePaymentPayload(methodId, paymentData);

            await this.paymentIntegrationService.submitOrder(order, options);
            await this.paymentIntegrationService.submitPayment<PayPalFastlanePaymentFormattedPayload>(
                paymentPayload,
            );

            // TODO: we should probably update this method with removeStorageSessionId for better reading experience
            this.paypalCommerceFastlaneUtils.updateStorageSessionId(true);
        } catch (error) {
            if (error instanceof Error && error.name !== 'FastlaneError') {
                throw error;
            }

            return Promise.reject();
        }
    }

    finalize(): Promise<void> {
        return Promise.reject(new OrderFinalizationNotRequiredError());
    }

    async deinitialize(): Promise<void> {
        return Promise.resolve();
    }

    /**
     *
     * Authentication flow methods
     *
     */
    private shouldRunAuthenticationFlow(): boolean {
        const state = this.paymentIntegrationService.getState();
        const cart = state.getCartOrThrow();
        const customer = state.getCustomerOrThrow();
        const paymentProviderCustomer = state.getPaymentProviderCustomer();
        const paypalFastlaneCustomer = isPayPalFastlaneCustomer(paymentProviderCustomer)
            ? paymentProviderCustomer
            : {};

        const paypalFastlaneSessionId = this.paypalCommerceFastlaneUtils.getStorageSessionId();

        if (
            !customer.isGuest ||
            paypalFastlaneCustomer?.authenticationState ===
                PayPalFastlaneAuthenticationState.CANCELED
        ) {
            return false;
        }

        return !paypalFastlaneCustomer?.authenticationState && paypalFastlaneSessionId === cart.id;
    }

    private async runPayPalAuthenticationFlowOrThrow(methodId: string): Promise<void> {
        try {
            const state = this.paymentIntegrationService.getState();
            const cart = state.getCartOrThrow();
            const customer = state.getCustomer();
            const billingAddress = state.getBillingAddress();
            const customerEmail = customer?.email || billingAddress?.email || '';

            const { customerContextId } =
                await this.paypalCommerceFastlaneUtils.lookupCustomerOrThrow(customerEmail);

            const authenticationResult =
                await this.paypalCommerceFastlaneUtils.triggerAuthenticationFlowOrThrow(
                    customerContextId,
                );

            const { authenticationState, addresses, instruments } =
                this.paypalCommerceFastlaneUtils.mapPayPalFastlaneProfileToBcCustomerData(
                    methodId,
                    authenticationResult,
                );

            await this.paymentIntegrationService.updatePaymentProviderCustomer({
                authenticationState,
                addresses,
                instruments,
            });

            const isAuthenticationFlowCanceled =
                authenticationResult.authenticationState ===
                PayPalFastlaneAuthenticationState.CANCELED;

            this.paypalCommerceFastlaneUtils.updateStorageSessionId(
                isAuthenticationFlowCanceled,
                cart.id,
            );
        } catch (error) {
            // Info: Do not throw anything here to avoid blocking customer from passing checkout flow
        }
    }

    /**
     *
     * PayPal Fastlane Card Component rendering method
     *
     */
    private async initializePayPalPaymentComponent(): Promise<void> {
        const state = this.paymentIntegrationService.getState();
        const billingAddress = state.getBillingAddressOrThrow();
        const phone = billingAddress.phone;
        const fullName = `${billingAddress.firstName} ${billingAddress.lastName}`.trim();

        const paypalFastlane = this.paypalCommerceFastlaneUtils.getPayPalFastlaneOrThrow();

        const cardComponentOptions: PayPalFastlaneCardComponentOptions = {
            fields: {
                cardholderName: {
                    prefill: fullName,
                    enabled: true,
                },
                ...(phone && {
                    phoneNumber: {
                        prefill: phone,
                    },
                }),
            },
        };

        this.paypalComponentMethods = await paypalFastlane.FastlaneCardComponent(
            cardComponentOptions,
        );
    }

    private renderPayPalPaymentComponent(container?: string): void {
        const paypalComponentMethods = this.getPayPalComponentMethodsOrThrow();

        if (!container) {
            throw new InvalidArgumentError(
                'Unable to render card component because "container" argument is not provided.',
            );
        }

        paypalComponentMethods.render(container);
    }

    private getPayPalComponentMethodsOrThrow(): PayPalFastlaneCardComponentMethods {
        if (!this.paypalComponentMethods) {
            throw new PaymentMethodClientUnavailableError();
        }

        return this.paypalComponentMethods;
    }

    /**
     *
     * Payment Payload preparation methods
     *
     */
    private async prepareVaultedInstrumentPaymentPayload(
        methodId: string,
        paymentData: VaultedInstrument,
    ): Promise<Payment<PayPalFastlanePaymentFormattedPayload>> {
        const { instrumentId } = paymentData;
        const state = this.paymentIntegrationService.getState();
        const cartId = state.getCartOrThrow().id;
        // const paymentMethod =
        //     state.getPaymentMethodOrThrow<PayPalCommerceInitializationData>(methodId);

        const { orderId } = await this.paypalCommerceRequestSender.createOrder(methodId, {
            cartId,
            fastlaneToken: instrumentId,
        });

        const fastlaneToken = await this.get3DSNonce(instrumentId);
        // const fastlaneToken = paymentMethod.config.is3dsEnabled
        //     ? await this.get3DSNonce(instrumentId)
        //     : instrumentId;

        return {
            methodId,
            paymentData: {
                formattedPayload: {
                    paypal_fastlane_token: {
                        order_id: orderId,
                        token: fastlaneToken,
                    },
                },
            },
        };
    }

    private async preparePaymentPayload(
        methodId: string,
        paymentData: OrderPaymentRequestBody['paymentData'],
    ): Promise<Payment<PayPalFastlanePaymentFormattedPayload>> {
        const state = this.paymentIntegrationService.getState();
        const cartId = state.getCartOrThrow().id;
        const billingAddress = state.getBillingAddressOrThrow();
        // const paymentMethod =
        //     state.getPaymentMethodOrThrow<PayPalCommerceInitializationData>(methodId);

        const fullName = `${billingAddress.firstName} ${billingAddress.lastName}`.trim();

        const { getPaymentToken } = this.getPayPalComponentMethodsOrThrow();

        const { id } = await getPaymentToken({
            name: { fullName },
            billingAddress: this.paypalCommerceFastlaneUtils.mapBcToPayPalAddress(billingAddress),
        });

        const { orderId } = await this.paypalCommerceRequestSender.createOrder(methodId, {
            cartId,
            fastlaneToken: id,
        });

        // const fastlaneToken = paymentMethod.config.is3dsEnabled
        //     ? await this.get3DSNonce(id)
        //     : id;

        const fastlaneToken = await this.get3DSNonce(id);

        const { shouldSaveInstrument = false, shouldSetAsDefaultInstrument = false } =
            isHostedInstrumentLike(paymentData) ? paymentData : {};

        return {
            methodId,
            paymentData: {
                ...paymentData,
                shouldSaveInstrument,
                shouldSetAsDefaultInstrument,
                formattedPayload: {
                    paypal_fastlane_token: {
                        order_id: orderId,
                        token: fastlaneToken,
                    },
                },
            },
        };
    }

    /**
     *
     * 3DSecure methods
     *
     * */
    async get3DSNonce(nonce: string): Promise<string> {
        const state = this.paymentIntegrationService.getState();
        const cart = state.getCartOrThrow();

        const threeDomainSecureComponent = this.paypal3DSecure?.ThreeDomainSecureClient || this.paypalFastlaneSdk?.ThreeDomainSecureClient;

        console.log('threeDomainSecureComponent', { threeDomainSecureComponent });

        if (!threeDomainSecureComponent) {
            throw new Error(); // TODO: add Payment client error
        }

        const threeDomainSecureParameters = {
            amount: cart.cartAmount,
            currency: cart.currency.code,
            nonce,
            threeDSRequested: true, // TODO: Sets SCA_ALWAYS in the eligibility API request, otherwise defaults to SCA_WHEN_REQUIRED
            // Should be optional. Asked PayPal when its ready on their side
            transactionContext: {
                experience_context: {
                    brand_name: "YourBrandName",
                    locale: "en-US",
                    return_url: "https://example.com/returnUrl",
                    cancel_url: "https://example.com/cancelUrl",
                },
            },
        };

        const isThreeDomainSecureEligible = await threeDomainSecureComponent.isEligible(
            threeDomainSecureParameters,
        );

        if (isThreeDomainSecureEligible) {
            const {
                liabilityShift, // "no", "unknown", "possible"
                authenticationState, // "success", "cancelled", "errored"
                nonce, //Enriched nonce or the original nonce
            } = await threeDomainSecureComponent.show();

            if (liabilityShift === LiabilityShiftEnum.No || liabilityShift === LiabilityShiftEnum.Unknown) {
                throw new Error(); // TODO: specify an error
            }

            if (authenticationState === "success") {
                return nonce;
            }

            // Cancelled or errored, merchant can choose to send the customer back to 3D Secure or submit a payment and or vault the payment token.
            if (authenticationState === 'errored') {
                throw new Error();
            }

            if (authenticationState === 'canceled') {
                console.log('3DS check was canceled');
            }

        }

        console.log('isThreeDomainSecureEligible is false');

        // TODO: what to return here?
        return nonce;
    }

    /**
     *
     * PayPal Fastlane instrument change
     *
     */
    private async handlePayPalStoredInstrumentChange(
        methodId: string,
    ): Promise<CardInstrument | undefined> {
        const paypalAxoSdk = this.paypalCommerceFastlaneUtils.getPayPalFastlaneOrThrow();

        const { selectionChanged, selectedCard } = await paypalAxoSdk.profile.showCardSelector();

        if (selectionChanged) {
            const state = this.paymentIntegrationService.getState();
            const paymentProviderCustomer = state.getPaymentProviderCustomer();
            const paypalFastlaneCustomer = isPayPalFastlaneCustomer(paymentProviderCustomer)
                ? paymentProviderCustomer
                : {};

            const selectedInstrument = this.paypalCommerceFastlaneUtils.mapPayPalToBcInstrument(
                methodId,
                selectedCard,
            )[0];

            await this.paymentIntegrationService.updatePaymentProviderCustomer({
                ...paypalFastlaneCustomer,
                instruments: [selectedInstrument],
            });

            return selectedInstrument;
        }

        return undefined;
    }
}
