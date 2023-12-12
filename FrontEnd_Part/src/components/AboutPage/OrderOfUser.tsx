
import { Fragment, useEffect } from 'react'
import { fetchUser, userState } from "../../Slices/UserSlice"
import { makeMoreRaedablePrice } from '../CartComp/CartComponent'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { useNavigate } from 'react-router-dom'
import { fetchOneProductByID, setSingleProductData } from '../../Slices/AllProductSlice'
import { CardDataInter } from '../../Slices/CartSlice'
import { gettingTokenInCookieAndLocalHost } from '../../App'
import { orderState, updateOrder } from '../../Slices/OrderSlice'



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




const OrderOfUser = () => {

    const getUserData = userState().userData

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    // console.log(getUserData)

    const isFullfilled = orderState().isFullFilled

    useEffect(() => {

        if (gettingTokenInCookieAndLocalHost()) {
            // // // Call server to fetch user (calling server to fetch orders Or updated order data ---> ) ----->
            dispatch(fetchUser())
        }

    }, [isFullfilled])


    return (
        <div className={`${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"} py-10 flex justify-center flex-col items-center `}>

            {/* order div */}

            <h2 className=" text-4xl text-center mb-5 underline text-green-300">Your previous orders </h2>

            {
                getUserData.orders && (getUserData.orders.length > 0)

                    ?
                    // // Actual UI code ---->

                    <div className='flex flex-wrap justify-evenly px-5'>
                        {

                            getUserData.orders.map((order, i) => {

                                return (
                                    <Fragment key={order.id}>

                                        {/* {`${JSON.stringify(getUserData.orders)}`} */}


                                        <div className=' pb-28 flex justify-center'>

                                            {/* <div className=' flex justify-between flex-wrap'>

                                        <p>For : {order.fullName}</p>
                                        <p>Method : {order.paymentMethod}</p>
                                        <p>Phone : {order.phone}</p>
                                        <p>Address : {order.address.street + " " + order.address.city + " " + order.address.country + " " + order.address.pincode}</p>
                                        <p>Date & Time : {order.whenCreated}</p>
                                    </div> */}



                                            <div className={` w-fit h-fit sm:pr-3 rounded  flex flex-wrap gap-2 justify-center items-center relative  border-b-2 border-l-2 ${!themeMode ? "border-green-500" : "border-green-300"} transition-all `}>

                                                {/* single order detaio */}
                                                <div className={`w-full smm:w-72 h-96 border-2 rounded md:max-w-sm px-1 flex flex-col justify-center text-center relative ${!themeMode ? "bg-green-300 border-green-500 " : "bg-green-800 border-green-300 "}  transition-all`}>

                                                    <p className=' font-bold font-mono underline text-xl absolute top-8 left-1/2 -translate-x-1/2 w-full'> {getUserData.orders && getUserData.orders?.length - i + ")"}Order Details</p>


                                                    <div className=' text-start ml-3 pl-2 border-l rounded '>

                                                        <p className=' text-3xl font-bold underline'> <span className=' underline text-lg'>Name</span> : {order.fullName}</p>

                                                        <div className='flex text-xl'>
                                                            <span className=' underline text-lg'>Mo. No.:</span>
                                                            <p>{order.phone},</p>
                                                            <p>{order.paymentMethod}</p>
                                                        </div>

                                                        <p className=' underline'><span className=' underline text-lg'>Address</span>  : {order.address.street + " " + order.address.city + " " + order.address.country + " " + order.address.pincode}</p>

                                                        <p> <span className=' underline text-lg'>Date & Time</span> : {order.whenCreated}</p>

                                                        <p><span className=' underline text-lg'>Total items</span> : All <span className='font-extrabold bg-yellow-500 px-1 rounded'>{order.cartData.length}</span> Orders <span className=' hidden sm:inline'>➡️</span> <span className=' inline sm:hidden'>⬇️</span> </p>

                                                    </div>


                                                    <div className=' w-11/12 flex  justify-end absolute bottom-0 right-0'>

                                                        {
                                                            order.status !== "Received"
                                                            &&
                                                            <button
                                                                className=' bg-yellow-400 px-2 text-black rounded font-bold hover:text-red-500 hover:bg-yellow-200 absolute left-0'
                                                                onClick={(e) => { e.stopPropagation(); dispatch(updateOrder({ body: { whatUpdate: "status", orderId: `${order.id}` } })) }}
                                                            >Make Received</button>
                                                        }
                                                        <p className={`border-2 px-2 rounded ${!themeMode ? "border-green-500" : "border-green-300"}`}>Status : {order.status}</p>
                                                    </div>

                                                </div>

                                                {/* <div className=' flex flex-wrap justify-evenly gap-2'> */}

                                                {
                                                    order.cartData && (order.cartData.length > 0)

                                                    &&

                                                    order.cartData.map((order: CardDataInter, i) => <SingleOrderData key={i} order={order} />)

                                                }


                                                {/* </div> */}

                                            </div>



                                        </div>


                                    </Fragment>
                                )

                            })
                        }
                    </div>


                    :
                    // // // Skeleton code ---->
                    <div className="flex flex-col items-center px-5">

                        {
                            (getUserData.orders && getUserData.orders?.length === 0)
                            &&
                            <div className='flex flex-col items-center'>
                                <p className=' text-3xl'>No order found, order something first</p>
                                <button
                                    className=' bg-blue-500 px-2 rounded font-bold mt-3'
                                    onClick={(e) => { e.stopPropagation(); navigate("/") }}
                                >GoTo Home🏠</button>
                            </div>
                        }


                        {/* Skeleton div -----> */}
                        <div className=" flex justify-center flex-wrap gap-3 ">


                            {
                                previousOrders && previousOrders.map((item, i) => {
                                    return (

                                        <div key={i} className="mt-10 w-full sm:w-auto text-black">
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
            }

        </div>
    )
}

export default OrderOfUser






function SingleOrderData({ order }: { order: CardDataInter }) {


    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)


    return (
        <div
            key={order.id}
            id='single_order_div'
            className="w-full smm:w-72 flex flex-col items-center overflow-hidden hover:cursor-pointer"
            onClick={(e) => { 
                e.stopPropagation(); 
                navigate(`/product/${order.id}`); 
                dispatch(fetchOneProductByID({ productId: order.id })); 
                dispatch(setSingleProductData({ id: order.id })); 
                window.scroll(0, 0);
            }}
        >

            <img className=" w-72 h-64 object-cover md:max-w-sm rounded hover:scale-150 transition-all" src={order.thumbnail} ></img>

            {/* <div className=" w-full sm:w-72  h-56 sm:h-72 bg-slate-300 rounded md:max-w-sm"></div> */}

            <p className={` ${!themeMode ? "bg-slate-300" : "bg-slate-700"} h-6 w-full rounded my-0.5 px-1 mt-4 z-10`}>{order.title}</p>
            <p className={`${!themeMode ? "bg-slate-300" : "bg-slate-700"} h-6 w-full rounded my-0.5 px-1 font-bold z-10`}>₹{makeMoreRaedablePrice(order.price)}</p>
            {
                order.type
                &&
                // ""
                <p className={`${!themeMode ? "bg-slate-300" : "bg-slate-700"} h-6 w-full rounded my-0.5 px-1 capitalize z-10`}>{order.verity.typeName[0] + " : " + order.verity.typeName[1] + " | " + order.verity.typeVerity[0] + " : " + order.verity.typeVerity[1]}</p>
            }
            {/* <h2 className="bg-slate-300 h-6 w-full rounded my-0.5 px-1">Date and Time </h2> */}
        </div>
    )
}



