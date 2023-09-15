import { ScriptLoader } from '@bigcommerce/script-loader';

import {
    PaymentMethodClientUnavailableError,
    StoreConfig,
} from '@bigcommerce/checkout-sdk/payment-integration-api';

import { BRAINTREE_SDK_ALPHA_VERSION, BRAINTREE_SDK_STABLE_VERSION } from './constants';
import {
    BraintreeBankAccountCreator,
    BraintreeClientCreator,
    BraintreeConnectCreator,
    BraintreeDataCollectorCreator,
    BraintreeHostWindow,
    BraintreeLocalPaymentCreator,
    BraintreePaypalCheckoutCreator,
} from './types';

// TODO: we can avoid loading the same script several times by checking the data
// availability in the this.braintreeHostWindow (example this.braintreeHostWindow.braintree.client).
// So we can speed up checkout or other flows by avoiding loading the same script several times
export default class BraintreeScriptLoader {
    private braintreeSdkVersion = BRAINTREE_SDK_STABLE_VERSION;

    constructor(
        private scriptLoader: ScriptLoader,
        private braintreeHostWindow: BraintreeHostWindow,
    ) {}

    // TODO: this method can be removed when we get stable version for Braintree PayPal Connect
    initialize(storeConfig: StoreConfig) {
        const features = storeConfig.checkoutSettings.features;
        const shouldUseBraintreeAlphaVersion =
            features['PROJECT-5505.PayPal_Accelerated_Checkout_v2_for_Braintree'];

        this.braintreeSdkVersion = shouldUseBraintreeAlphaVersion
            ? BRAINTREE_SDK_ALPHA_VERSION
            : BRAINTREE_SDK_STABLE_VERSION;
    }

    async loadClient(): Promise<BraintreeClientCreator> {
        await this.scriptLoader.loadScript(
            `//js.braintreegateway.com/web/${this.braintreeSdkVersion}/js/client.min.js`,
        );

        if (!this.braintreeHostWindow.braintree || !this.braintreeHostWindow.braintree.client) {
            throw new PaymentMethodClientUnavailableError();
        }

        return this.braintreeHostWindow.braintree.client;
    }

    async loadConnect(): Promise<BraintreeConnectCreator> {
        await this.scriptLoader.loadScript(
            `//js.braintreegateway.com/web/${this.braintreeSdkVersion}/js/connect.min.js`,
        );

        if (!this.braintreeHostWindow.braintree || !this.braintreeHostWindow.braintree.connect) {
            throw new PaymentMethodClientUnavailableError();
        }

        return this.braintreeHostWindow.braintree.connect;
    }

    async loadPaypalCheckout(): Promise<BraintreePaypalCheckoutCreator> {
        await this.scriptLoader.loadScript(
            `//js.braintreegateway.com/web/${this.braintreeSdkVersion}/js/paypal-checkout.min.js`,
        );

        if (
            !this.braintreeHostWindow.braintree ||
            !this.braintreeHostWindow.braintree.paypalCheckout
        ) {
            throw new PaymentMethodClientUnavailableError();
        }

        return this.braintreeHostWindow.braintree.paypalCheckout;
    }

    async loadBraintreeLocalMethods(): Promise<BraintreeLocalPaymentCreator> {
        await this.scriptLoader.loadScript(
            `//js.braintreegateway.com/web/${this.braintreeSdkVersion}/js/local-payment.min.js`,
        );

        if (
            !this.braintreeHostWindow.braintree ||
            !this.braintreeHostWindow.braintree.localPayment
        ) {
            throw new PaymentMethodClientUnavailableError();
        }

        return this.braintreeHostWindow.braintree.localPayment;
    }

    async loadDataCollector(): Promise<BraintreeDataCollectorCreator> {
        await this.scriptLoader.loadScript(
            `//js.braintreegateway.com/web/${this.braintreeSdkVersion}/js/data-collector.min.js`,
        );

        if (
            !this.braintreeHostWindow.braintree ||
            !this.braintreeHostWindow.braintree.dataCollector
        ) {
            throw new PaymentMethodClientUnavailableError();
        }

        return this.braintreeHostWindow.braintree.dataCollector;
    }

    async loadUsBankAccount(): Promise<BraintreeBankAccountCreator> {
        await this.scriptLoader.loadScript(
            `//js.braintreegateway.com/web/${this.braintreeSdkVersion}/js/us-bank-account.min.js`,
        );

        if (
            !this.braintreeHostWindow.braintree ||
            !this.braintreeHostWindow.braintree.usBankAccount
        ) {
            throw new PaymentMethodClientUnavailableError();
        }

        return this.braintreeHostWindow.braintree.usBankAccount;
    }
}
