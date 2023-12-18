// import React from 'react'


import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CardDataInter } from "../../Slices/CartSlice";
import { fetchOneProductByID, setSingleProductData } from "../../Slices/AllProductSlice";
import { removeOneItem, onePlusQuan, oneMinusQuan } from "../../Slices/CartSlice";
import { makeMoreRaedablePrice } from "./CartComponent";
import { AppDispatch } from "../../store";


const SingleCartItem = ({ product, mainCartComp }: { product: CardDataInter, mainCartComp: boolean }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    return (


        <>

            <li key={product.id}
                className="flex py-6 hover:cursor-pointer"
                onClick={() => {

                    if (mainCartComp) {
                        navigate(`/product/${product.id}`); 
                        dispatch(fetchOneProductByID({productId : product.id})); 
                        dispatch(setSingleProductData({ id: product.id })); 
                        // dispatch(setSingleOProductId({id : product.id})); 
                        window.scroll(0, 0);
                    }

                }}
            >

                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md  ">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex  justify-between  text-base font-medium ">
                            <h3 className="flex flex-col">
                                <a className="hover:cursor-pointer">{product.title}</a>
                                {/* <a className="hover:cursor-pointer">{JSON.stringify(product?.type)}</a>
                                <a className="hover:cursor-pointer">{JSON.stringify(product?.type)}</a> */}
                                {/* <a className="hover:cursor-pointer">{`${product?.type?.typeName[0]} :  ${product?.type?.typeName[1]} | ${product?.type?.typeVerity[0]} : ${product?.type?.typeVerity[1]} | Stocks : ${product?.type?.typeStock}`}</a> */}

                                <div className="mb-2">
                                    <p className=" capitalize">{`${product?.verity?.typeName[0]} :  ${product?.verity?.typeName[1]} | ${product?.verity?.typeVerity[0]} : ${product?.verity?.typeVerity[1]}`}</p>

                                    {/* <p>{product?.verity.typeId}</p> */}
                                </div>
                            </h3>


                            {

                                (mainCartComp) &&

                                <div className='text-end'>
                                    {
                                        (product.quantity > 1)
                                            ?
                                            <>
                                                <p className="ml-4">₹{product.price} X {product.quantity}</p>
                                                <p className={`ml-4 border-1 border-t border-1`}>₹{makeMoreRaedablePrice(product.quantity * product.price)}</p>
                                            </>
                                            :
                                            <>
                                                <p className="ml-4">₹{makeMoreRaedablePrice(product.quantity * product.price)}</p>
                                            </>
                                    }
                                </div>

                            }

                        </div>
                        {/* <p className="mt-1 text-sm ">{product.verity}</p> */}
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">


                        <div className='flex flex-col items-center'>

                            <p className=" font-bold">Qty {product.quantity}</p>

                            {
                                (!mainCartComp) &&

                                // // // This div will shown in payment page

                                <div className='text-start'>
                                    {
                                        (product.quantity > 1)
                                            ?
                                            <>
                                                <p >₹{product.price} X {product.quantity}</p>
                                                <p className={` font-bold border-1 border-t border-1`}>₹{makeMoreRaedablePrice(product.quantity * product.price)}</p>
                                            </>
                                            :
                                            <>
                                                <p className="font-bold">₹{makeMoreRaedablePrice(product.quantity * product.price)}</p>
                                            </>
                                    }
                                </div>

                            }



                            {

                                (mainCartComp) &&

                                <div className='flex items-center border border-cyan-400 rounded my-1'>
                                    <button
                                        className=' bg-cyan-400 px-1 rounded mr-1 font-bold hover:bg-cyan-600'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            (product.quantity === 1)
                                                ? dispatch(removeOneItem({ ...product }))
                                                : dispatch(oneMinusQuan({ ...product }))
                                        }}
                                    >

                                        {
                                            (product.quantity === 1)
                                                ? <i className="ri-delete-bin-2-line text-red-600"></i>
                                                : "-"
                                        }
                                    </button>
                                    <p className=' px-1 font-bold '>{product.quantity}</p>
                                    <button
                                        className=' bg-cyan-400 px-1 rounded ml-1  font-bold hover:bg-cyan-600'
                                        onClick={(e) => { e.stopPropagation(); dispatch(onePlusQuan({ ...product })) }}
                                    ><i className="ri-add-line"></i></button>
                                </div>


                            }

                        </div>

                        {
                            (mainCartComp) &&
                            <div className="flex">
                                <button
                                    type="button"
                                    className="font-medium text-red-600 hover:text-red-500 rounded p-1 scale-125 hover:border hover:border-red-500"
                                    onClick={(e) => { e.stopPropagation(); dispatch(removeOneItem({ ...product })) }}
                                >
                                    <i className="ri-delete-bin-2-line"></i>
                                </button>
                            </div>
                        }

                    </div>
                </div>

            </li>
        </>


    )
}

export default SingleCartItem