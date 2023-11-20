
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"
import { RootState } from "../store";
import { gettingTokenInCookieAndLocalHost } from "./AllProductSlice";



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
        body: formData
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



export const fetchUser = createAsyncThunk("user/fetchUser", async () => {

    let option: RequestInit = {
        credentials: 'include',

        headers: {
            "token": `${gettingTokenInCookieAndLocalHost()}`
        }

    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getUserData`, option)
    let data = await response.json();
    return data
})


export const userSingout = createAsyncThunk("user/singOut", async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/userSingout`, { credentials: 'include' })
    let data = await response.json();
    return data
})



type UserAddressObj = {

    city: string,
    street: string,
    country: string,
    pincode: string
}



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
        address?: UserAddressObj[];
        orders?: []
    }
}



const initialState: User = {
    isLoading: false,
    isError: false,
    isSingIn: false,
    isLogIn: false,

    userData: {
        name: "",
        profilePic: "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1700368567/ej31ylpxtamndu3trqtk.png",
        role: "user",
        email: "",
        id: "",
        address: [],
        orders: []
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

                    localStorage.setItem("userToken", JSON.stringify(action.payload.data.token))



                    // let name = action.payload.data.name
                    // let profilePic = action.payload.data.profilePic
                    // let role = action.payload.data.role
                    // let email = action.payload.data.email

                    let { id, name, email, profilePic, role } = action.payload.data



                    // // // set Some user data (Very minior data) ------>

                    state.userData.name = name
                    state.userData.email = email
                    state.userData.profilePic = profilePic
                    state.userData.role = role
                    state.userData.id = id


                    // // // set data in localStorage ------>

                    localStorage.setItem("userData", JSON.stringify({ name, email, profilePic, role, id }))
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


            // // // fetchUser reducers ----->

            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true
            })

            .addCase(fetchUser.fulfilled, (state, action) => {

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

                    // toast.success(`${action.payload.message}`, {
                    //     position: "top-right",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: false,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "dark",
                    // })


                    // // // Set is logIn True ------->

                    state.isLogIn = true



                    // let name = action.payload.data.name
                    // let profilePic = action.payload.data.profilePic
                    // let role = action.payload.data.role
                    // let email = action.payload.data.email

                    let { id, name, email, profilePic, role, address } = action.payload.data



                    // // // set Some user data (Very minior data) ------>

                    // state.userData.name = name
                    // state.userData.email = email
                    // state.userData.profilePic = profilePic
                    // state.userData.role = role
                    // state.userData.id = id


                    state.userData = action.payload.data


                    // // // set data in localStorage ------>

                    localStorage.setItem("userData", JSON.stringify({ name, email, profilePic, role, id, address }))
                    localStorage.setItem("isUserLogIn", JSON.stringify(true))
                }


                // console.log(action.payload.message)

                state.isLoading = false

            })

            .addCase(fetchUser.rejected, (state, action) => {

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



            // // // SingOut User From Backend ----->

            .addCase(userSingout.fulfilled, (state, action) => {

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

                    toast.success(`${action.payload.message} | SingOut Done ✅ from Backend`, {
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


            })

            .addCase(userSingout.rejected, (state, action) => {

                // console.log(action)


                toast.error(`${action.error.message} | Refresh the page`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });




                state.isError = true
            })




    }
})



export const { setUserData, setLogInStatus } = userSlice.actions

export const userState = () => useSelector((state: RootState) => state.userReducer)

export default userSlice.reducer
