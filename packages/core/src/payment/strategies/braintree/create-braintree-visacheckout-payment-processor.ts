import { RequestSender } from '@bigcommerce/request-sender';
import { ScriptLoader } from '@bigcommerce/script-loader';

import { BraintreeScriptLoader } from '@bigcommerce/checkout-sdk/braintree-utils';

import BraintreeSDKCreator from './braintree-sdk-creator';
import BraintreeVisaCheckoutPaymentProcessor from './braintree-visacheckout-payment-processor';

export default function createBraintreeVisaCheckoutPaymentProcessor(
    scriptLoader: ScriptLoader,
    requestSender: RequestSender,
) {
    const braintreeScriptLoader = new BraintreeScriptLoader(scriptLoader, window);
    const braintreeSDKCreator = new BraintreeSDKCreator(braintreeScriptLoader);

    return new BraintreeVisaCheckoutPaymentProcessor(braintreeSDKCreator, requestSender);
}
