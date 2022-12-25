import {configureStore} from '@reduxjs/toolkit'
import filterSlice from "./slice/filterSlice";
import cartSlice from "./slice/cartSlice";
import pizzasSlice from "./slice/pizzasSlice";

export const store = configureStore({
    reducer: {filterSlice, cartSlice, pizzasSlice},
})