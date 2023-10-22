
import { configureStore} from "@reduxjs/toolkit"

import themeReducer from "./Slices/ThemeSlices"

import allProductWithCatReducer from "./Slices/AllProductSlice"


export const store = configureStore( {
    reducer : {
        themeReducer : themeReducer ,
        allProductWithCatReducer : allProductWithCatReducer

    }
} )



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

