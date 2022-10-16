import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type sortItems = {
  name: string;
  sortProperty: 'rating' | 'popular' | 'title' | '-rating' | '-popular' | '-title';
}

export interface FilterStateSlice {
  searchValue: string;
  categoryId: number;
  sort: sortItems;
  currentPage: number;
}

const initialState:FilterStateSlice = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,

  reducers: {
    setSearchValue(state, action:PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action:PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action:PayloadAction<sortItems>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action:PayloadAction<FilterStateSlice>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
