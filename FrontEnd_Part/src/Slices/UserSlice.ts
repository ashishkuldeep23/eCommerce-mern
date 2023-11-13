
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
        headers: {
            // 'Content-Type': 'multipart/form-data' ,
            // // 'Accept': 'application/json',


            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: formData,


        // credentials: true
        // withCredentials: true

    }


    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/createUser`, option)
    let data = await response.json();
    return data
})






type LogInBody = {

    bodyData: {
        username: string,
        password: string,
    }

}

const initialLogInData = {
    username: "",
    password: "",
}

export const logInUser = createAsyncThunk('user/logInUser', async ({ bodyData = initialLogInData }: LogInBody) => {

    const option: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // 'Accept': 'application/json',
        },
        body: JSON.stringify(bodyData)
    }


    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/userLogin`, option)
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
        email: string;
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
        profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEymdd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: "user",
        email: "",
        id: ""
    }
}



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setUserData(state, action) {
            state.userData = action.payload.data
        },

        setLogInStatus(state, action) {
            state.isLogIn = action.payload.isLogIn
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewUser.fulfilled, (state, action) => {
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


                    state.isSingIn = true

                }


                // console.log(action.payload.message)

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




            // // // Loging reducers ----->

            .addCase(logInUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logInUser.fulfilled, (state, action) => {

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


                    state.isLogIn = true

                    // // // Set token data in cookie ------->
                    document.cookie = `token=${action.payload.data.token}`

                    // // // And also set cookie in localStorage -------->

                    localStorage.setItem("userToken" , JSON.stringify(action.payload.data.token))




                    // let name = action.payload.data.name
                    // let profilePic = action.payload.data.profilePic
                    // let role = action.payload.data.role
                    // let email = action.payload.data.email

                    let { name, email, profilePic, role } = action.payload.data



                    // // // set Some user data (Very minior data) ------>

                    state.userData.name = name
                    state.userData.email = email
                    state.userData.profilePic = profilePic
                    state.userData.role = role


                    // // // set data in localStorage ------>



                    localStorage.setItem("userData", JSON.stringify({ name, email, profilePic, role }))
                    localStorage.setItem("isUserLogIn", JSON.stringify(true))

                }


                // console.log(action.payload.message)

                state.isLoading = false

            })

            .addCase(logInUser.rejected, (state, action) => {

                // console.log(action)


                let errorArray = action.error.message?.split(",")

                // console.log(errorArray)

                if (action.error.message && errorArray?.length === 2 && errorArray[1].includes('"Unauthorized"')) {

                    toast.error(`Given Email or Password is not valid.Please check your Email and Password.`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });

                } else {

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

                }

                state.isLoading = false
                state.isError = true
            })




    }
})



export const { setUserData, setLogInStatus } = userSlice.actions

export const userState = () => useSelector((state: RootState) => state.userReducer)

export default userSlice.reducer
