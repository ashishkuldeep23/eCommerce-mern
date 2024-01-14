
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { gettingTokenInCookieAndLocalHost } from "../App";
import { IProduct } from "../components/ProductListing/ProductLists";


// import type { PayloadAction } from "@reduxjs/toolkit"
// // // Above will use in action object , see the docs.



export const createNewProduct = createAsyncThunk('admin/createNewProduct', async (formData: FormData) => {

    const option = {
        method: 'POST',
        body: formData,
        headers: {
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/createProduct`, option)
    let data = await response.json();
    return data

})



export const getAllProductAdmin = createAsyncThunk("admin/getAllProducts" ,async () => {

    const option = {
        method: 'GET',
        headers: {
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
    }


    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getAllProductsAdmin`, option)
    let data = await response.json();
    return data
})





export interface IProductAdmin extends IProduct{

}




type AdminData = {
    isLoading: boolean;
    isError: boolean;
    isFullfilled: boolean;
    errMsg: string;
    allProduct : IProductAdmin[]

}


const initialState: AdminData = {
    isLoading: false,
    isError: false,
    isFullfilled: false,
    errMsg: "",
    allProduct : [  ]
}



const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {



    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewProduct.pending , (state)=>{
                state.isLoading = true
                state.isFullfilled = false
            })


            .addCase(createNewProduct.fulfilled , (state , action)=>{
                state.isLoading = false
                state.isFullfilled = true

                // console.log(action.payload)
                // alert("Ok now")


                if (action.payload.status === false) {

                    state.isError = true
                    toast.error(`${action.payload.message} | 400`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                } else {

                    // // // True case written here ------->

                    toast.success(`${action.payload.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })

                    // // // Add data in State variables -->

                }


            })

            .addCase(createNewProduct.rejected , (state , action)=>{
                state.isLoading = false
                state.isError = true
                state.errMsg = action?.error?.message!
                toast.error(`${action.error.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })



            .addCase(getAllProductAdmin.pending , (state)=>{
                state.isLoading = true
                state.isFullfilled = false
            })

            .addCase(getAllProductAdmin.fulfilled , (state , action) =>{
                state.isLoading = false
                state.isFullfilled = true

                // console.log(action.payload)
                // alert("Ok now")


                if (action.payload.status === false) {

                    state.isError = true
                    toast.error(`${action.payload.message} | 400`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                }else{
                    console.log(action.payload.data)
                    state.allProduct = action.payload.data
                }
            })


            .addCase(getAllProductAdmin.rejected , (state , action)=>{
                state.isLoading = false
                state.isError = true
                state.errMsg = action?.error?.message!
                toast.error(`${action.error.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })

    }
})



export const { } = adminSlice.actions

export const adminDataState = () => useSelector((state: RootState) => state.adminReducer)

export default adminSlice.reducer





