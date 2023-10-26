
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Link } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"


type FormInputs = {
    email: string
    password: string
}


export default function LogIn() {

    const [passType, setPassType] = useState<string>("password")

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const { register, handleSubmit, watch, formState: { errors }, } = useForm<FormInputs>()


    const onSubmit: SubmitHandler<FormInputs> = (data) => { console.log(data); }

    console.log(watch("email"))
    console.log(watch("password"))

    console.log(errors)

    return (
        <>
            <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  border h-allAk ${!themeMode ? "bg-white text-black" : " bg-black text-white "}  `}>

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
                                    {...register("email", {
                                        required: "Email is Required", pattern: {
                                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "Email is Invalid."
                                        }
                                    })}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />
                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.email?.message} </p>

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
                                            |-must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number| \n
                                            |-Can contain special characters`
                                        }
                                    })}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                <button
                                    className=" absolute top-1.5 right-3 hover:scale-125 focus:scale-125 transition-all"
                                    onClick={() => { setPassType((passType === "password") ? "text" : "password") }}
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

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Registration
                        </Link>
                    </p>

                </div>

            </div>
        </>
    )
}
