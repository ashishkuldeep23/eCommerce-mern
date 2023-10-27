
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Link } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"


type SingFormInputs = {

    fullName: string,
    userName: string,
    address: {
        city: string,
        state: string,
        country: string,
        pin: number
    },
    email: string,
    password: string,
    confirmPassword: string

}

export default function SignIn() {

    const [passType, setPassType] = useState<string>("password")

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)


    const { register, handleSubmit, formState: { errors }, } = useForm<SingFormInputs>()

    const onSubmit: SubmitHandler<SingFormInputs> = (data) => { console.log(data); }



    // console.log(watch("email"))
    // console.log(watch("password"))
    console.log(errors)



    function autoFillAddress() {
        alert("Ok i'll implement")
    }


    return (
        <>

            <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${!themeMode ? "bg-white text-black" : " bg-black text-white "} border `}>


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
                        Register your-self
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form noValidate className="space-y-3" onSubmit={handleSubmit(onSubmit)} >

                        <div className="flex gap-2 justify-between">

                            <div className=" w-3/5">

                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium leading-6 ">
                                        Full Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="fullName"
                                            placeholder="Full Name"
                                            type="text"
                                            {...register("fullName", {
                                                required: "Full Name is Required", pattern: {
                                                    value: /[a-zA-Z][a-zA-Z0-9-_ .]{5,25}/gi, message: "Must start with an alphabetic character. Can contain the following characters: a-z A-Z 0-9 - . _ and should be in between 5 to 25"
                                                }
                                            })}
                                            className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                        />
                                        <p className="text-sm pl-2 text-red-500 font-bold"> {errors.fullName?.message} </p>


                                    </div>
                                </div>


                                <div>
                                    <label htmlFor="userName" className="block text-sm font-medium leading-6">
                                        User Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="userName"
                                            placeholder="User Name"
                                            type="text"
                                            {...register("userName", {
                                                required: "User Name is Required", pattern: {
                                                    value: /^([a-z0-9]){4,20}$/gm, message: "Value must be from 4 to 20 characters in length, only allow small letters and numbers, no special characters, full line is evaluated."
                                                }
                                            })}
                                            className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                        />

                                        <p className="text-sm pl-2 text-red-500 font-bold"> {errors.userName?.message} </p>

                                    </div>
                                </div>


                            </div>

                            <div className=" w-2/5">


                                <div className=" h-4/5 text-center ">
                                    <label htmlFor="profile_pic" className="block text-sm font-medium leading-6 ">
                                        Profile Pic
                                    </label>
                                    <div
                                        // className="mt-2 h-full  flex items-center bg-green-600"
                                        className={` h-full flex items-center justify-center w-full rounded-md border-0  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"} my-1.5`}
                                    >
                                        <input
                                            id="profile_pic"
                                            placeholder="Profile Pic"
                                            name="pic"
                                            type="file"
                                            autoComplete="email"
                                            required={true}
                                            accept="image/png, image/gif, image/jpeg"
                                            className={` hidden `}
                                        />

                                        <label htmlFor="profile_pic">
                                            <i className="ri-camera-line text-6xl sm:text-8xl"></i>
                                        </label>

                                    </div>
                                </div>


                            </div>



                        </div>


                        <div>
                            <div className="flex justify-between items-end w-4/5">

                                <label htmlFor="address" className="block text-sm font-medium leading-6 ">
                                    Address
                                </label>

                                <button
                                    className="text-green-500 border border-1 border-green-500 px-1 rounded text-sm hover:bg-green-500   hover:text-white"
                                    onClick={autoFillAddress}
                                >Autofill Address</button>
                            </div>
                            <div className="mt-2 flex flex-wrap">
                                {/* For City */}
                                <input
                                    id="address"
                                    type="text"
                                    placeholder="City"
                                    {...register("address.city", { required: "City is missing" })}
                                    className={` w-1/2 my-1 block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                {/* For State  */}
                                <input
                                    type="text"
                                    placeholder="State"
                                    {...register("address.state", { required: "State is missing" })}
                                    className={` w-1/2 my-1 block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                {/* For Country  */}
                                <input
                                    type="text"
                                    placeholder="Country"
                                    {...register("address.country", { required: "Country is missing" })}
                                    className={` w-1/2 block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                {/* For PIN Code  */}
                                <input
                                    type="number"
                                    placeholder="PIN Code"
                                    {...register("address.pin", { required: "PIN Code is missing", pattern: { value: /^[1-9][0-9]{5}$/gim, message: "Matches exactly one digit from 1 to 9 and Matches exactly five digits in the inclusive range 0-9" } })}
                                    className={` w-1/2 block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.address?.city?.message} {errors.address?.country?.message} {errors.address?.state?.message} {errors.address?.pin?.message} </p>

                            </div>
                        </div>



                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    {...register('email', {
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
                                    type={passType}
                                    placeholder="Password"
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
                                    onClick={(e) => {e.stopPropagation(); setPassType((passType === "password") ? "text" : "password") }}
                                > <i className="ri-eye-fill"></i> </button>

                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.password?.message} </p>
                            </div>
                        </div>


                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="con_password" className="block text-sm font-medium leading-6 ">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2 relative">
                                <input
                                    id="con_password"
                                    type={passType}
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword", {
                                        required: "Confirm Password is required",
                                        validate: (value, SingFormInputs) => value === SingFormInputs.password || "Passwrd not matching"
                                    })}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                <button
                                    className=" absolute top-1.5 right-3 hover:scale-125 focus:scale-125 transition-all"
                                    onClick={(e) => {e.stopPropagation(); setPassType((passType === "password") ? "text" : "password") }}
                                > <i className="ri-eye-fill"></i> </button>

                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.confirmPassword?.message} </p>
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

                    <p className="mt-5 text-center text-sm text-gray-500">
                        Already account?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in Now
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
