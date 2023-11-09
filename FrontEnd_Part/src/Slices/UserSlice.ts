
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"
import { RootState } from "../store";







type BodyData = {

    formData: FormData

}








export const createNewUser = createAsyncThunk('user/createNewUser', async ({ formData }: BodyData) => {




    // let {address , ...resBodyData} = bodyData

    // // // // 

    // // let { street , city , country , pincode } = bodyData.address?

    // // if(!street || !city || !country || !pincode){
    // //     console.log("OK")
    // // }


    // if(!bodyData.address?.city || !bodyData.address.country || !bodyData.address.pincode || !bodyData.address.street ){
    //     address = undefined
    // }


    // let body = {
    //     ...resBodyData,
    //     address : address ,
    //     whenCreted: `${new Date()}` ,
    //     profilrPic : profilrPic
    // }



    const option = {
        method: 'POST',
        // headers: { 
        //     'Content-Type': 'multipart/form-data' ,
        //     // 'Accept': 'application/json',
        // },
        body: formData
    }


    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/createUser`, option)
    let data = await response.json();
    return data
})




type User = {
    isLoading: boolean;
    isError: boolean;
    isSingIn: boolean;
    isLogIn: boolean;
    userData: {
        name: string;
        profilePic: string;
        role: string;
        id: string | number;
    }
}



const initialState: User = {
    isLoading: false,
    isError: false,
    isSingIn: false,
    isLogIn: false,

    userData: {
        name: "",
        profilePic: "",
        role: "user",
        id: ""
    }
}



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setUserData(state, action) {
            state.userData = action.payload.data
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewUser.fulfilled, (state, action) => {
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



                    state.isSingIn = true

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
                }


                console.log(action.payload.message)

                state.isLoading = false

            })
            .addCase(createNewUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
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
            })

    }
})



export const { setUserData } = userSlice.actions


export const userState = () => useSelector((state: RootState) => state.userReducer)

export default userSlice.reducer
