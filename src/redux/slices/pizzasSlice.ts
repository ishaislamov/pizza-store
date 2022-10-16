// @ts-nocheck
import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '../store';

type FetchPizza = {
  order: string;
  search: string;
  activePopup: string;
  currentPage: string;
  categoryId: number; 
}

type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string; 
  types: number[];
  sizes: number[];
  count: number;
}
export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ order, search, activePopup, currentPage, categoryId }: FetchPizza) => {
    const { data } = await axios.get<Pizza[]>(
      `https://6329ea1d4c626ff832cda4b9.mockapi.io/Items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${activePopup.replace('-', '')}&order=${order}${search}`,
    );
    return data as Pizza[];
  },
);

interface PizzaStateSlice {
  items: Pizza[];
  isLoading: boolean;
}

const initialState:PizzaStateSlice = {
  items: [],
  isLoading: true,
};
const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state:RootState, action:PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.isLoading = true;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
    });
  }   
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
