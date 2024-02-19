// import React from 'react'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { AdminAllOrders, adminDataState, getAllOrdersAdmin } from "../../Slices/AdminSliceFile"
import { makeMoreRaedablePrice } from "../CartComp/CartComponent"
import { updateOrder } from "../../Slices/OrderSlice"

export const AllOdersComp = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { allOrders, searchAllOrders, isLoading } = adminDataState()

    const { sortBy } = searchAllOrders

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    function getOrderDataAgain() {

        if (isLoading) return

        if (sortBy === "-1") {
            dispatch(getAllOrdersAdmin('1'))
        } else {
            dispatch(getAllOrdersAdmin('-1'))
        }


    }


    useEffect(() => {

        if (allOrders.length <= 0) {
            dispatch(getAllOrdersAdmin('-1'))
        }

    }, [])

    return (
        <>

            {/* {
                JSON.stringify(allOrders)
            } */}


            <div className={` my-20 w-full smm:w-10/12 sm:w-3/4  md:w-10/12  py-2 px-1.5 rounded border 
                ${themeMode
                    ? " bg-emerald-950  border-white "
                    : "bg-emerald-200 border-black"}
                `}
                id="allOrdersDiv"
            >

                <div className=" flex flex-col">
                    <h1 className=" underline font-semibold text-3xl text-center">All Orders details ({allOrders.length}) </h1>

                    <button
                        className=" uppercase px-4 border border-gray-400  rounded-full my-2 mx-auto text-md font-semibold font-mono active:bg-green-500"
                        onClick={() => getOrderDataAgain()}
                    >Get {sortBy === "-1" ? "Oldest" : "Newest"} first</button>

                </div>

                <ul role="list" className={`divide-y ${themeMode ? " divide-slate-100 " : "divide-slate-900"} `}>
                    {

                        allOrders.length > 0

                            ?

                            allOrders.map((ele, i) => {
                                return <SingleAdminOrder
                                    key={ele.id}
                                    order={ele}
                                    i={(sortBy === "-1") ? (allOrders.length - i - 1) : (i)}
                                />
                            })



                            :
                            <li>Getting all products data</li>
                    }

                </ul>

            </div>


        </>
    )
}



function SingleAdminOrder({ order, i }: { order: AdminAllOrders, i: number }) {

    const dispatch = useDispatch<AppDispatch>()

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const [seeDetails, setSeeDetails] = useState(false)

    type ValueOfOrderStatus = "Pending" | "Received"

    const [arrOfOptions, setArrOfOptions] = useState<[ValueOfOrderStatus, ValueOfOrderStatus]>(["Pending", 'Received'])


    function orderSelectChanged(e: React.ChangeEvent<HTMLSelectElement>) {

        // console.log(e.target.value)


        // if (e.target.value === "Pending") {
        //     setArrOfOptions(["Pending", "Received"])
        // } else {
        //     setArrOfOptions(["Received", "Pending"])
        // }


        let bodyOrReq = {
            body: { whatUpdate: "statusAdmin", orderId: order.id, makeOrderStatus: e.target.value }
        }


        dispatch(updateOrder(bodyOrReq))


    }


    useEffect(() => {

        // console.log(product.isDeleted)
        // console.log("Render product -->")

        // let firstValueOfOptionBased: TValueOfOptionBased = product.isDeleted ? "delete" : 'live'
        // let secondValueOfOptionBased: TValueOfOptionBased = !product.isDeleted ? "delete" : 'live'
        // setArrOfOptions([firstValueOfOptionBased, secondValueOfOptionBased])


        if (order.status === "Pending") {
            setArrOfOptions(["Pending", "Received"])
        } else {
            setArrOfOptions(["Received", "Pending"])
        }


    }, [order])

    return (
        <>
            <li

                className="flex flex-col justify-between gap-x-6 py-5 relative"
            >


                <p
                    className={`border px-2 rounded-full absolute left-full -translate-x-full md:translate-x-0 md:left-0 ${!themeMode ? "border-black" : "border-white"} `}
                >{i + 1}</p>
                {/* flex flex-wrap justify-end xsm:justify-between */}
                <div className=" w-full flex flex-col items-center md:px-20">


                    <div className=" w-full flex justify-between flex-col items-center md:flex-row">

                        <div>



                            <p>Who : {order.fullName}</p>
                            <p> Phone No. : {order.phone}</p>
                            <p>Where : <span>{order.address.street}</span>, <span>{order.address.city}</span>, <span>{order.address.country}</span>, <span>{order.address.pincode}</span> </p>
                        </div>

                        <div>

                            <p>Payment Via : {order.paymentMethod}</p>




                            <p>
                                Status :
                                <select
                                    name="" id=""
                                    className=" border rounded px-0.5 mx-1 bg-transparent"
                                    onChange={(e) => { orderSelectChanged(e) }}
                                    value={arrOfOptions[0]}
                                >
                                    {
                                        arrOfOptions.map((ele, i) => {
                                            return <option
                                                key={i}
                                                className={`bg-transparent text-black`}
                                                // value={isProductDeleted && i===0 ? 'delete' : 'live'}
                                                // value={(isProductDeleted === true && i === 0) ? 'delete' : (isProductDeleted === false && i === 0) ? 'live' : "delete"}
                                                value={ele}
                                            >

                                                {
                                                    ele === "Pending"
                                                        ? "😩Pending"
                                                        : "✅Received"
                                                }

                                            </option>
                                        })
                                    }

                                </select>
                            </p>
                        </div>
                    </div>

                    <div className=" w-full  flex justify-between">

                        <p>TotalItems : {order.totalItems}</p>
                        <p>Total Price : {order.totalPrice}</p>
                    </div>

                    <p>{order.whenCreated}</p>

                    <button
                        className={` ${themeMode ? "border-white" : "border-black"} px-3 py-0.5 border rounded font-semibold capitalize`}
                        onClick={() => { setSeeDetails(!seeDetails) }}
                    > {!seeDetails ? "Show" : "Hide"} ordered items</button>


                </div>


                <div
                    className={` overflow-hidden  `}
                >

                    {
                        seeDetails
                        &&
                        <div className=" flex flex-col items-center">

                            <p className=" border-b">Item{order.cartData.length > 1 ? "s Are :-" : " Is :-"}</p>

                            <div className=" flex flex-wrap justify-center  my-5 gap-5">


                                {
                                    (order.cartData.length > 0)
                                        ?
                                        order.cartData.map((ele) => {
                                            return (
                                                <div
                                                    key={ele.id}
                                                    id='single_order_div'
                                                    className={`w-full smm:w-72 flex flex-col items-center overflow-hidden hover:cursor-pointer
                                                     rounded  border border-gray-400 p-0.5`}
                                                // onClick={(e) => {
                                                //     e.stopPropagation();
                                                //     navigate(`/product/${order.id}`);
                                                //     dispatch(fetchOneProductByID({ productId: order.id }));
                                                //     dispatch(setSingleProductData({ id: order.id }));
                                                //     window.scroll(0, 0);
                                                // }}
                                                >

                                                    <img className=" w-72 h-64 object-cover md:max-w-sm rounded hover:scale-150 transition-all" src={ele.thumbnail} ></img>

                                                    {/* <div className=" w-full sm:w-72  h-56 sm:h-72 bg-slate-300 rounded md:max-w-sm"></div> */}

                                                    <p className={` ${!themeMode ? "bg-slate-300" : "bg-slate-700"} h-6 w-full rounded my-0.5 px-1 mt-4 z-10`}>{ele.title}</p>
                                                    <p className={`${!themeMode ? "bg-slate-300" : "bg-slate-700"} h-6 w-full rounded my-0.5 px-1 font-bold z-10`}>₹{makeMoreRaedablePrice(ele.price)}</p>
                                                    {
                                                        ele.type
                                                        &&
                                                        // ""
                                                        <p className={`${!themeMode ? "bg-slate-300" : "bg-slate-700"} min-h-6 w-full rounded my-0.5 px-1 capitalize z-10`}>{ele.verity.typeName[0] + " : " + ele.verity.typeName[1] + " | " + ele.verity.typeVerity[0] + " : " + ele.verity.typeVerity[1]}</p>
                                                    }
                                                    {/* <h2 className="bg-slate-300 h-6 w-full rounded my-0.5 px-1">Date and Time </h2> */}
                                                </div>
                                            )
                                        })
                                        : "No order found (For some error)"
                                }

                            </div>

                            <button
                                className=" px-2 ml-auto font-mono font-semibold rounded-full bg-red-500 hover:bg-red-300 "
                                onClick={() => { setSeeDetails(false) }}
                            >Hide</button>


                        </div>

                    }

                </div>

            </li>
        </>

    )
}

