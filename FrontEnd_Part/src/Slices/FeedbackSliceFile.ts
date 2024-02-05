
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { toast } from "react-toastify"


// import type { PayloadAction } from "@reduxjs/toolkit"
// // // Above will use in action object , see the docs.





type FeedBackData = {
    "feedbackMsg": string,
    "feedbackName"?: string,
    "feedbackType"?: string,
    "feedFromWebName"?: string,
    "whenCreated"?: string
}




export const createNewFeedback = createAsyncThunk("feedback/createFeedback", async ({ body }: { body: FeedBackData }) => {

    let option: RequestInit = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            // "token": `${gettingTokenInCookieAndLocalHost()}`
        },
        body: JSON.stringify(body)

    }

    const response = await fetch(`https://feedback-hzwx.onrender.com/newFeedback/ecommerce`, option)
    let data = await response.json();
    return data
})




export const getAllFeedbacks = createAsyncThunk("feedback/getAllFeedbacks", async () => {

    const response = await fetch(`https://feedback-hzwx.onrender.com/getFeedback/ecommerce`)
    let data = await response.json();
    return data
})




export interface FeedBackSingle {
    "feedbackName": string,
    "feedbackType": string,
    "feedbackMsg": string,
    "whenCreated": string,
    "reply": string
}



interface InitialState {
    allFeedbackArr: FeedBackSingle[],
    isLoading: boolean,
    isError: boolean,
    isFullFilled: boolean
}




const initialState: InitialState = {

    allFeedbackArr: [],
    isLoading: false,
    isFullFilled: false,
    isError: false
}



const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {


    },


    extraReducers: (builder) => {
        builder

            // // // fetchUser reducers ----->

            // // // Create Order reducer --->
            .addCase(createNewFeedback.pending, (state) => {
                state.isLoading = true
                state.isFullFilled = false
            })

            .addCase(createNewFeedback.fulfilled, (state, action) => {

                // console.log(action.payload)

                if (action.payload.status === false) {

                    state.isError = true
                    state.isFullFilled = false

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

                    state.isFullFilled = true
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


                    // // // Update data --->

                    const { feedbackName, feedbackType, feedbackMsg, whenCreated, reply } = action.payload.data

                    state.allFeedbackArr.unshift({ feedbackName, feedbackType, feedbackMsg, whenCreated, reply })

                }


                // console.log(action.payload.message)

                state.isLoading = false

            })

            .addCase(createNewFeedback.rejected, (state, action) => {

                // console.log(action)

                toast.error(`${action.error.message} | Check your Network | Refresh the page`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });


                state.isLoading = false
                state.isError = true
                state.isFullFilled = false
            })





            // // // Update order reducer --->
            .addCase(getAllFeedbacks.pending, (state) => {
                state.isLoading = true
                state.isFullFilled = false
            })

            .addCase(getAllFeedbacks.fulfilled, (state, action) => {

                // console.log(action.payload)

                if (action.payload.status === false) {

                    state.isError = true
                    state.isFullFilled = false

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

                    state.isFullFilled = true
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

                    state.allFeedbackArr = action.payload.data

                }


                // console.log(action.payload.message)

                state.isLoading = false

            })

            .addCase(getAllFeedbacks.rejected, (state, action) => {

                // console.log(action)

                toast.error(`${action.error.message} | Check your Network | Refresh the page`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });


                state.isLoading = false
                state.isError = true
                state.isFullFilled = false
            })

    }
})



export const { } = feedbackSlice.actions

export const feedbackState = () => useSelector((state: RootState) => state.feedbackSliceReducer)


export default feedbackSlice.reducer





