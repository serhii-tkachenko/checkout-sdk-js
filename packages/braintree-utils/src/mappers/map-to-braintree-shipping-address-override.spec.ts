import { getShippingAddress } from '@bigcommerce/checkout-sdk/payment-integrations-test-utils';

import { getBraintreeAddress } from '../mocks';

import mapToBraintreeShippingAddressOverride from './map-to-braintree-shipping-address-override';

describe('#mapToBraintreeShippingAddressOverride()', () => {
    it('maps shipping address to braintree address', () => {
        expect(mapToBraintreeShippingAddressOverride(getShippingAddress())).toEqual(
            getBraintreeAddress(),
        );
    });
});
