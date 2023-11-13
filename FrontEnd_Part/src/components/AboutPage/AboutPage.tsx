


// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { userState } from "../../Slices/UserSlice"



let previousOrders = [
    {
        id: 1,
        name: 'Earthen Bottle',
        href: '#',
        price: '$48',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$89',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },

]


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


                {/* user Details div */}
                <div
                    className="flex mx-auto max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8  p-2 pt-16 justify-center items-center flex-col md:flex-row my-10"
                >

                    <div>

                        {/* <img
                            className=" w-80 md:max-w-sm  rounded-xl  outline outline-offset-2 outline-emerald-300  hover:outline-offset-4  transition-all "
                            src={getUserData.profilePic}
                            alt=""
                        /> */}

                        <div
                            className={` w-56 h-56 sm:w-80 sm:h-80 md:max-w-sm  rounded-xl  outline outline-offset-2 outline-emerald-300 bg-slate-300  hover:outline-offset-4  transition-all `}
                        >


                        </div>

                    </div>

                    <div className="ml-0 mt-5 md:mt-0 md:ml-10">
                        <h2 className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1" >Name : {getUserData.name}</h2>
                        <p className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1" >Email : {getUserData.email} </p>
                        <p className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1" >Address : Array or all address</p>
                    </div>

                </div>


                {/* order div */}
                <div className="flex flex-col items-center">

                    <h2 className=" text-2xl text-center mb-5 underline text-green-300 mt-10 ">Your previous orders </h2>

                    <div className=" flex justify-center flex-wrap gap-3 ">


                        {
                            previousOrders && previousOrders.map((item, i) => {
                                return (



                                    <div key={i} className="mt-10">
                                        {/* <img className=" w-72 md:max-w-sm rounded" src={item.imageSrc} ></img> */}

                                        <div className=" w-56 h-56 sm:w-72 sm:h-72 bg-slate-300 rounded md:max-w-sm"></div>

                                        <p className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1 mt-4">{item.name}</p>
                                        <p className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1 font-bold">{item.price}</p>
                                        <h2 className="bg-slate-300 h-6 w-full rounded my-0.5 px-1">Date and Time </h2>
                                    </div>




                                )
                            })
                        }
                    </div>

                </div>


                {/* Review on product div */}
                <div></div>


            </div>


        </>
    )
}

export default AboutPage


