
import { configureStore } from "@reduxjs/toolkit"

import themeReducer from "./Slices/ThemeSlices"

import allProductWithCatReducer from "./Slices/AllProductSlice"

import CartReducer from "./Slices/CartSlice"

import userReducer from "./Slices/UserSlice"


export const store = configureStore({
    reducer: {
        themeReducer: themeReducer,
        allProductWithCatReducer,
        CartReducer ,
        userReducer
    }
})



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

