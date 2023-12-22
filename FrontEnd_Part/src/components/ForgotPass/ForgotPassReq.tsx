
// import React from 'react'
// import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useForm, SubmitHandler } from "react-hook-form"
import { forgotRequest, userState } from "../../Slices/UserSlice"
import { useEffect } from "react"


type FormInputs = {
    email: string
}




const ForgotPassReq = () => {

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormInputs>()

    const isLoading = userState().isLoading

    const isFullfilled = userState().isFullFilled

    const errMsg = userState().errMsg

    const dispatch = useDispatch<AppDispatch>()


    const onSubmit: SubmitHandler<FormInputs> = (data) => {

        // dispatch(logInUser({ bodyData: data }))
        // console.log(data)
        // alert("calling backend to send data --->")


        dispatch(forgotRequest(data.email))

    }


    useEffect(()=>{

        if(isFullfilled){
            setValue("email" , "")
        }

    } , [isFullfilled])


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



            <div className={`w-full h-allAk ${!themeMode ? "bg-white text-black" : "bg-black text-white"} `}>


                <div
                    className={` flex flex-col items-center mx-auto max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8 p-2 pt-40`}
                >

                    <div>
                        <img
                            className="mx-auto h-10 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />


                        <p className="my-10 text-xl font-bold text-center px-5">Request For Forgot Password</p>

                    </div>



                    <div className="sm:mx-auto sm:w-full sm:max-w-sm rounded p-1 xsm:p-5">


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
                                        {...register("email", {
                                            required: "Email is Required", pattern: {
                                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "Invalid Email."
                                            }
                                        })}
                                        className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                    />
                                    <p className="text-sm pl-2 text-red-500 font-bold"> {errors.email?.message} </p>

                                </div>
                            </div>

                            {/* Error message from backend */}
                            <div className="text-red-500 font-bold text-center">{errMsg}</div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    Send Mail
                                </button>
                            </div>
                        </form>


                    </div>

                </div>

            </div>


        </>
    )
}

export default ForgotPassReq

