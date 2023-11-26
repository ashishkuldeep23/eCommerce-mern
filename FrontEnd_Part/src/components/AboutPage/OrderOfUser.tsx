

// import React from 'react'

const OrderOfUser = () => {


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



    return (
        <>

            {/* order div */}
            <div className="flex flex-col items-center">

                <h2 className=" text-2xl text-center mb-5 underline text-green-300 mt-10 ">Your previous orders </h2>

                <div className=" flex justify-center flex-wrap gap-3 ">


                    {
                        previousOrders && previousOrders.map((item, i) => {
                            return (

                                <div key={i} className="mt-10 w-full sm:w-auto">
                                    {/* <img className=" w-72 md:max-w-sm rounded" src={item.imageSrc} ></img> */}

                                    <div className=" w-full sm:w-72  h-56 sm:h-72 bg-slate-300 rounded md:max-w-sm"></div>

                                    <p className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1 mt-4">{item.name}</p>
                                    <p className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1 font-bold">{item.price}</p>
                                    <h2 className="bg-slate-300 h-6 w-full rounded my-0.5 px-1">Date and Time </h2>
                                </div>

                            )
                        })
                    }
                </div>

            </div>

        </>
    )
}

export default OrderOfUser

