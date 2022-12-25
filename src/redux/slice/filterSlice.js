import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    searchValue: '',
    sortType: {
        name: 'популярности',
        sortProperty: 'rating'
    },
    sortDirection: 'asc'
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSortType(state, action) {
            state.sortType.name = action.payload.name;
            state.sortType.sortProperty = action.payload.sortProperty;
        },
        setSortDirection(state, action) {
            state.sortDirection = action.payload;
        },
        setFilters(state, action) {
            state.categoryId = action.payload.categoryId;
            state.sortType = action.payload.sort;
            state.sortDirection = action.payload.sortDirection;
        }
    }
});

export const {setCategoryId, setSortType, setSortDirection, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;