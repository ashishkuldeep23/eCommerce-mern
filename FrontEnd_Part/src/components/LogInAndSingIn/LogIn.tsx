
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { Link, useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { useState, useEffect } from "react"
import { logInUser, userState } from "../../Slices/UserSlice"
import GoogleBtnLogic from "./GoogleBtnLogic"
import { fetchAllCategoryAndHighlight, fetchAllProducts } from "../../Slices/AllProductSlice"


type FormInputs = {
    username: string
    password: string
}


export default function LogIn() {

    const [passType, setPassType] = useState<string>("password")

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const isLogin = userState().isLogIn

    const isLoading = userState().isLoading

    const limitValue = useSelector((state: RootState) => state.allProductWithCatReducer.onePageLimit)

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, } = useForm<FormInputs>()


    const onSubmit: SubmitHandler<FormInputs> = (data) => {

        dispatch(logInUser({ bodyData: data }))

    }



    useEffect(() => {

        // document.cookie = "token=jwt54555456588"
        // document.cookie = "token2=jwt5457556555456588"
        // console.log(document.cookie)
        // console.log(logInToken)


        // // // Setting Cookie manually (now setting from UserSlices ) ------>

        // if (logInToken) {
        //     document.cookie = `token=${encodeURIComponent(logInToken)}`
        // }



        if (isLogin) {

            // let expires = new Date()
            // expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
            // localStorage.setItem('token', logInToken)


            // // // Call product data after successfull login -->

            // // // Now call Data from home page of useEffect now (When user successfull login then also this will call backend main reason is that ) --->

            dispatch(fetchAllCategoryAndHighlight())
            dispatch(fetchAllProducts({ brand: "", category: '', price: "-1", limit: `${limitValue}` }))
            //  // // // Limit value is 4 set (Change in useEffect of pagination.jsx and here)



            // // // Here moving user to home page --->
            navigate("/");
        }

    }, [isLogin])


    // console.log(watch("email"))
    // console.log(watch("password"))

    // console.log(errors)

    return (
        <>


            <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100">
                {
                    isLoading
                    &&
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-20 h-20  text-gray-200 animate-spin fill-red-600 opacity-100 " viewBox="0 0 100 101" fill="none" >
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                }
            </div>





            <div className={` ${isLoading && "opacity-75"} flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  border h-allAk ${!themeMode ? "bg-white text-black" : " bg-black text-white "}  `}>

                <p className="text-center text-sm text-gray-500 fixed top-5 right-5">
                    <Link to="/" className="font-semibold leading-6 text-cyan-300 hover:text-cayn-600 border border-cyan-300 py-1 px-2 rounded ">
                        <i className="ri-home-4-line"></i>
                    </Link>
                </p>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <Link to={"/"}>
                        <img
                            className="mx-auto h-10 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                    </Link>



                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate={true} className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    // name="email"
                                    type="email"
                                    placeholder="Email"
                                    // autoComplete="email"
                                    // required={true}
                                    {...register("username", {
                                        required: "Email is Required", pattern: {
                                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "Email is Invalid."
                                        }
                                    })}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />
                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.username?.message} </p>

                            </div>
                        </div>


                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2 relative">
                                <input
                                    id="password"
                                    // name="password"
                                    type={passType}
                                    placeholder="Password"
                                    // autoComplete="current-password"
                                    {...register("password", {
                                        required: "Password is required", pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            message: `-at least 8 characters| \n
                                            -must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number | \n
                                            -Can contain special characters`
                                        }
                                    })}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}

                                    onChange={(e) => { e.preventDefault(); e.stopPropagation(); setPassType("password"); }}

                                />

                                <button
                                    className=" absolute top-1.5 right-3 hover:scale-125 focus:scale-125 transition-all"
                                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); setPassType((passType === "password") ? "text" : "password") }}
                                > <i className="ri-eye-fill"></i> </button>

                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.password?.message} </p>
                            </div>
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <button
                        onClick={(e) => { e.stopPropagation(); navigate("/forgot-pass-req") }}
                        className=" text-end w-full mt-2 px-1 hover:text-red-300 transition-all"
                    >Forgot Password</button>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </Link>
                    </p>


                    <GoogleBtnLogic />

                </div>

            </div>
        </>
    )
}
