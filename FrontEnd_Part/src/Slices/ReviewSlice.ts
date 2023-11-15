
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"
import { RootState } from "../store";



type BodyOfNewReviw = {
    comment: string;
    stars: number;
    productID: string | number;
}

export const createNewReview = createAsyncThunk("review/newReview", async ({ comment = "Osm", stars = 4, productID = '' }: BodyOfNewReviw) => {

    let getUserToken = localStorage.getItem("userToken");

    if (getUserToken) {
        getUserToken = JSON.parse(getUserToken)
    } else {
        getUserToken = null
    }

    let body = { comment: comment, stars: stars, productID: productID }

    let option: RequestInit = {
        // credentials: 'include',

        method : "POST",
        headers: {
            "token": `${getUserToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)

    }


    // console.log(body)
    // return



    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/createReview`, option)
    let data = await response.json();
    return data

})







type Review = {
    isLoading: boolean;
    isError: boolean;
    isReview: boolean;
    reviewData: {
        comment: string;
        stars: number;
    }
}



const initialState: Review = {
    isLoading: false,
    isError: false,
    isReview: false,

    reviewData: {
        comment: "",
        stars: 0
    }

}



const reviewSlice = createSlice({
    name: "user",
    initialState,
    reducers: {



    },

    extraReducers: (builder) => {

        builder
            .addCase(createNewReview.pending, (state) => {
                state.isLoading = true
            })

            .addCase(createNewReview.fulfilled , (state , action)=>{

                console.log(action.payload)

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

                    state.isReview = true

                }

                // console.log(action.payload.message)

                state.isLoading = false

            })

            .addCase(createNewReview.rejected , (state , action)=>{
                state.isLoading = false
                state.isError = true
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



export const { } = reviewSlice.actions

export const reviewState = () => useSelector((state: RootState) => state.reviewReducer)

export default reviewSlice.reducer
