
import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useNavigate } from "react-router-dom"
import { createOrder, orderState } from "../../Slices/OrderSlice"
import { toast } from "react-toastify"
import { OrderData } from "../Payment/PaymentComp"
import { setClearCartData } from "../../Slices/CartSlice"
// import { OrderData } from "../Payment/PaymentComp"

const OrderConfirm = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    const themeMode = useSelector(((state: RootState) => state.themeReducer.mode))

    const getOrderData = orderState()

    const afterSeconds = 5;

    const [second, setSecond] = useState<number>(afterSeconds)


    // const orderData = orderState().orderArr

    useEffect(() => {


        let getOrderData = localStorage.getItem("newOrderData")

        if (getOrderData) {

            let orderData: OrderData = JSON.parse(getOrderData)

            // dispatch(setOrderdata({ data: getOrderData }))


            // console.log(orderData)

            // // // Here calling actual async to carete new order data ---->
            dispatch(createOrder({ body: orderData }))


        } else {

            toast.error(`Something went wrong with your orderdata, Please Reorder the product. And got home`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }

        // console.log(orderData)

        // dispatch(createOrder({ body: orderData }))

        // // // Now set back to normal each and everything like order data and cart data --->

        // // // Remove order item after successful sended to backend
        localStorage.removeItem("newOrderData")


        // // // // Remove cart data -->
        // localStorage.removeItem("cardData")

        // // // // make cart emoty --->
        // dispatch(setClearCartData())




        // // // Timer code -->

        if (second >= 0) {
            setTimeout(() => {
                setSecond(second - 1)
            }, 1000)
        }


    }, [])



    // // // useEffect for order is fullfill true (clear cart data ) ---->

    useEffect(() => {

        if (getOrderData.isFullFilled) {

            // // // Clear cart data -->
            dispatch(setClearCartData())

        }

    }, [getOrderData.isFullFilled])



    // // // UseEffect for timer -------->
    useEffect(() => {

        // // Now got to about to show orders ---> (Or go to Orders page ---->)
        setTimeout(() => {
            navigate("/orders")
        }, afterSeconds * 1000)

    }, [second])



    return (
        <>

            <div
                style={{ width: "100vw", height: "99vh" }}
                className={` flex justify-center items-center flex-col ${themeMode ? "bg-black text-white" : "bg-white text-black"} `}
            >


                <div className={`border ${themeMode ? "border-green-300 bg-teal-950 shadow-slate-300" : "border-green-600 bg-teal-50 shadow-slate-600"}  py-7 px-10 rounded flex justify-center items-center flex-col text-center shadow-2xl hover:shadow-lg`}>
                    <i className={`ri-checkbox-circle-fill text-7xl ${themeMode ? "text-green-300" : "text-green-600"}`}></i>
                    <p className=" text-3xl font-bold">Thankyou for ordering with us!</p>
                    <p>Hope you liked the features of web app.</p>
                    <p>You will redirected to order pae after <span className=" bg-red-500 text-white p-1 rounded-2xl font-bold ">{second}</span> seconds</p>
                    <div className="my-2">

                        <button className="border  px-1 rounded font-bold mx-1 bg-green-500 text-white hover:bg-green-300" onClick={() => navigate("/orders")}>  View Orders</button>
                        <button className="border  px-1 rounded font-bold mx-1 bg-blue-500 text-white hover:bg-blue-300" onClick={() => navigate("/")}>Goto Home</button>
                    </div>
                </div>


            </div>

        </>
    )
}

export default OrderConfirm

