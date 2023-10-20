


// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"



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


    const themeMode = useSelector( (store : RootState) => store.themeReducer.mode )


    return (
        <>

            <div className={`${ !themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200" } p-5 `}>

                {/* user Details  */}
                <div className="flex mx-auto max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8  p-2 pt-16 justify-center items-center flex-col md:flex-row my-10">

                    <div>

                        <img 
                        className=" w-72 md:max-w-sm rounded-full  outline outline-offset-2 outline-emerald-300  hover:outline-offset-4  transition-all " 
                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg" alt="" 
                        />
                    </div>

                    <div className="ml-10">
                        <h2>Name : </h2>
                        <p>Email : </p>
                        <p>Address : Array or all address</p>
                    </div>

                </div>

                {/* order  */}
                <div className="flex flex-col items-center">

                    <h2 className=" text-2xl text-center mb-5 underline text-green-300 ">Your previous orders </h2>

                    <div className=" flex justify-center flex-wrap gap-3 border">


                        {
                            previousOrders && previousOrders.map((item, i) => {
                                return (



                                    <div key={i}>
                                        <img className=" w-72 md:max-w-sm rounded" src={item.imageSrc} ></img>
                                        <p className="mt-4">{item.name}</p>
                                        <p className="font-bold">{item.price}</p>
                                        <h2>Date and Time </h2>
                                    </div>




                                )
                            })
                        }
                    </div>

                </div>

            </div>


        </>
    )
}

export default AboutPage


