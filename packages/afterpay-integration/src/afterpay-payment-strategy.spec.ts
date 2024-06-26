import { createScriptLoader } from '@bigcommerce/script-loader';
import { merge } from 'lodash';

import {
    InvalidArgumentError,
    MissingDataError,
    NotInitializedError,
    OrderActionType,
    OrderFinalizationNotCompletedError,
    OrderRequestBody,
    PaymentActionType,
    PaymentArgumentInvalidError,
    PaymentIntegrationService,
    PaymentMethod,
    RequestError,
} from '@bigcommerce/checkout-sdk/payment-integration-api';
import {
    getCheckout,
    getErrorPaymentResponseBody,
    getOrderRequestBody,
    getResponse,
    PaymentIntegrationServiceMock,
} from '@bigcommerce/checkout-sdk/payment-integrations-test-utils';

import AfterpayPaymentStrategy from './afterpay-payment-strategy';
import AfterpayScriptLoader from './afterpay-script-loader';
import { getAfterpay } from './afterpay.mock';

describe('AfterpayPaymentStrategy', () => {
    let payload: OrderRequestBody;
    let paymentIntegrationService: PaymentIntegrationService;
    let paymentMethod: PaymentMethod;
    let scriptLoader: AfterpayScriptLoader;
    let submitOrderAction: OrderActionType;
    let submitPaymentAction: PaymentActionType;
    let strategy: AfterpayPaymentStrategy;

    const afterpaySdk = {
        initialize: jest.fn(),
        redirect: jest.fn(),
    };

    beforeEach(() => {
        paymentIntegrationService = new PaymentIntegrationServiceMock();
        scriptLoader = new AfterpayScriptLoader(createScriptLoader());
        strategy = new AfterpayPaymentStrategy(paymentIntegrationService, scriptLoader);

        paymentMethod = getAfterpay();

        payload = merge({}, getOrderRequestBody(), {
            payment: {
                methodId: paymentMethod.id,
                gatewayId: paymentMethod.gateway,
            },
        });

        submitOrderAction = OrderActionType.SubmitOrderRequested;
        submitPaymentAction = PaymentActionType.SubmitPaymentRequested;

        payload = merge({}, getOrderRequestBody(), {
            payment: {
                methodId: paymentMethod.id,
                gatewayId: paymentMethod.gateway,
            },
        });

        jest.spyOn(paymentIntegrationService, 'submitOrder').mockReturnValue(submitOrderAction);

        jest.spyOn(paymentIntegrationService, 'submitPayment').mockReturnValue(submitPaymentAction);

        jest.spyOn(scriptLoader, 'load').mockReturnValue(Promise.resolve(afterpaySdk));

        jest.spyOn(paymentIntegrationService.getState(), 'getPaymentMethod').mockReturnValue(
            paymentMethod,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('#initialize()', () => {
        it('throws error if payment method is not provided', async () => {
            jest.spyOn(paymentIntegrationService.getState(), 'getPaymentMethod').mockReturnValue(
                undefined,
            );

            await expect(
                strategy.initialize({
                    methodId: paymentMethod.id,
                    gatewayId: paymentMethod.gateway,
                }),
            ).rejects.toThrow(MissingDataError);
        });

        it('loads script when initializing strategy', async () => {
            await strategy.initialize({
                methodId: paymentMethod.id,
                gatewayId: paymentMethod.gateway,
            });

            expect(scriptLoader.load).toHaveBeenCalledWith(paymentMethod, 'US');
        });

        it('loads script when initializing strategy with NZD', async () => {
            jest.spyOn(paymentIntegrationService.getState(), 'getCart').mockReturnValue({
                currency: { code: 'NZD' },
            });

            await strategy.initialize({
                methodId: paymentMethod.id,
                gatewayId: paymentMethod.gateway,
            });

            expect(scriptLoader.load).toHaveBeenCalledWith(paymentMethod, 'NZ');
        });
    });

    describe('#execute()', () => {
        const successHandler = jest.fn();

        beforeEach(async () => {
            await strategy.initialize({
                methodId: paymentMethod.id,
                gatewayId: paymentMethod.gateway,
            });

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            strategy.execute(payload).then(successHandler);

            await new Promise((resolve) => process.nextTick(resolve));

            jest.spyOn(paymentIntegrationService.getState(), 'getCart').mockReturnValue({
                currency: { code: 'USD' },
            });
        });

        it('throws error if unable to execute due to missing payment data', async () => {
            await expect(strategy.execute({})).rejects.toThrow(PaymentArgumentInvalidError);
        });

        it('throws error if unable to execute due to missing gateway or method id', async () => {
            await expect(strategy.execute({ payment: { methodId: '' } })).rejects.toThrow(
                PaymentArgumentInvalidError,
            );
        });

        it('redirects to Afterpay', () => {
            expect(afterpaySdk.initialize).toHaveBeenCalledWith({ countryCode: 'US' });
            expect(afterpaySdk.redirect).toHaveBeenCalledWith({ token: paymentMethod.clientToken });
        });

        it('applies store credit usage', () => {
            expect(paymentIntegrationService.applyStoreCredit).toHaveBeenCalledWith(false);
        });

        it('does not resolve if execution is successful', () => {
            expect(successHandler).not.toHaveBeenCalled();
        });

        it('rejects with error if execution is unsuccessful', async () => {
            const errorHandler = jest.fn();

            strategy.execute(payload).catch(errorHandler);

            await new Promise((resolve) => process.nextTick(resolve));

            expect(errorHandler).not.toHaveBeenCalled();
        });

        it('throws error if trying to execute before initialization', async () => {
            await strategy.deinitialize();

            try {
                await strategy.execute(payload);
            } catch (error) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(error).toBeInstanceOf(NotInitializedError);
            }
        });

        it('throws InvalidArgumentError if loadPaymentMethod fails', async () => {
            const errorResponse = {
                body: {
                    detail: 'Something went wrong',
                    errors: ['Bad Request'],
                    status: 422,
                    title: 'Error',
                },
                status: 422,
                statusText: 'Bad Request',
                headers: {
                    'content-type': 'application/json',
                },
            };

            jest.spyOn(paymentIntegrationService, 'loadPaymentMethod').mockImplementation(() => {
                throw new RequestError(errorResponse);
            });

            await expect(strategy.execute(payload)).rejects.toThrow(InvalidArgumentError);
        });

        it('loads payment client token', () => {
            expect(paymentIntegrationService.loadPaymentMethod).toHaveBeenCalledWith(
                paymentMethod.gateway,
                { params: { method: paymentMethod.id } },
            );
        });
    });

    describe('#finalize()', () => {
        const nonce = 'bar';

        beforeEach(() => {
            jest.spyOn(paymentIntegrationService.getState(), 'getContextConfig').mockReturnValue({
                payment: { token: nonce },
            });

            jest.spyOn(paymentIntegrationService.getState(), 'getCheckout').mockReturnValue({
                ...getCheckout(),
                payments: [
                    {
                        providerId: paymentMethod.id,
                        gatewayId: paymentMethod.gateway,
                    },
                ],
            });
        });

        it('submits the order and the payment', async () => {
            jest.spyOn(paymentIntegrationService.getState(), 'getPaymentId').mockReturnValue({
                providerId: 'PAY_BY_INSTALLMENT',
            });

            await strategy.initialize({
                methodId: paymentMethod.id,
                gatewayId: paymentMethod.gateway,
            });
            await strategy.finalize({
                methodId: paymentMethod.id,
                gatewayId: paymentMethod.gateway,
            });

            jest.spyOn(paymentIntegrationService, 'submitOrder').mockReturnValue(submitOrderAction);
            jest.spyOn(paymentIntegrationService, 'submitPayment').mockReturnValue(
                submitPaymentAction,
            );

            expect(paymentIntegrationService.submitOrder).toHaveBeenCalledWith(
                {},
                { methodId: paymentMethod.id, gatewayId: paymentMethod.gateway },
            );

            expect(paymentIntegrationService.submitPayment).toHaveBeenCalledWith({
                methodId: paymentMethod.id,
                paymentData: { nonce },
            });

            expect(paymentIntegrationService.forgetCheckout).not.toHaveBeenCalled();
        });

        it('throws error if unable to finalize order due to missing payment data', async () => {
            jest.spyOn(paymentIntegrationService.getState(), 'getPaymentId').mockReturnValue(
                undefined,
            );

            await expect(
                strategy.finalize({ methodId: paymentMethod.id, gatewayId: paymentMethod.gateway }),
            ).rejects.toThrow(MissingDataError);
        });

        it('throws error if unable to finalize order due to missing context config data', async () => {
            jest.spyOn(paymentIntegrationService.getState(), 'getContextConfig').mockReturnValue({
                payment: { token: undefined },
            });

            await expect(
                strategy.finalize({ methodId: paymentMethod.id, gatewayId: paymentMethod.gateway }),
            ).rejects.toThrow(MissingDataError);
        });

        it('throws OrderFinalizationNotCompleted error if unable to finalize order', async () => {
            jest.spyOn(paymentIntegrationService.getState(), 'getPaymentId').mockReturnValue({
                providerId: 'PAY_BY_INSTALLMENT',
            });

            const errorResponse = getResponse(getErrorPaymentResponseBody());

            jest.spyOn(paymentIntegrationService, 'submitPayment').mockImplementation(() => {
                throw new RequestError(errorResponse);
            });

            jest.spyOn(paymentIntegrationService, 'forgetCheckout').mockReturnValue(
                Promise.resolve(),
            );

            jest.spyOn(paymentIntegrationService, 'submitOrder').mockReturnValue(submitOrderAction);

            await strategy.initialize({
                methodId: paymentMethod.id,
                gatewayId: paymentMethod.gateway,
            });

            await expect(
                strategy.finalize({ methodId: paymentMethod.id, gatewayId: paymentMethod.gateway }),
            ).rejects.toThrow(OrderFinalizationNotCompletedError);

            expect(paymentIntegrationService.forgetCheckout).toHaveBeenCalled();
        });
    });
});
