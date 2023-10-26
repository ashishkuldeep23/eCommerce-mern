

import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Link } from "react-router-dom"



export default function SignIn() {

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)


    return (
        <>

            <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${!themeMode ? "bg-white text-black" : " bg-black text-white "} border h-allAk`}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
                       Register your-self
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">

                        <div className="flex gap-2 justify-between">

                            <div className=" w-3/5">

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 ">
                                        Full Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            placeholder="Name"
                                            name="email"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                        />
                                    </div>
                                </div>


                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium leading-6">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="address"
                                            placeholder="Address"
                                            name="address"
                                            type="text"
                                            autoComplete="email"
                                            required
                                            className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                        />
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
                            <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    required
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />
                            </div>
                        </div>



                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    required
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />
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
