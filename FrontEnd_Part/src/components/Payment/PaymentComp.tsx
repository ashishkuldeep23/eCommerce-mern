
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useForm, SubmitHandler } from "react-hook-form"
import CartComponent, { makeMoreRaedablePrice } from "../CartComp/CartComponent"
import UserAddressDiv from "../AboutPage/UserAddressDiv"
import { UserAddressObj, userState } from "../../Slices/UserSlice"
import { CardDataInter, setClearCartData } from "../../Slices/CartSlice"
import { checkEmail } from "../AboutPage/DetailsOfUser"
import { Fragment } from "react"
import { orderState, setOrderdata } from "../../Slices/OrderSlice"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'


export type OrderData = {
  fullName: string,
  phone: number,
  address: UserAddressObj,
  paymentMethod: string,
  cartData: CardDataInter[],
  userId: string,
  whenCreated: string,
  totalItems: number,
  totalPrice: string,
  status: string,
}




const PaymentComp = () => {

  const navigate = useNavigate()

  const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

  const { register, handleSubmit, formState: { errors }, setError, setValue, clearErrors } = useForm<OrderData>()

  const getUserData = userState().userData

  const getTotalPriceOfCart = useSelector((store: RootState) => store.CartReducer.totalPrice)

  const getTotalItemsOfCart = useSelector((store: RootState) => store.CartReducer.cartData)

  const getOrderData = orderState()

  const dispatch = useDispatch<AppDispatch>()


  // // // // This fn used to submit addres (used in onChange of address input btn) --->

  function submitAddress(addressData: UserAddressObj) {
    // setValue('address' , `${data}`)

    if (Object.keys(addressData).length > 0) {

      // console.log(addressData)

      // const addressKey = "address"
      // let addressObj : UserAddressObj = {...addressData}

      setValue("address", addressData)

      // // // After setting value we need clear error (other wise it will error)

      clearErrors("address")

      // for(let [key , value] of Object.entries(data)){
      //   addressObj[key] = value
      // }
    }

  }



  // // // So This is actual fucton that handles onSubit event
  const onSubmit: SubmitHandler<OrderData> = (data) => {
    // console.log(data);
    // alert()


    // // // Check requiest sended --->
    if (getOrderData.isLoading) {
      toast.error(`Wait for one request`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return
    }


    // // // Show the error addres --->

    if (!data.address || (data.address && Object.keys(data.address).length < 3)) {
      setError("address", { type: "manual", message: "Please Add or Choose addres." })
      return
    }

    // // // Here you can call you backend

    if (Object.keys(errors).length <= 0) {

      // // // Here set neccessory some info of data object --->
      data.whenCreated = `${new Date()}`
      data.totalPrice = `₹${makeMoreRaedablePrice(getTotalPriceOfCart)}`
      data.totalItems = getTotalItemsOfCart.length
      data.cartData = getTotalItemsOfCart
      data.userId = getUserData.id


      // console.log(data)

      // // // set order data now ---->
      dispatch(setOrderdata({ data: data }))


      // // // set order data in loaclhost to get that data in order-success page (By both payment methosds)
      localStorage.setItem("newOrderData", JSON.stringify(data))


      if (data.paymentMethod === "online") {
        navigate("/stripePay")
      }

      if (data.paymentMethod === "COD") {
        // dispatch(createOrder({ body: data }))
        navigate("/order-confirm")
      }

      // alert("Call dispatch now")

    }

  }




  console.log(errors)


  // // // useEffect for fullfill true ---->

  useEffect(() => {

    if (getOrderData.isFullFilled) {

      // // // Clear cart data -->

      dispatch(setClearCartData())

      // // Now got to about to show orders ---> (Or go to Orders page ---->)
      navigate("/orders")
    }

  }, [getOrderData.isFullFilled])




  return (
    <>

      <div className={` h-allAk flex flex-col  overflow-y-scroll shadow-xl ${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"}  `}>

        <div className=" w-full flex flex-col  md:justify-stretch md:flex-row">

          <div className=" md:w-3/5 p-2 px-3 flex flex-col justify-start items-center ">

            {/* <h1 className=" font-bold text-5xl">Total Price is : {makeMoreRaedablePrice(getTotalPriceOfCart)}</h1>
            <h1 className=" font-bold text-5xl">Total Price is : {getTotalItemsOfCart.length}</h1> */}

            <h1 className='mt-5 bg-emerald-400 px-3 rounded text-white text-2xl font-bold'>Place Order 🛒</h1>

            {/* User details including address (main problem solved ) */}
            <div className="flex flex-col items-center justify-center w-3/4  mt-10">

              <div className={`flex flex-col items-center justify-center border border-blue-500 rounded-xl  py-5 px-1 sm:w-4/5  md:w-2/3  ${!themeMode ? "bg-blue-50" : "bg-blue-950"} `}>


                <h2 className="font-semibold leading-7 text-center underline md:mt-0 mb-2 text-xl">Personal Information</h2>
                {/* <p className="mt-1 text-sm leading-6 ">Use a permanent address where you can receive mail.</p> */}

                {/* <p>Use details will shown here like name email and old address</p> */}

                {/* <img src={getUserData.profilePic} className=" w-56 rounded-md" alt="" /> */}

                <h2
                  className={` ${!themeMode ? "bg-slate-100" : "bg-slate-900"}  font-bold rounded my-0.5 px-1`}
                >Name : {getUserData.firstName + " " + getUserData.lastName}
                </h2>


                <p className={`  ${!themeMode ? "bg-slate-100" : "bg-slate-900"}   rounded my-0.5 px-1 `} >Email : {checkEmail(getUserData.email)} </p>

                <div
                  className="flex flex-col relative w-full smm:w-1/2 px-1"
                  id="addres_section_in_info"
                >

                  {
                    getUserData.address && getUserData.address?.length === 0

                    &&
                    <p className={`px-1 text-center `}>Note : Please add address, this is improtant in order data. </p>

                  }

                  {
                    getUserData.address && getUserData.address?.length > 0

                    &&
                    <p className={`${!themeMode ? "bg-slate-100" : "bg-slate-900"} px-1 `}>Address :</p>

                  }

                  <div className="ml-4">

                    <UserAddressDiv />
                  </div>

                </div>



              </div>

            </div>

            {/* Order Form starts here ---> */}
            <form noValidate className={`space-y-3 w-full flex flex-col items-center relative ${getOrderData.isLoading && "opacity-50"} `} onSubmit={handleSubmit(onSubmit)}>


              {/* Loader code -------> */}
              <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 scale-150 z-10">
                {
                  getOrderData.isLoading
                  &&
                  <div role="status">
                    <svg aria-hidden="true" className="inline w-40 h-40  text-transparent animate-spin fill-blue-600 opacity-100 " viewBox="0 0 100 101" fill="none" >
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </div>
                }
              </div>


              <div className=" w-full smm:w-4/5 border-b border-gray-900/10 pb-12">

                <div className={`grid grid-cols-1 gap-x-6  gap-y-5 sm:grid-cols-6  border border-teal-500 p-5 rounded-xl ${!themeMode ? "bg-teal-50" : "bg-teal-950"}  `}>

                  <h2 className="font-semibold leading-7 text-3xl text-center underline  col-span-full ">Order Details</h2>


                  {/* User Full name --> */}
                  <div className="col-span-full ">
                    <label htmlFor="new_fullname" className="block text-sm font-medium leading-6 ">
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Receiver full name. Ex : Jhon cena"
                        type="text"
                        id="new_fullname"
                        className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"} `}
                        {
                        ...register("fullName", {
                          required: "Please give Fullname",
                          pattern: {
                            value: /[a-zA-Z][a-zA-Z0-9-_ .]{3,25}/gi,
                            message: "Must start with an alphabetic character. Can contain the following characters: a-z A-Z 0-9 - . _ and should be in between 5 to 25"
                          }
                        })
                        }
                      />
                      <p className="text-sm pl-2 text-red-500 font-bold"> {errors.fullName?.message}</p>
                    </div>
                  </div>

                  {/* User Phone number */}
                  <div className="col-span-full  ">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 ">
                      Phone/Mob No.
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        placeholder="+91 9000608040"
                        {
                        ...register("phone", {
                          required: "Phone number not given.",
                          pattern: {
                            value: /(\+)?(91)?( )?[789]\d{9}/gi,
                            message: "Must be valid Indan phone number.Start with 7 or 8 or 9."
                          }
                        })
                        }
                        id="phone"
                        className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"} `}
                      />
                      <p className="text-sm pl-2 text-red-500 font-bold"> {errors.phone?.message}</p>
                    </div>
                  </div>

                  {/* <p className="col-span-full">Add New Address (use btn to  form of new address) </p> */}

                  {/* User addres div with all Functionilaty */}
                  <div
                    className="flex flex-col items-start justify-center  md:flex-row col-span-full relative border-b border-teal-500 pb-2 gap-2 sm:gap-5 "
                  >
                    {/* <AddressInputCopm /> */}
                    {/* <UserAddressDiv submitAddress={submitAddress} /> */}

                    {/* Choose Address div here ---> */}
                    <div className=" md:w-1/2">


                      <h2 className="text-base font-semibold leading-7 ">Choose Address</h2>

                      {/* <p>Show all Address</p> */}

                      {/* {JSON.stringify(getUserData.address)} */}

                      {
                        getUserData.address
                          &&
                          (getUserData.address.length > 0)
                          ?

                          getUserData.address.map((ele, i) => {
                            return (


                              <Fragment key={ele.id}>

                                <div className=" flex items-center overflow-hidden">


                                  <input
                                    type="radio"
                                    className="  z-10 mt-2"
                                    name="address"
                                    id={`single_address_${i}`}
                                    // onChange={(e) => { e.stopPropagation(); submitAddress(ele) }}

                                    onClick={(e) => { e.stopPropagation(); submitAddress(ele) }}
                                  />


                                  <label className=" w-full" htmlFor={`single_address_${i}`}>

                                    <div className={`${!themeMode ? "bg-slate-100" : "bg-slate-900"} relative p-0.5 rounded  border-b border-green-300 pr-5 md:pr-0`}>

                                      {/* <span className=" absolute left-5 border border-green-300 px-1 rounded-full text-green-300">{i + 1}</span> */}
                                      <p>Street : {ele.street || "Not Given"}</p>
                                      <p>City : {ele.city || "Not Given"}</p>
                                      <p>Country : {ele.country || "Not Given"}</p>
                                      <p>Pincode : {ele.pincode || "Not Given"}</p>
                                    </div>

                                  </label>

                                </div>


                              </Fragment>

                            )
                          })

                          :
                          <div>

                            <p className={`${!themeMode ? "bg-slate-100" : "bg-slate-900"} relative px-1 border-b rounded-b-md `} >No address found</p>
                            <p className={`${!themeMode ? "bg-slate-100" : "bg-slate-900"} relative px-1 border-b rounded-b-md `} >Go to top and add new Address</p>

                            <a
                              // href="#addres_section_in_info"
                              className=" rounded  bg-green-500 text-white px-2 "
                              onClick={() => { window.scroll(0, 0) }}
                            >GoTo Top☝️</a>

                          </div>
                      }


                      <p className="text-sm pl-2 text-red-500 font-bold text-end"> {errors.address?.message}</p>

                    </div>


                    {/* Choose payment method div ---> */}
                    <div className=" md:w-1/2 flex flex-col smm:w-4/5">

                      <h2 className="text-base font-semibold leading-7 ">Payment Method</h2>
                      <p className="mt-1 text-sm leading-6 ">
                        Use Online payment to get payment page.
                      </p>


                      {/* Payment method input ---> */}
                      <div className="  flex justify-between ">

                        <div className="space-y-10">

                          <div className="mt-6 space-y-6 md:pl-5">


                            <div className="flex items-center gap-x-3">
                              <input
                                id="online"
                                value="online"
                                // name="payment-method"
                                {
                                ...register("paymentMethod", {
                                  required: "Payment method number not given.",

                                })
                                }
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="online" className="block text-sm font-medium leading-6 ">
                                Pay Online
                              </label>
                            </div>


                            <div className="flex items-center gap-x-3">
                              <input
                                id="cod"
                                value="COD"
                                // name="payment-method"
                                {
                                ...register("paymentMethod", {
                                  required: "Payment method not given.",
                                })
                                }
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="cod" className="block text-sm font-medium leading-6 ">
                                Cash On Delivery (COD)
                              </label>
                            </div>

                            <p className="text-sm pl-2 text-red-500 font-bold"> {errors.paymentMethod?.message}</p>

                          </div>

                        </div>





                      </div>



                    </div>


                  </div>

                  {/* order now btn  */}
                  {/* This payment btn will visible in Tab or Above devices */}
                  <div className=" col-span-full flex justify-center flex-col items-center hover:cursor-pointer ">

                    <div className="flex justify-around w-full mb-4" >
                      <p>Total items : {getTotalItemsOfCart.length}</p>
                      <p>Total Price : ₹{makeMoreRaedablePrice(getTotalPriceOfCart)}</p>
                    </div>

                    <button
                      type="submit"
                      className="text-3xl  border px-8 py-2 font-bold rounded-full bg-green-500 text-white"
                    >Order Now</button>
                  </div>

                </div>


              </div>

            </form>

          </div>
          {/* Cart comp div here ---> */}
          <div className=" md:w-2/5">
            <CartComponent mainCartComp={false} />
          </div>

        </div>

      </div >

    </>
  )
}

export default PaymentComp




