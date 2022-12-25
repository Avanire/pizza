import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: ''
}

export const fetchPizzasData = createAsyncThunk(
    'pizza/fetchPizzasData',
    async ({category, sortType, sortDirection, searchValue = ''}) => {
        const {data} = await axios.get('https://63a7cdbf7989ad3286f57d39.mockapi.io/api/v1/items?' +
            category +
            '&sortBy=' + sortType.sortProperty +
            '&order=' + sortDirection +
            '&search=' + searchValue
        );

        return data;
    }
);

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setData(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzasData.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzasData.fulfilled]: (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        },
        [fetchPizzasData.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        }

    },
});

export const {setData} = pizzasSlice.actions;

export default pizzasSlice.reducer;