import { Observable } from 'rxjs';
import { getCart, getCartResponseBody } from './internal-carts.mock';
import { getErrorResponse, getResponse } from '../common/http-request/responses.mock';
import * as actionTypes from './cart-action-types';
import CartActionCreator from './cart-action-creator';

describe('CartActionCreator', () => {
    let cartActionCreator;
    let checkoutClient;
    let errorResponse;
    let response;

    beforeEach(() => {
        response = getResponse(getCartResponseBody());
        errorResponse = getErrorResponse();

        checkoutClient = {
            loadCart: jest.fn(() => Promise.resolve(response)),
        };

        cartActionCreator = new CartActionCreator(checkoutClient);
    });

    describe('#verifyCart()', () => {
        it('emits `false` if cart content has not changed', () => {
            cartActionCreator.verifyCart(getCart())
                .toArray()
                .subscribe((actions) => {
                    expect(actions).toEqual([
                        { type: actionTypes.VERIFY_CART_REQUESTED },
                        { type: actionTypes.VERIFY_CART_SUCCEEDED, payload: false },
                    ]);
                });
        });

        it('emits `true` if cart content has changed', () => {
            cartActionCreator.verifyCart({ ...getCart(), currency: 'JPY' })
                .toArray()
                .subscribe((actions) => {
                    expect(actions).toEqual([
                        { type: actionTypes.VERIFY_CART_REQUESTED },
                        { type: actionTypes.VERIFY_CART_SUCCEEDED, payload: true },
                    ]);
                });
        });

        it('emits error actions if unable to verify cart', () => {
            checkoutClient.loadCart.mockReturnValue(Promise.reject(errorResponse));

            const errorHandler = jest.fn((action) => Observable.of(action));

            cartActionCreator.verifyCart()
                .catch(errorHandler)
                .toArray()
                .subscribe((actions) => {
                    expect(actions).toEqual([
                        { type: actionTypes.VERIFY_CART_REQUESTED },
                        { type: actionTypes.VERIFY_CART_FAILED, payload: errorResponse, error: true },
                    ]);
                });
        });
    });
});
