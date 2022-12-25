import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
        },
        removeItem(state, action) {
            const item = state.items.find(obj => obj.id === action.payload);
            state.totalPrice = state.totalPrice - (item.price * item.count);
            state.items = state.items.filter(obj => obj.id !== action.payload);
        },
        clearCart(state) {
            state.totalPrice = 0;
            state.items = [];
        },
        increment(state, action) {
            const item = state.items.find(obj => obj.id === action.payload);
            item.count++;
            state.totalPrice = state.totalPrice + item.price;
        },
        decrement(state, action) {
            const item = state.items.find(obj => obj.id === action.payload);
            if (item.count > 1) {
                item.count--;
                state.totalPrice = state.totalPrice - item.price;
            } else {
                state.totalPrice = state.totalPrice - (item.price * item.count);
                state.items = state.items.filter(obj => obj.id !== action.payload);
            }
        }
    }
});

export const selectCart = (state) => state.cartSlice;

export const {addItem, removeItem, clearCart, increment, decrement} = cartSlice.actions;

export default cartSlice.reducer;