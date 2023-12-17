
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IProduct } from "../components/ProductListing/ProductLists"
import { useSelector } from "react-redux"
import { RootState } from "../store"


// import type { PayloadAction } from "@reduxjs/toolkit"
// // // Above will use in action object , see the docs.




export const searchProduct = createAsyncThunk("product/searchProduct", async (keyword: string) => {

    let option: RequestInit = {
        method: "GET",
    }


    // console.log(body)
    // return



    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/searchProduct?keyword=${keyword}`, option)
    let data = await response.json();
    return data

})





interface SearchProduct {

    isLoading: boolean,
    isFullFilled: boolean,
    isError: boolean,
    errMsg: string,
    keyText: string,
    productSuggetionArr: IProduct[]

}



const initialState: SearchProduct = {
    isLoading: false,
    isFullFilled: false,
    isError: false,
    errMsg: "",
    keyText: "",
    productSuggetionArr: [],

}



const searchProductSlice = createSlice({
    name: "searchProduct",
    initialState,
    reducers: {

        setKeyText(state, action) {
            state.keyText = action.payload
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(searchProduct.pending, (state) => {
                state.isLoading = true,
                    state.isFullFilled = false,
                    state.isError = false
            })

            .addCase(searchProduct.fulfilled, (state, action) => {
                state.isLoading = false

                if (action.payload.status) {
                    state.isFullFilled = true
                    state.productSuggetionArr = action.payload.data
                } else {
                    state.isError = true;
                    state.errMsg = action.payload.message
                }
            })

            .addCase(searchProduct.rejected, (state) => {
                state.isLoading = false,
                    state.isFullFilled = false,
                    state.isError = true
            })
    }

})



export const { setKeyText } = searchProductSlice.actions

export const searchProductState = () => useSelector((state: RootState) => state.searchReducer)

export default searchProductSlice.reducer





