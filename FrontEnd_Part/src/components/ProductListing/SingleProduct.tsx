
// import React from 'react'
import { StarIcon } from '@heroicons/react/24/outline'
import { useSelector, useDispatch } from "react-redux"
import { setSingleProductData } from "../../Slices/AllProductSlice"
import { fetchOneProductByID } from '../../Slices/AllProductSlice'
import { IProduct } from "./ProductLists"
import { AppDispatch, RootState } from "../../store"
import { useNavigate } from 'react-router-dom'


type TProductPrope = {
    product: IProduct,
    className ?: string
}


const SingleProduct = ({ product , className = ''}: TProductPrope) => {


    const themeMode = useSelector((store: RootState) => store.themeReducer.mode)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    return (
        <>

            {/* This a href is used to see all videos --> */}
            <a
                key={product.id}
                // href={"/product"}
                className={` ${className} border ${!themeMode ? "border-slate-300" : " border-slate-600 "}  rounded-lg min-h-52 h-auto   w-72  mb-5  mx-2 hover:cursor-pointer  cursor-pointer`}
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                    dispatch(setSingleProductData({ id: product.id }));
                    dispatch(fetchOneProductByID({ productId: product.id }));
                    // dispatch(setSingleOProductId({ id: product.id })); 
                    window.scroll(0, 0);
                }}
                id='singleCardHolder'
            >
                <div className=" rounded-lg overflow-hidden">
                    <img
                        src={product.thumbnail}
                        alt={product.brand}
                        className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    />
                </div>

                <div className="flex justify-between pt-5  px-2 ">

                    <div>
                        <h3
                            className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                            id="headingOfProduct"
                        >{product.title}</h3>
                        {/* <h3 className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "}  `}>{product.category}</h3> */}

                        <div className={`flex items-center  ${(product.rating.totalPerson > 0) && "text-yellow-400"} `}>

                            <p className="h-5 w-5">{<StarIcon />}</p>
                            {/* <p>{product.rating.avgRating }</p> */}
                            <p>{product.rating.totalPerson > 0 ? ((product.rating.avgRating / product.rating.totalPerson).toFixed(1)) : 0}</p>
                        </div>
                    </div>


                    <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}

                        {
                            product.discountPercentage
                                ?
                                <p className={`text-lg text-end font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> <span className=' text-sm font-thin line-through'>₹{product.price}</span> ₹{(Math.round(product.price - ((product.discountPercentage * product.price) / 100)))}</p>

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

