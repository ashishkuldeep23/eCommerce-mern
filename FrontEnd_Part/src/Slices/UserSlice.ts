
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"
import { RootState } from "../store";
import { gettingTokenInCookieAndLocalHost } from "../App";
import { CardDataInter } from "./CartSlice";




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






type UpdatUserData = {
    formData: FormData
}



export const upadteUserData = createAsyncThunk("user/updateUser", async ({ formData }: UpdatUserData) => {
    const option: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
            // 'Content-Type': 'application/json',
            "token": `${gettingTokenInCookieAndLocalHost()}`
            // 'Accept': 'application/json',
        },
        body: formData
    }


    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updateUser`, option)
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


export const forgotRequest = createAsyncThunk("user/forgotReq" ,  async (email : string) =>{


    const option: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email : email})
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/forgot-req`, option)
    let data = await response.json();
    return data
})


export const forgotMain = createAsyncThunk("user/forgotMain" ,  async ({email , password , token} : {email : string , password : string , token : string}) =>{


    const option: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email , password , token})
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/forgot-main`, option)
    let data = await response.json();
    return data
})



export type UserAddressObj = {
    id: string;
    city: string,
    street: string,
    country: string,
    pincode: string
}


export type UserOrderOj = {
    address: UserAddressObj,
    cartData: CardDataInter[],
    fullName: string,
    id: string,
    paymentMethod: string,
    phone: string,
    totalItems: number
    totalPrice: string,
    userId: string,
    whenCreated: string;
    status : string,
}



export type UserDataForOder = {
    isLoading: boolean;
    isError: boolean;
    isSingIn: boolean;
    isLogIn: boolean;
    isFullFilled: boolean;
    errMsg : string;
    userData: {
        // name: string;
        lastName: string;
        firstName: string;
        profilePic: string;
        role: string;
        email: string;
        id: string;
        address?: UserAddressObj[];
        orders?: UserOrderOj[];
        allImages?: [];
    }
}



const initialState: UserDataForOder = {
    isLoading: false,
    isError: false,
    isSingIn: false,
    isLogIn: false,
    isFullFilled: false,
    errMsg : "",
    userData: {
        // name: "",
        lastName: "",
        firstName: "",
        profilePic: "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1700368567/ej31ylpxtamndu3trqtk.png",
        role: "user",
        email: "",
        id: "",
        address: [],
        orders: [],
        allImages: [],
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
        },

        setIsLoading(state, action) {
            state.isLoading = action.payload
        }

    },
    extraReducers: (builder) => {
        builder

            // // // SingUp user --------->
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

                console.log(action.error)

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

                    let { id, firstName, lastName, email, profilePic, role, address } = action.payload.data

                    // // // set Some user data (Very minior data) ------>

                    state.userData.address = address
                    // state.userData.name = name
                    state.userData.firstName = firstName
                    state.userData.lastName = lastName
                    state.userData.email = email
                    state.userData.profilePic = profilePic
                    state.userData.role = role
                    state.userData.id = id


                    // // // set data in localStorage ------>

                    localStorage.setItem("userData", JSON.stringify({ firstName, lastName, email, profilePic, role, id }))
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


            // // // Upadte user data --->

            .addCase(upadteUserData.pending, (state) => {
                state.isLoading = true
                state.isFullFilled = false
            })

            .addCase(upadteUserData.fulfilled, (state, action) => {

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

                    state.isFullFilled = true


                    let { id, firstName, lastName, email, profilePic, role, address, allImages } = action.payload.data

                    // // // set Some user data (Very minior data) ------>

                    state.userData.address = address
                    // state.userData.name = `${firstName} ${lastName}`
                    state.userData.firstName = firstName,
                        state.userData.lastName = lastName,
                        state.userData.email = email
                    state.userData.profilePic = profilePic
                    state.userData.role = role
                    state.userData.id = id

                    if (allImages) {
                        state.userData.allImages = allImages
                    }


                    // // // set data in localStorage ------>

                    localStorage.setItem("userData", JSON.stringify({ firstName, lastName, email, profilePic, role, id }))

                }

                state.isLoading = false
            })

            .addCase(upadteUserData.rejected, (newState, action) => {
                newState.isLoading = false
                newState.isError = true
                newState.isFullFilled = false
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


            // // // Forgot req ----->

            .addCase(forgotRequest.pending , (state)=>{
                state.isLoading = true
                state.isFullFilled = false
            })

            .addCase(forgotRequest.fulfilled, (state, action) => {

                if (action.payload.status === false) {

                    state.isError = true
                    state.errMsg = action.payload.message

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

                    state.isFullFilled = true
                    state.errMsg = action.payload.message


                }

                state.isLoading = false
            })

            .addCase(forgotRequest.rejected, (newState, action) => {
                newState.isLoading = false
                newState.isError = true
                newState.isFullFilled = false
                newState.errMsg = action?.error?.message!
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


            // // // Main forgot pass --->

            .addCase(forgotMain.pending , (state)=>{
                state.isLoading = true
                state.isFullFilled = false
            })

            .addCase(forgotMain.fulfilled, (state, action) => {

                if (action.payload.status === false) {

                    state.isError = true
                    state.errMsg = action.payload.message

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

                    state.isFullFilled = true
                


                }

                state.isLoading = false
            })

            .addCase(forgotMain.rejected, (newState, action) => {
                newState.isLoading = false
                newState.isError = true
                newState.isFullFilled = false
                newState.errMsg = action?.error?.message!
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



export const { setUserData, setLogInStatus, setIsLoading } = userSlice.actions

export const userState = () => useSelector((state: RootState) => state.userReducer)

export default userSlice.reducer
