
// import React from 'react'
import { StarIcon } from '@heroicons/react/24/outline'
import { useSelector, useDispatch } from "react-redux"
import { setSingleProductData } from "../../Slices/AllProductSlice"
import { IProduct } from "./ProductLists"
import { RootState } from "../../store"
import { useNavigate } from 'react-router-dom'


type TProductPrope = {
    product: IProduct
}


const SingleProduct = ({ product }: TProductPrope) => {


    const themeMode = useSelector((store: RootState) => store.themeReducer.mode)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>

            {/* This a href is used to see all videos --> */}
            <a
                key={product.id}
                // href={"/product"}
                className=" min-h-52 h-auto border border-green-300 rounded w-72  mb-5 p-1  mx-2 hover:cursor-pointer "
                onClick={() => { navigate("/product"); dispatch(setSingleProductData({ id: product.id })) }}
            >
                <div className=" rounded-lg overflow-hidden">
                    <img
                        src={product.thumbnail}
                        alt={product.brand}
                        className=" h-52  w-full object-contain object-center group-hover:opacity-75 mb-5"
                    />
                </div>

                <div className="flex justify-between pt-5  px-2 border-t border-green-300 ">

                    <div>
                        <h3 className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}>{product.title}</h3>
                        {/* <h3 className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "}  `}>{product.category}</h3> */}

                        <div className="flex items-center">

                            <p className="h-5 w-5">{<StarIcon />}</p>
                            <p>{product.rating}</p>
                        </div>
                    </div>


                    <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p>

                        {
                            product.discountPercentage
                                ?
                                <p className={`text-lg text-end font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> <span className=' text-sm font-thin line-through'>₹{product.price}</span> ₹{Math.round(product.price - ((product.discountPercentage * product.price) / 100))}</p>

                                :
                                <p className={`text-lg text-end font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> ₹{product.price} </p>

                        }

                    </div>
                </div>

            </a>


        </>
    )
}

export default SingleProduct

