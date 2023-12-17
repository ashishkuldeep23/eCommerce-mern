
import { configureStore } from "@reduxjs/toolkit"

import themeReducer from "./Slices/ThemeSlices"

import allProductWithCatReducer from "./Slices/AllProductSlice"

import CartReducer from "./Slices/CartSlice"

import userReducer from "./Slices/UserSlice"

import reviewReducer from "./Slices/ReviewSlice"

import modalReducer from './Slices/ModalSlice'

import orderReducer from './Slices/OrderSlice'

import searchReducer from  "./Slices/ProductSearchByKey"


export const store = configureStore({
    reducer: {
        themeReducer: themeReducer,
        allProductWithCatReducer,
        CartReducer,
        userReducer,
        reviewReducer,
        modalReducer ,
        orderReducer ,
        searchReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

