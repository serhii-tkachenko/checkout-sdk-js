import { isEqual, omit } from 'lodash';

import { omitPrivate } from '../common/utility';

import InternalCart from './internal-cart';

export default class CartComparator {
    isEqual(cartA: InternalCart, cartB: InternalCart): boolean {
        return isEqual(
            this._normalize(cartA),
            this._normalize(cartB)
        );
    }

    _normalize(cart: InternalCart): InternalCart {
        return omitPrivate({
            ...cart,
            taxSubtotal: cart.taxTotal,
            items: cart.items && cart.items.map(
                (item: any) => omit(item, ['id', 'imageUrl', 'tax', 'integerTax'])
            ),
        });
    }
}
