

// import React from 'react'

import {  useSelector } from "react-redux"
import {  RootState } from "../../store"
import { userState } from "../../Slices/UserSlice"
// import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import CreateNewProduct from "./CreateProduct"
import AllProducts from "./AllProducts"

const AdminMain = () => {

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const isUserAdmin = userState().userData.role

    const isLoading = userState().isLoading

    // console.log(isUserAdmin)



    // // // If user in not admin then redirect on home page ------>
    if (isLoading && isUserAdmin !== "admin") {

        return <Navigate to="/"  ></Navigate>;
    }



    return (
        <>

            <div className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} transition-all`}  >

                <div className="lg:max-w-7xl lg:px-8 md:px-4 sm:px-6 mx-auto py-10 px-1.5 flex flex-col justify-center items-center ">

                    <div>
                        <p className=" text-center text-5xl mb-5 underline font-bold">Admin page</p>
                    </div>

                    {/* All product visiable */}
                    <AllProducts />

                    {/* Create new product */}
                    <CreateNewProduct />


                </div>

            </div>

        </>

    )
}

export default AdminMain






