import { createFormPoster, FormPoster } from '@bigcommerce/form-poster';
import { createRequestSender } from '@bigcommerce/request-sender';
import { createScriptLoader } from '@bigcommerce/script-loader';
import { EventEmitter } from 'events';

import {
    BuyNowCartRequestBody,
    CartSource,
    CheckoutButtonInitializeOptions,
    InvalidArgumentError,
    PaymentIntegrationService,
    PaymentMethod,
    PaymentMethodCancelledError,
} from '@bigcommerce/checkout-sdk/payment-integration-api';
import {
    getCart,
    getConsignment,
    PaymentIntegrationServiceMock,
} from '@bigcommerce/checkout-sdk/payment-integrations-test-utils';

import GooglePayGateway from './gateways/google-pay-gateway';
import { WithGooglePayButtonInitializeOptions } from './google-pay-button-initialize-option';
import GooglePayButtonStrategy from './google-pay-button-strategy';
import GooglePayPaymentProcessor from './google-pay-payment-processor';
import GooglePayScriptLoader from './google-pay-script-loader';
import getCardDataResponse from './mocks/google-pay-card-data-response.mock';
import { getGeneric } from './mocks/google-pay-payment-method.mock';
import { createInitializeImplementationMock } from './mocks/google-pay-processor-initialize.mock';
import {
    CallbackTriggerType,
    ErrorReasonType,
    GooglePayButtonOptions,
    GooglePayErrorObject,
    GooglePayInitializationData,
    NewShippingOptionParameters,
    NewTransactionInfo,
} from './types';

describe('GooglePayButtonStrategy', () => {
    const CONTAINER_ID = 'my_awesome_google_pay_button_container';

    let buttonStrategy: GooglePayButtonStrategy;
    let button: HTMLButtonElement;
    let paymentIntegrationService: PaymentIntegrationService;
    let processor: GooglePayPaymentProcessor;
    let options: CheckoutButtonInitializeOptions & WithGooglePayButtonInitializeOptions;
    let withBuyNowOptions: CheckoutButtonInitializeOptions & WithGooglePayButtonInitializeOptions;
    let eventEmitter: EventEmitter;
    let scriptLoader: GooglePayScriptLoader;
    let formPoster: FormPoster;
    let mockReturnedPaymentDataChangedValue: NewTransactionInfo & NewShippingOptionParameters;
    let gateway: GooglePayGateway;
    let buyNowCartRequestBody: BuyNowCartRequestBody;
    let buyNowRequiredOptions: {
        buyNowInitializeOptions: {
            getBuyNowCartRequestBody: () => BuyNowCartRequestBody;
        };
    };
    const consignment = getConsignment();
    const expectedSippingOptions = [
        {
            id: consignment.availableShippingOptions![0].id,
            label: consignment.availableShippingOptions![0].description,
            description: '$0.00',
        },
    ];
    const availableGPayShippingOptions = {
        defaultSelectedOptionId: consignment.selectedShippingOption?.id,
        shippingOptions: expectedSippingOptions,
    };
    const mockFn = jest.fn();
    const internalError = new Error('internal error');

    const createInitializeWidgetMock = (error?: unknown) =>
        jest.spyOn(processor, 'initializeWidget').mockImplementation(
            error
                ? () => {
                      throw error;
                  }
                : undefined,
        );
    const prepareInitialize = (
        initializeMockCallback: ReturnType<typeof createInitializeImplementationMock>,
    ) => {
        jest.spyOn(processor, 'initialize').mockImplementation(initializeMockCallback);

        jest.spyOn(processor, 'showPaymentSheet').mockImplementation(() => {
            eventEmitter.emit('onPaymentDataChanged');

            return Promise.resolve(getCardDataResponse());
        });
    };

    beforeEach(() => {
        jest.clearAllMocks();

        eventEmitter = new EventEmitter();

        paymentIntegrationService = new PaymentIntegrationServiceMock();

        buyNowCartRequestBody = {
            source: CartSource.BuyNow,
            lineItems: [
                {
                    productId: 1,
                    quantity: 2,
                    optionSelections: {
                        optionId: 11,
                        optionValue: 11,
                    },
                },
            ],
        };

        buyNowRequiredOptions = {
            buyNowInitializeOptions: {
                getBuyNowCartRequestBody: jest.fn().mockReturnValue(buyNowCartRequestBody),
            },
        };

        options = {
            methodId: 'googlepaybraintree',
            containerId: CONTAINER_ID,
            googlepaybraintree: {
                onError: jest.fn(),
            },
        };

        withBuyNowOptions = {
            ...options,
            googlepaybraintree: {
                buyNowInitializeOptions: buyNowRequiredOptions.buyNowInitializeOptions,
                currencyCode: 'USD',
            },
        };

        formPoster = createFormPoster();
        jest.spyOn(formPoster, 'postForm').mockImplementation(
            (_url, _data, callback) => callback && callback(),
        );

        jest.spyOn(paymentIntegrationService.getState(), 'getPaymentMethodOrThrow').mockReturnValue(
            getGeneric(),
        );

        button = document.createElement('button');
        jest.spyOn(button, 'remove');

        scriptLoader = new GooglePayScriptLoader(createScriptLoader());

        gateway = new GooglePayGateway('example', paymentIntegrationService);
        processor = new GooglePayPaymentProcessor(
            scriptLoader,
            gateway,
            createRequestSender(),
            formPoster,
        );

        jest.spyOn(processor, 'handleCoupons').mockResolvedValue({
            newOfferInfo: {
                offers: [{ description: 'Coupon description', redemptionCode: 'code' }],
            },
        });

        jest.spyOn(processor, 'showPaymentSheet').mockResolvedValue(getCardDataResponse());
        jest.spyOn(processor, 'setExternalCheckoutForm').mockResolvedValue(undefined);

        jest.spyOn(processor, 'initialize').mockResolvedValue(undefined);

        createInitializeWidgetMock();

        jest.spyOn(processor, 'addPaymentButton').mockImplementation(
            (_: string, buttonOptions: Omit<GooglePayButtonOptions, 'allowedPaymentMethods'>) => {
                button.onclick = async (event) => {
                    try {
                        await buttonOptions.onClick(event);
                    } catch (e) {
                        mockFn(e);
                    }
                };

                return button;
            },
        );
        jest.spyOn(processor, 'signOut').mockResolvedValue(undefined);

        jest.spyOn(processor, 'getCallbackTriggers').mockReturnValue({
            availableTriggers: [
                CallbackTriggerType.INITIALIZE,
                CallbackTriggerType.SHIPPING_ADDRESS,
                CallbackTriggerType.SHIPPING_OPTION,
                CallbackTriggerType.OFFER,
            ],
            initializationTrigger: [CallbackTriggerType.INITIALIZE],
            addressChangeTriggers: [
                CallbackTriggerType.INITIALIZE,
                CallbackTriggerType.SHIPPING_ADDRESS,
            ],
            shippingOptionsChangeTriggers: [CallbackTriggerType.SHIPPING_OPTION],
            offerChangeTriggers: [CallbackTriggerType.OFFER],
        });

        buttonStrategy = new GooglePayButtonStrategy(paymentIntegrationService, processor);
    });

    describe('#initialize', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('initialization of strategy with buy now required options', () => {
            it('should initialize the strategy', async () => {
                expect(await buttonStrategy.initialize(withBuyNowOptions)).toBeUndefined();
                expect(paymentIntegrationService.loadDefaultCheckout).not.toHaveBeenCalled();
            });

            it('should initialize processor', async () => {
                const getPaymentMethod = () =>
                    (
                        (processor.initialize as jest.Mock).mock
                            .calls[0][0] as () => PaymentMethod<GooglePayInitializationData>
                    )();
                const paymentMethod = getGeneric();

                jest.spyOn(
                    paymentIntegrationService.getState(),
                    'getPaymentMethodOrThrow',
                ).mockReturnValue(paymentMethod);

                await buttonStrategy.initialize(withBuyNowOptions);

                expect(getPaymentMethod()).toBe(paymentMethod);
            });

            it('should create Buy Now cart on google pay button click', async () => {
                const initializeMock = createInitializeImplementationMock(
                    eventEmitter,
                    CallbackTriggerType.INITIALIZE,
                );

                prepareInitialize(initializeMock);

                await buttonStrategy.initialize(withBuyNowOptions);

                button.click();

                expect(paymentIntegrationService.loadCheckout).not.toHaveBeenCalled();
                expect(paymentIntegrationService.createBuyNowCart).toHaveBeenCalled();
                expect(paymentIntegrationService.updateShippingAddress).not.toHaveBeenCalled();
            });

            it('should update transactional data with available shipping options', async () => {
                const handleShippingOptionChangeMock = jest.spyOn(
                    processor,
                    'handleShippingOptionChange',
                );

                jest.spyOn(processor, 'handleShippingAddressChange').mockResolvedValue(
                    Promise.resolve(availableGPayShippingOptions),
                );

                jest.spyOn(paymentIntegrationService, 'createBuyNowCart').mockResolvedValue(
                    getCart(),
                );

                const initializeMock = createInitializeImplementationMock(
                    eventEmitter,
                    CallbackTriggerType.INITIALIZE,
                    (res) => {
                        if (res) {
                            mockReturnedPaymentDataChangedValue = res;
                        }
                    },
                );

                prepareInitialize(initializeMock);

                await buttonStrategy.initialize(withBuyNowOptions);

                button.click();

                await new Promise((resolve) => process.nextTick(resolve));

                expect(paymentIntegrationService.createBuyNowCart).toHaveBeenCalled();
                expect(handleShippingOptionChangeMock).not.toHaveBeenCalled();
                expect(mockReturnedPaymentDataChangedValue).toStrictEqual({
                    newTransactionInfo: {
                        countryCode: 'US',
                        currencyCode: 'USD',
                        totalPriceStatus: 'FINAL',
                        totalPrice: '190.00',
                    },
                    newShippingOptionParameters: availableGPayShippingOptions,
                });
            });

            it('should not create buy now cart on address change event', async () => {
                jest.spyOn(processor, 'handleShippingAddressChange').mockResolvedValue(
                    Promise.resolve(availableGPayShippingOptions),
                );

                jest.spyOn(paymentIntegrationService, 'createBuyNowCart').mockResolvedValue(
                    getCart(),
                );

                const initializeMock = createInitializeImplementationMock(
                    eventEmitter,
                    CallbackTriggerType.SHIPPING_ADDRESS,
                    (res) => {
                        if (res) {
                            mockReturnedPaymentDataChangedValue = res;
                        }
                    },
                );

                prepareInitialize(initializeMock);

                await buttonStrategy.initialize(withBuyNowOptions);

                button.click();

                await new Promise((resolve) => process.nextTick(resolve));

                expect(paymentIntegrationService.createBuyNowCart).toHaveBeenCalledTimes(1);
            });
        });

        it('throw an error on wallet button click', async () => {
            const rejectedInitializeWidgetMock = createInitializeWidgetMock(internalError);

            await buttonStrategy.initialize(options);

            button.click();

            await new Promise((resolve) => process.nextTick(resolve));

            expect(rejectedInitializeWidgetMock).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith(internalError);
        });

        it('triggers onError callback on wallet button click', async () => {
            const rejectedInitializeWidgetMock = createInitializeWidgetMock(internalError);

            await buttonStrategy.initialize(options);

            button.click();

            await new Promise((resolve) => process.nextTick(resolve));

            expect(rejectedInitializeWidgetMock).toHaveBeenCalledTimes(1);
            expect(options.googlepaybraintree?.onError).toHaveBeenCalled();
        });

        it('throw a canceled error on wallet button click', async () => {
            const googlePayErrorObject: GooglePayErrorObject = {
                statusCode: 'CANCELED',
                statusMessage: 'Canceled',
            };

            const rejectedInitializeWidgetMock = createInitializeWidgetMock(googlePayErrorObject);

            await buttonStrategy.initialize(options);

            button.click();

            await new Promise((resolve) => process.nextTick(resolve));

            expect(rejectedInitializeWidgetMock).toHaveBeenCalledTimes(1);
            expect(mockFn.mock.calls[0][0]).toBeInstanceOf(PaymentMethodCancelledError);
        });

        describe('initialization of strategy without buy now required options', () => {
            it('should initialize the strategy', async () => {
                const paymentDataCallbacks = () =>
                    (processor.initialize as jest.Mock).mock.calls[0][1];
                const initializeWidgetMock = jest.spyOn(processor, 'initializeWidget');

                expect(await buttonStrategy.initialize(options)).toBeUndefined();
                expect(paymentIntegrationService.loadDefaultCheckout).toHaveBeenCalled();
                expect(paymentDataCallbacks()).toBeDefined();
                expect(initializeWidgetMock).not.toHaveBeenCalled();
            });

            it('should load checkout via onPaymentDataChanged callback on clicking the google pay button', async () => {
                const initializeMock = createInitializeImplementationMock(
                    eventEmitter,
                    CallbackTriggerType.INITIALIZE,
                    (res) => {
                        if (res) {
                            mockReturnedPaymentDataChangedValue = res;
                        }
                    },
                );

                prepareInitialize(initializeMock);

                const initializeWidgetMock = jest.spyOn(processor, 'initializeWidget');

                await buttonStrategy.initialize(options);

                button.click();

                await new Promise((resolve) => process.nextTick(resolve));

                expect(paymentIntegrationService.loadCheckout).toHaveBeenCalled();
                expect(paymentIntegrationService.createBuyNowCart).not.toHaveBeenCalled();
                expect(initializeWidgetMock).toHaveBeenCalledTimes(1);
            });

            it('should skip initialization for unsupported GPay trigger', async () => {
                jest.spyOn(processor, 'getCallbackTriggers').mockReturnValue({
                    availableTriggers: [],
                    initializationTrigger: [],
                    addressChangeTriggers: [],
                    shippingOptionsChangeTriggers: [],
                });

                const initializeMock = createInitializeImplementationMock(
                    eventEmitter,
                    CallbackTriggerType.INITIALIZE,
                    (res) => {
                        if (res) {
                            mockReturnedPaymentDataChangedValue = res;
                        }
                    },
                );

                prepareInitialize(initializeMock);

                await buttonStrategy.initialize(options);

                button.click();

                await new Promise((resolve) => process.nextTick(resolve));

                expect(paymentIntegrationService.loadCheckout).not.toHaveBeenCalled();
                expect(paymentIntegrationService.createBuyNowCart).not.toHaveBeenCalled();
            });

            it('should update available shipping address', async () => {
                const handleShippingOptionChangeMock = jest.spyOn(
                    processor,
                    'handleShippingOptionChange',
                );

                jest.spyOn(
                    paymentIntegrationService.getState(),
                    'getPaymentMethodOrThrow',
                ).mockReturnValue({
                    ...getGeneric(),
                    initializationData: undefined,
                });

                jest.spyOn(processor, 'handleShippingAddressChange').mockResolvedValue(
                    Promise.resolve(availableGPayShippingOptions),
                );

                const initializeMock = createInitializeImplementationMock(
                    eventEmitter,
                    CallbackTriggerType.INITIALIZE,
                    (res) => {
                        if (res) {
                            mockReturnedPaymentDataChangedValue = res;
                        }
                    },
                );

                prepareInitialize(initializeMock);

                await buttonStrategy.initialize(options);

                button.click();

                await new Promise((resolve) => process.nextTick(resolve));

                expect(mockReturnedPaymentDataChangedValue).toStrictEqual({
                    newTransactionInfo: {
                        currencyCode: 'USD',
                        totalPriceStatus: 'FINAL',
                        totalPrice: '190.00',
                    },
                    newShippingOptionParameters: availableGPayShippingOptions,
                });
                expect(handleShippingOptionChangeMock).not.toHaveBeenCalled();
            });

            it('should update shipping option', async () => {
                const handleShippingOptionChangeMock = jest.spyOn(
                    processor,
                    'handleShippingOptionChange',
                );

                const handleShippingAddressChange = jest.spyOn(
                    processor,
                    'handleShippingAddressChange',
                );

                const initializeMock = createInitializeImplementationMock(
                    eventEmitter,
                    CallbackTriggerType.SHIPPING_OPTION,
                    (res) => {
                        if (res) {
                            mockReturnedPaymentDataChangedValue = res;
                        }
                    },
                );

                prepareInitialize(initializeMock);

                await buttonStrategy.initialize(options);

                button.click();

                await new Promise((resolve) => process.nextTick(resolve));

                expect(mockReturnedPaymentDataChangedValue).toStrictEqual({
                    newTransactionInfo: {
                        countryCode: 'US',
                        currencyCode: 'USD',
                        totalPriceStatus: 'FINAL',
                        totalPrice: '190.00',
                    },
                });
                expect(handleShippingOptionChangeMock).toHaveBeenCalledWith(
                    consignment.selectedShippingOption?.id,
                );
                expect(handleShippingAddressChange).not.toHaveBeenCalled();
            });

            it('should initialize processor', async () => {
                const getPaymentMethod = () =>
                    (
                        (processor.initialize as jest.Mock).mock
                            .calls[0][0] as () => PaymentMethod<GooglePayInitializationData>
                    )();
                const paymentMethod = getGeneric();

                jest.spyOn(
                    paymentIntegrationService.getState(),
                    'getPaymentMethodOrThrow',
                ).mockReturnValue(paymentMethod);

                await buttonStrategy.initialize(options);

                expect(getPaymentMethod()).toBe(paymentMethod);
            });
        });

        it('should fail silently if Google Pay is not supported', async () => {
            jest.spyOn(processor, 'initialize').mockRejectedValue(
                new Error('Google Pay is not supported'),
            );

            try {
                await buttonStrategy.initialize(options);
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(processor.addPaymentButton).not.toHaveBeenCalled();
            }
        });

        it('should add payment button', async () => {
            await buttonStrategy.initialize(options);

            expect(processor.addPaymentButton).toHaveBeenCalledWith(CONTAINER_ID, {
                buttonColor: 'default',
                buttonType: 'plain',
                onClick: expect.any(Function),
            });
        });

        describe('Coupons', () => {
            it('should call handleCoupons on initialize', async () => {
                const initializeMock = createInitializeImplementationMock(
                    eventEmitter,
                    CallbackTriggerType.OFFER,
                    (res) => {
                        if (res) {
                            mockReturnedPaymentDataChangedValue = res;
                        }
                    },
                );

                prepareInitialize(initializeMock);

                await buttonStrategy.initialize(options);

                button.click();

                await new Promise((resolve) => process.nextTick(resolve));

                expect(processor.handleCoupons).toHaveBeenCalledWith({
                    redemptionCodes: ['coupon_code'],
                });
            });

            it('should update offers data', async () => {
                const initializeMock = createInitializeImplementationMock(
                    eventEmitter,
                    CallbackTriggerType.OFFER,
                    (res) => {
                        if (res) {
                            mockReturnedPaymentDataChangedValue = res;
                        }
                    },
                );

                prepareInitialize(initializeMock);

                await buttonStrategy.initialize(options);

                button.click();

                await new Promise((resolve) => process.nextTick(resolve));

                expect(mockReturnedPaymentDataChangedValue).toStrictEqual({
                    newTransactionInfo: {
                        countryCode: 'US',
                        currencyCode: 'USD',
                        totalPriceStatus: 'FINAL',
                        totalPrice: '190.00',
                    },
                    newOfferInfo: {
                        offers: [
                            {
                                description: 'Coupon description',
                                redemptionCode: 'code',
                            },
                        ],
                    },
                });
            });

            it('should return a Google Pay error', async () => {
                jest.spyOn(processor, 'handleCoupons').mockResolvedValue({
                    error: {
                        message: 'Error message',
                        reason: ErrorReasonType.OFFER_INVALID,
                        intent: CallbackTriggerType.OFFER,
                    },
                    newOfferInfo: {
                        offers: [],
                    },
                });

                const initializeMock = createInitializeImplementationMock(
                    eventEmitter,
                    CallbackTriggerType.OFFER,
                    (res) => {
                        if (res) {
                            mockReturnedPaymentDataChangedValue = res;
                        }
                    },
                );

                prepareInitialize(initializeMock);

                await buttonStrategy.initialize(options);

                button.click();

                await new Promise((resolve) => process.nextTick(resolve));

                expect(mockReturnedPaymentDataChangedValue).toStrictEqual({
                    newTransactionInfo: {
                        countryCode: 'US',
                        currencyCode: 'USD',
                        totalPriceStatus: 'FINAL',
                        totalPrice: '190.00',
                    },
                    error: {
                        message: 'Error message',
                        reason: ErrorReasonType.OFFER_INVALID,
                        intent: CallbackTriggerType.OFFER,
                    },
                    newOfferInfo: {
                        offers: [],
                    },
                });
            });
        });

        describe('should fail if:', () => {
            test('containerId is missing', async () => {
                const initialize = buttonStrategy.initialize({
                    ...options,
                    containerId: '',
                });

                await expect(initialize).rejects.toThrow(InvalidArgumentError);
            });

            test('methodId is empty', async () => {
                options.methodId = '';

                const initialize = buttonStrategy.initialize(options);

                await expect(initialize).rejects.toThrow(InvalidArgumentError);
            });

            test('methodId is not a google pay key', async () => {
                options.methodId = 'foo';

                const initialize = buttonStrategy.initialize(options);

                await expect(initialize).rejects.toThrow(InvalidArgumentError);
            });

            test('googlePayOptions is missing', async () => {
                delete options.googlepaybraintree;

                const initialize = buttonStrategy.initialize(options);

                await expect(initialize).rejects.toThrow(InvalidArgumentError);
            });

            test('currencyCode is missing (Buy Now Flow)', async () => {
                const initialize = buttonStrategy.initialize({
                    ...withBuyNowOptions,
                    googlepaybraintree: {
                        ...withBuyNowOptions.googlepaybraintree,
                        currencyCode: undefined,
                    },
                });

                await expect(initialize).rejects.toThrow(InvalidArgumentError);
            });
        });
    });

    describe('#deinitialize', () => {
        it('should deinitialize the strategy', async () => {
            const deinitialize = buttonStrategy.deinitialize();

            await expect(deinitialize).resolves.toBeUndefined();
        });

        it('should remove payment button', async () => {
            await buttonStrategy.initialize(options);
            await buttonStrategy.deinitialize();

            expect(button.remove).toHaveBeenCalled();
        });
    });
});
