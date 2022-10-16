// @ts-nocheck

import { RootState } from '../../store';
import {useDispatch, useSelector} from 'react-redux';

export const selectCart = (state: RootState) => state.cartSlice;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);