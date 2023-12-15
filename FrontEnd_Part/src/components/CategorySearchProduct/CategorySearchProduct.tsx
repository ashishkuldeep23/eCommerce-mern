
// import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useEffect } from "react"
import { fetchAllCategoryAndHighlight, fetchAllProducts } from "../../Slices/AllProductSlice"
import SingleProduct from "../ProductListing/SingleProduct"
import { useNavigate } from "react-router-dom"

const CategorySearchProduct = () => {

    const themeMode = useSelector((ashish: RootState) => ashish.themeReducer.mode)

    const { brand, category } = useSelector((ashish: RootState) => ashish.allProductWithCatReducer.searchBrandAndCate)

    const isLoading = useSelector((state: RootState) => state.allProductWithCatReducer.isLoading)

    const allProducts = useSelector((state: RootState) => state.allProductWithCatReducer.allProducts)

    const limitValue = useSelector((state: RootState) => state.allProductWithCatReducer.onePageLimit)

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()


    useEffect(() => {

        if (brand || category) {

            dispatch(fetchAllProducts({ brand: brand, category: category, price: "-1" }))
        }
        else {
            navigate("/");
        }



    }, [brand, category])


    return (
        <>

            <div className={`${!themeMode ? "bg-white text-gray-600 " : 'bg-black text-gray-300 '} `}>

                <div className="mx-auto max-w-full md:max-w-allAk px-1 md:px-2 pt-10">


                    {/* Loader code -------> */}
                    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 scale-200 z-30">
                        {
                            isLoading
                            &&

                            <div role="status">
                                <svg aria-hidden="true" className="inline w-20 h-20  text-transparent animate-spin fill-red-600 opacity-100 " viewBox="0 0 100 101" fill="none" >
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        }
                    </div>


                    {
                        brand
                        &&
                        <p className=" my-2 ml-2 text-lg  text-center underline">Result by Brand : <span className=" capitalize border px-2 rounded border-blue-500">{brand}</span></p>
                    }



                    {
                        category
                        &&
                        <p className=" my-2 ml-2 text-lg text-center underline ">Result By Category : <span className=" capitalize border px-2 rounded border-blue-500">{category}</span></p>
                    }


                    <div className=" flex flex-wrap  justify-center overflow-y-hidden overflow-x-auto  pb-3 ">

                        {
                            // allProducts.map((ele))

                            allProducts.map((product) => <SingleProduct className="mx-10 p-5" product={product} key={product.id} />)
                        }

                    </div>


                    {/* Goto home btn  */}
                    <div className=" mt-5 flex justify-end items-end">
                        <button
                            className=" px-2 my-2 rounded font-bold border border-yellow-300 hover:scale-x-110 transition-all"
                            onClick={() => {
                                navigate("/");
                                dispatch(fetchAllCategoryAndHighlight())
                                dispatch(fetchAllProducts({ brand: "", category: '', price: "-1", limit: `${limitValue}` }))
                                window.scroll(0, 500);
                            }}
                        >GoTo Home 🏠</button>
                    </div>


                </div>

            </div>

        </>
    )
}

export default CategorySearchProduct