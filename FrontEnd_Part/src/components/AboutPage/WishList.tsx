
// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { userState } from "../../Slices/UserSlice"
import SingleProduct from "../ProductListing/SingleProduct"


const WishList = () => {

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const { userData } = userState()


    if (!userData.wishList || userData.wishList.length <= 0) {
        return <></>
    }

    return (
        <>

            <div className={`${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"} py-10 flex justify-center flex-col items-center `}>

                <h2 className=" text-4xl text-center mt-10 underline text-blue-300">Your Wish List</h2>

                <div className=" text-white  flex flex-wrap justify-center mt-5 gap-5">
                    {
                        userData.wishList.map((ele) => <SingleProduct
                            key={ele.id}
                            product={ele}
                            className=" w-52"
                            forWishList={true}
                        />)
                    }
                </div>

            </div>

        </>
    )
}

export default WishList

