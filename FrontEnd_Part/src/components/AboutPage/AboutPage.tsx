


// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"
// import { userState } from "../../Slices/UserSlice"
import DetailsOfUser from "./DetailsOfUser"
import OrderOfUser from "./OrderOfUser"
import { userState } from "../../Slices/UserSlice"
import WishList from "./WishList"




const AboutPage = () => {


    const themeMode = useSelector((store: RootState) => store.themeReducer.mode)


    // // // Or give the user profile dependancy for animation of loading ----> (Below is used in animation of loading)
    const hightLightProducts = useSelector((store: RootState) => store.allProductWithCatReducer.allHighlightProducts)


    const getUserData = userState().userData





    return (
        <>

            <div
                className={`${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"} ${hightLightProducts.length <= 0 && "animate-pulse"} p-5`}
            >


                <div className="text-center mt-10 text-3xl">
                    <p className=" underline">Welcome <span className=" font-bold ">{(getUserData.firstName || "") + " " + (getUserData.lastName || "")} 😊</span></p>
                </div>


                {/* Details of user div ----------> */}
                <DetailsOfUser />


                <WishList />


                {/* Order Div ---------> */}
                <OrderOfUser />


                {/* Review on product div */}
                {/* <div></div> */}


            </div>


        </>
    )
}

export default AboutPage


