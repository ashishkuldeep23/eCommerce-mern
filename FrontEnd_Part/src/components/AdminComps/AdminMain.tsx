

// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { userState } from "../../Slices/UserSlice"
// import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import CreateNewProduct from "./CreateProduct"
import AllProducts from "./AllProducts"
import { AllOdersComp } from "./AllOdersComp"
import DataInChartFormate from "./DataInChartFormate"

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

                        <div className=" flex flex-col sm:flex-row gap-2 flex-wrap items-center border-x px-1">

                            <a className="px-2 border-b my-1 text-violet-500" href="#createOrderDiv">See Create Product</a>
                            <a className="px-2 border-b my-1 text-violet-500" href="#allProductsDiv">See All Products</a>
                            <a className="px-2 border-b my-1 text-violet-500" href="#allOrdersDiv">See All Orders</a>
                            <a className="px-2 border-b my-1 text-violet-500" href="#OrderDataChartDiv">See OrderChart</a>
                        </div>

                    </div>

                    {/* Create new product */}
                    <CreateNewProduct />

                    {/* All product visiable */}
                    <AllProducts />

                    {/* All order component  */}
                    <AllOdersComp />

                    {/* Simple chart to show all order (Improve letar) */}
                    <DataInChartFormate />


                    {/* <div> */}
                    <button
                        className=" text-sm capitalize px-4 border border-gray-400 rounded-full ml-auto mr-1"
                        onClick={() => { window.scroll(0, 0) }}
                    >Goto🔝</button>
                    {/* </div> */}


                </div>

            </div>

        </>

    )
}

export default AdminMain






