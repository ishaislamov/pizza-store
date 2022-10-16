// @ts-nocheck
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {getCartFromLS} from '../../utils/getCartFromLS'
import {calcTotalPrice} from '../../utils/calcTotalPrice'

export type cartItems = {
  id: string;
  title: string;
  price: number;
  imageUrl: string; 
  type: string;
  size: number;
  count: number;
}

interface cartSliceProps {
  totalPrice: number;
  items: cartItems[];
}
const {items, totalPrice} = getCartFromLS();

const initialState: cartSliceProps  = {
  items,
  totalPrice,
};

const cartSlice = createSlice({
  name: 'carts',
  initialState,

  reducers: {
    // добавление в корзину пицц без дублирования id
    addItem(state, action:PayloadAction<cartItems>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if(findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>){
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if(findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action:PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;

    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
