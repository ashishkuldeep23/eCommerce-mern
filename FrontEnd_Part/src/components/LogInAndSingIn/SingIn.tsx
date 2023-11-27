
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { Link, useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch } from "react-redux"
import { createNewUser, userState } from "../../Slices/UserSlice"
import { toast } from "react-toastify"


type SingFormInputs = {

    firstName: string,
    lastName: string,
    address: {
        street: string,
        city: string,
        country: string,
        pincode: string
    },
    email: string,
    password: string,
    confirmPassword: string
}



const formData = new FormData()

formData.append("whenCreted", `${new Date()}`)


export default function SignIn() {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const isLoading = userState().isLoading
    const isSignIn = userState().isSingIn
    const isError = userState().isError


    const [passType, setPassType] = useState<string>("password")

    const [imageNum, setImageNum] = useState<number>(0)

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<SingFormInputs>()




    async function autoFillAddress(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {


        e.preventDefault()
        e.preventDefault()


        let navLocation = () => {
            return new Promise((res, rej) => {
                navigator.geolocation.getCurrentPosition(res, rej);
            });
        }


        let latlong = await navLocation().then((res: any) => {
            let latitude = res?.coords?.latitude;
            let longitude = res?.coords?.longitude;
            return [latitude, longitude]
        })

        let [lat, long] = latlong
        // console.log(lat, long)


        const getCurrentLocation = await fetch(`${import.meta.env.VITE_APP_API_URL}?q=${lat}+${long}&key=${import.meta.env.VITE_APP_API_KEY}`)

        let res = await getCurrentLocation.json()

        // console.log(res)


        if (res.status.code === 200) {
            let city = res.results[0].components.city
            //   let state = res.results[0].components.state
            let country = res.results[0].components.country
            let street = res.results[0].components.suburb
            let pincode = res.results[0].components.postcode


            //   console.log(res.results[0])

            //   let formated = `${city},${state},${country}`

            //   setLocation(formated)

            // console.log(location)
            // console.log(formated)

            setValue("address.street", street)
            setValue("address.city", city)
            setValue("address.country", country)
            setValue("address.pincode", pincode)


        }
        else {

            toast.error(`Error,Please try again. Or Write manually`, {
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



        // // // By this way we can set value in our from ---->
        // setValue("address.city" , "Godna")

    }





    function handlePicUpload(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        e.stopPropagation();

        // console.log(e);

        // let formData = new FormData()

        if (e.target.files) {

            setImageNum(e?.target?.files?.length)

            const file = e?.target?.files[0]

            formData.append('file', file)


        }


    }




    // // // So This is actual fucton that handles onSubit event
    const onSubmit: SubmitHandler<SingFormInputs> = (data) => {
        // console.log(data);

        // // // Here you can call you backend

        if (Object.keys(errors).length <= 0) {

            const { confirmPassword, ...resData } = data

            // const formData = new FormData()


            for (let [key, value] of Object.entries(resData)) {


                if (key === "address") {

                    // formData.append(key, JSON.stringify(value))

                    for (let [key2, value2] of Object.entries(resData?.address)) {

                        formData.set(`${key}[${key2}]`, `${value2}`)
                        // // // Above line ---> ( address.city = gonda ) and so on. 
                    }

                } else {
                    formData.set(key, `${value}`)

                    // // // Don't use append in form data use set() -----> See MDN form data docs.
                }


            }

        }


        dispatch(createNewUser({ formData: formData }))

    }



    console.log(errors)



    useEffect(() => {

        if (isSignIn) {

            navigate("/login")
        }

    }, [isSignIn])




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




            <div className={` ${isLoading && "opacity-75"} flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${!themeMode ? "bg-white text-black" : " bg-black text-white "} border `}>


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


                    {/* Error show div here */}

                    <div className={` ${isError ? "flex" : "hidden"}`}>
                        <h1 className=" mt-2 px-2 rounded text-white text-center bg-red-500 inline-flex mx-auto">Error | Refresh page and Try again. </h1>
                    </div>


                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form noValidate className="space-y-3" onSubmit={handleSubmit(onSubmit)}   >

                        <div className="flex gap-2 justify-between">

                            <div className=" w-3/5">

                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6  ">
                                        First Name <span className=" text-red-500">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="firstName"
                                            placeholder="First Name"
                                            type="text"
                                            {...register("firstName", {
                                                required: "Full Name is Required",
                                                pattern: {
                                                    value: /[a-zA-Z][a-zA-Z0-9-_ .]{3,25}/gi,
                                                    message: "Must start with an alphabetic character. Can contain the following characters: a-z A-Z 0-9 - . _ and should be in between 5 to 25"
                                                }
                                            })}
                                            className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                        />
                                        <p className="text-sm pl-2 text-red-500 font-bold"> {errors.firstName?.message} </p>


                                    </div>
                                </div>


                                <div className="mt-2">
                                    <label htmlFor="lastName" className="block text-sm font-medium leading-6">
                                        Last Name <span className=" text-red-500">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="lastName"
                                            placeholder="Last Name"
                                            type="text"
                                            {...register("lastName", {
                                                required: "Last Name is Required", pattern: {
                                                    value: /[a-zA-Z][a-zA-Z0-9-_ .]{3,25}/gi, message: "Must start with an alphabetic character. Can contain the following characters: a-z A-Z 0-9 - . _ and should be in between 5 to 25"
                                                }
                                            })}
                                            className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                        />

                                        <p className="text-sm pl-2 text-red-500 font-bold"> {errors.lastName?.message} </p>

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
                                            accept="image/png, image/gif, image/jpeg"
                                            className={` ${imageNum === 0 ? "hidden" : ""} scale-90 `}
                                            onChange={(e) => { handlePicUpload(e) }}
                                        />

                                        <label htmlFor="profile_pic">
                                            <i className={`ri-camera-line text-6xl sm:text-8xl ${imageNum > 0 && "hidden"} `}></i>
                                        </label>

                                    </div>
                                </div>


                            </div>



                        </div>


                        <div>
                            <div className="flex justify-between items-end w-4/5">

                                <label htmlFor="address" className="block text-sm font-medium leading-6 ">
                                    Address <span className=" text-red-500">(Optional)</span>
                                </label>

                                <button
                                    className="text-green-500 border border-1 border-green-500 px-1 rounded text-sm hover:bg-green-500   hover:text-white"
                                    onClick={(e) => autoFillAddress(e)}
                                >Autofill Address</button>
                            </div>
                            <div className="mt-2 flex flex-wrap">


                                {/* For street  */}
                                <input
                                    id="address"
                                    type="text"
                                    placeholder="Street"
                                    {...register("address.street")}
                                    className={` w-1/2 my-1 block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                {/* For City */}
                                <input

                                    type="text"
                                    placeholder="City"
                                    {...register("address.city")}
                                    className={` w-1/2 my-1 block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                {/* For Country  */}
                                <input

                                    type="text"
                                    placeholder="Country"
                                    {...register("address.country")}
                                    className={` w-1/2 block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                {/* For PIN Code  */}
                                <input

                                    type="number"
                                    placeholder="PIN Code"
                                    {...register("address.pincode", { pattern: { value: /^[1-9][0-9]{5}$/gim, message: "Matches exactly one digit from 1 to 9 and Matches exactly five digits in the inclusive range 0-9" } })}
                                    className={` w-1/2 block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                <p className="text-sm pl-2 text-red-500 font-bold">
                                    {errors.address?.city?.message}
                                    {errors.address?.country?.message}
                                    {errors.address?.street?.message}
                                    {errors.address?.pincode?.message}
                                </p>

                            </div>
                        </div>



                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                Email address <span className=" text-red-500">*</span>
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
                                    Password <span className=" text-red-500">*</span>
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
                                            message: `-at least 8 characters \n
                                            |-must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number| \n
                                            |-Can contain special characters`
                                        }
                                    })}
                                    onChange={(e) => { e.preventDefault(); e.stopPropagation(); setPassType('password') }}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                <button
                                    className=" absolute top-1.5 right-3 hover:scale-125 focus:scale-125 transition-all"
                                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); setPassType((passType === "password") ? "text" : "password") }}
                                > <i className="ri-eye-fill"></i> </button>

                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.password?.message} </p>
                            </div>
                        </div>


                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="con_password" className="block text-sm font-medium leading-6 ">
                                    Confirm Password <span className=" text-red-500">*</span>
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
                                    onChange={(e) => { e.preventDefault(); e.stopPropagation(); setPassType('password') }}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                <button
                                    className=" absolute top-1.5 right-3 hover:scale-125 focus:scale-125 transition-all"
                                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); setPassType((passType === "password") ? "text" : "password") }}
                                > <i className="ri-eye-fill"></i> </button>

                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.confirmPassword?.message} </p>
                            </div>
                        </div>



                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>


                    </form>

                    <p className="mt-5 text-center text-sm text-gray-500">
                        Already account?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
