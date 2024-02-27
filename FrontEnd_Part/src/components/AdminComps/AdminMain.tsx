

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
import ChartJs2 from "./ChartJs2"
// import { useEffect } from "react"

const AdminMain = () => {

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const isUserAdmin = userState().userData.role

    const isLoading = userState().isLoading

    // console.log(isUserAdmin)


    const navigationTabInfo = [
        { aTagName: "See Create Product", href: "createOrderDiv" },
        { aTagName: "See All Products", href: "allProductsDiv" },
        { aTagName: "See All Orders", href: "allOrdersDiv" },
        { aTagName: "See Charts", href: "OrderDataChartDiv" },
    ]




    // // // Pure js method used (No any react thing used) ---->
    function clickScrollHandler(divId: string) {

        let actualDiv = document.querySelector(`#${divId}`)

        // console.log(actualDiv)
        // console.log(actualDiv?.getBoundingClientRect())

        let top = actualDiv?.getBoundingClientRect().top
        let lessSrool = 100
        top && window.scroll(0, (top - lessSrool))
    }



    // // // If user in not admin then redirect on home page ------>
    if (isLoading && isUserAdmin !== "admin") {
        return <Navigate to="/"  ></Navigate>;
    }


    return (
        <>

            <div className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} transition-all`}  >

                <div className="lg:max-w-7xl lg:px-8 md:px-4 sm:px-6 mx-auto py-10 px-1.5 flex flex-col justify-center items-center ">

                    <p className=" text-center text-5xl mb-5 underline font-bold">Admin page</p>


                    <div className=" sticky z-[10]  -top-24 sm:top-6 lg:top-12 hover:top-12 hover:sm:top-12 hover:lg:top-16  bg-green-400 text-white font-semibold flex flex-col sm:flex-row gap-2 flex-wrap items-center  px-2 rounded transition-all ">


                        {
                            navigationTabInfo.map((ele, i) => {

                                return (
                                    <a
                                        key={i}
                                        className="px-2 border-b my-1 hover:border-b-violet-800 hover:text-violet-800 hover:cursor-pointer transition-all"
                                        // href={`#${ele.href}`}

                                        onClick={() => { clickScrollHandler(ele.href) }}
                                    >{ele.aTagName}</a>
                                )

                            })
                        }



                    </div>


                    {/* Create new product */}
                    <CreateNewProduct />

                    {/* All product visiable */}
                    <AllProducts />

                    {/* All order component  */}
                    <AllOdersComp />

                    {/* Simple chart to show all order (Improve letar) */}
                    <DataInChartFormate />

                    {/* chat package ---> */}
                    <ChartJs2 />


                    {/* <div> */}
                    <button
                        className={` ${!themeMode ? "bg-white text-zinc-900" : "bg-black text-gray-100"} font-semibold fixed bottom-5 right-5 md:bottom-10 md:right-10 text-sm capitalize px-4 border border-gray-400 rounded-full ml-auto mr-1`}
                        onClick={() => { window.scroll(0, 0) }}
                    >Goto🔝</button>
                    {/* </div> */}


                </div>

            </div>

        </>

    )
}

export default AdminMain






