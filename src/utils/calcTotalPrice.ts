import {cartItems} from '../redux/slices/cartSlice'

export const calcTotalPrice = (items: cartItems[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}