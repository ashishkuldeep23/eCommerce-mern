
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"
import { RootState } from "../store";
import { gettingTokenInCookieAndLocalHost } from "../App";




type PramsForCreateReview = {
    comment: string;
    stars: number;
    productID: string | number;
}

export const createNewReview = createAsyncThunk("review/newReview", async ({ comment = "Osm", stars = 4, productID = '' }: PramsForCreateReview) => {

    let getUserToken = localStorage.getItem("userToken");

    if (getUserToken) {
        getUserToken = JSON.parse(getUserToken)
    } else {
        getUserToken = null
    }

    let body = { comment: comment, stars: stars, productID: productID }

    let option: RequestInit = {
        credentials: 'include',

        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
        body: JSON.stringify(body)

    }


    // console.log(body)
    // return



    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/createReview`, option)
    let data = await response.json();
    return data

})




type PramsForDeleteReview = {
    reviewId: string;
    userUID: string | number;

}


export const deleteReview = createAsyncThunk("review/deleteReview", async ({ reviewId, userUID }: PramsForDeleteReview) => {

    let option: RequestInit = {
        credentials: 'include',

        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
        body: JSON.stringify({ userUID: userUID })

    }


    // console.log(body)
    // return



    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/deleteReview/${reviewId}`, option)
    let data = await response.json();
    return data

})


// {
//     "comment" : "Nice tttttt",
//     "reviewID" : "03e112a9-bc5a-45fc-8ef4-4f9c101148d5",
//     "stars" : 2
// }


type PramsForUpdateReview = {
    reviewId: string;
    // userUID: string | number;
    comment: string;
    stars: number
}



export const updateReview = createAsyncThunk("review/update", async ({ reviewId, comment, stars }: PramsForUpdateReview) => {

    let option: RequestInit = {
        credentials: 'include',

        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
        body: JSON.stringify({ reviewId, comment, stars })

    }



    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updateReview`, option)
    let data = await response.json();
    return data


})





type PropForReviewLike = {
    reviewId: string;
    userId: string;
    isLiking: boolean
}


export const likeReview = createAsyncThunk("review/like", async ({ reviewId, userId, isLiking }: PropForReviewLike) => {
    let option: RequestInit = {
        credentials: 'include',

        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
        body: JSON.stringify({ reviewId, userId, isLiking })

    }



    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/likeReview`, option)
    let data = await response.json();
    return data

})





type PropForReviewDislike = {
    reviewId: string;
    userId: string;
    isDisliking: boolean
}


export const dislikeReview = createAsyncThunk("review/dislike", async ({ reviewId, userId, isDisliking }: PropForReviewDislike) => {
    let option: RequestInit = {
        credentials: 'include',

        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
        body: JSON.stringify({ reviewId, userId, isDisliking })

    }



    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/dislikeReview`, option)
    let data = await response.json();
    return data

})




type Review = {
    isLoading: boolean;
    isError: boolean;
    isReview: boolean;
    isUpdatng: boolean;
    isFullfilled:boolean;
    inputReviewData: {
        comment: string;
        stars: number;
        likes: number;
        dislikes: number;
        id: string;
    }
}



const initialState: Review = {
    isLoading: false,
    isError: false,
    isReview: false,
    isUpdatng: false,
    isFullfilled : false,
    inputReviewData: {
        comment: "",
        stars: 0,
        likes: 0,
        dislikes: 0,
        id: ""
    }

}



const reviewSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setReviewData(state, action) {
            // console.log(action.payload)

            // // // data inludes review data (Single review data) ---->
            state.inputReviewData = action.payload.data

        },


        setReviewUpadte(state, action) {
            // // // data only incluce true and false
            state.isUpdatng = action.payload.data
        }


    },

    extraReducers: (builder) => {

        builder
            .addCase(createNewReview.pending, (state) => {
                state.isLoading = true
                state.isFullfilled = false
            })

            .addCase(createNewReview.fulfilled, (state, action) => {

                // console.log(action.payload)

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

                    state.isReview = true

                    // // // State back to normal 
                    state.inputReviewData = initialState.inputReviewData

                    state.isFullfilled = true

                }

                // console.log(action.payload.message)

                state.isLoading = false
            })

            .addCase(createNewReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isFullfilled = false
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



            .addCase(deleteReview.pending, (state) => {
                state.isLoading = true
                state.isFullfilled = false
            })


            .addCase(deleteReview.fulfilled, (state, action) => {

                // console.log(action.payload)

                if (action.payload.status === false) {

                    state.isError = true
                    state.isFullfilled = false
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

                    // // reload loaction ----->
                    // location.reload()

                    state.isFullfilled = true

                }

                // console.log(action.payload.message)

                state.isLoading = false
            })

            .addCase(deleteReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isFullfilled = false
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





            .addCase(updateReview.pending, (state) => {
                state.isLoading = true
                state.isFullfilled = false
            })

            .addCase(updateReview.fulfilled, (state, action) => {

                // console.log(action.payload)

                if (action.payload.status === false) {

                    state.isError = true
                    state.isFullfilled = false
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

                    // // reload loaction ----->
                    // location.reload()

                    state.isFullfilled = true
                    state.inputReviewData.comment = "";
                    state.inputReviewData.stars = 0;

                }

                // console.log(action.payload.message)

                state.isLoading = false
            })

            .addCase(updateReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isFullfilled = false
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





            .addCase(likeReview.pending, (state) => {
                state.isLoading = true
                state.isFullfilled = false
            })

            .addCase(likeReview.fulfilled, (state, action) => {

                // console.log(action.payload)

                if (action.payload.status === false) {

                    state.isError = true
                    state.isFullfilled = false
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

                    // // reload loaction ----->
                    // location.reload()

                    state.isFullfilled = true

                }

                // console.log(action.payload.message)

                state.isLoading = false
            })

            .addCase(likeReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isFullfilled = false
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




            .addCase(dislikeReview.pending, (state) => {
                state.isLoading = true
                state.isFullfilled = false
            })

            .addCase(dislikeReview.fulfilled, (state, action) => {

                // console.log(action.payload)

                if (action.payload.status === false) {

                    state.isError = true
                    state.isFullfilled = false
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

                    // // reload loaction ----->
                    // location.reload()

                    state.isFullfilled = true

                }

                // console.log(action.payload.message)

                state.isLoading = false
            })

            .addCase(dislikeReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isFullfilled = false
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



export const { setReviewData, setReviewUpadte } = reviewSlice.actions

export const reviewState = () => useSelector((state: RootState) => state.reviewReducer)

export default reviewSlice.reducer
