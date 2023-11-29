
// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { useForm, SubmitHandler } from "react-hook-form"
import CartComponent, { makeMoreRaedablePrice } from "../CartComp/CartComponent"
import UserAddressDiv from "../AboutPage/UserAddressDiv"
import { UserAddressObj, userState } from "../../Slices/UserSlice"
import { CardDataInter } from "../../Slices/CartSlice"
import { checkEmail } from "../AboutPage/DetailsOfUser"
import { Fragment } from "react"



type OrderData = {
  fullName: string,
  phone: number,
  address: UserAddressObj,
  paymentMethod: string,
  cartData: CardDataInter[],
  whenCreated: string,
  totalItems: number,
  totalPrice: string,
}




const PaymentComp = () => {

  const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

  const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm<OrderData>()


  const getUserData = userState().userData


  const getTotalPriceOfCart = useSelector((store : RootState)=>store.CartReducer.totalPrice)

  // // // // This fn used to submit addres (used in onChange of address input btn) --->

  function submitAddress(addressData: UserAddressObj) {
    // setValue('address' , `${data}`)

    if (Object.keys(addressData).length > 0) {


      // const addressKey = "address"
      // let addressObj : UserAddressObj = {...addressData}

      setValue("address", addressData)

      // for(let [key , value] of Object.entries(data)){
      //   addressObj[key] = value
      // }

    }

  }





  // // // So This is actual fucton that handles onSubit event
  const onSubmit: SubmitHandler<OrderData> = (data) => {
    console.log(data);
    // alert()

    // // // Show the error addres --->
    if (!data.address || (data.address && Object.values(data.address).length < 3)) {
      setError("address", { type: "manual", message: "Please Add or Choose addres." })
      return
    }

    // // // Here you can call you backend

    if (Object.keys(errors).length <= 0) {

      // // // Here set neccessory some info of data object --->
      data.whenCreated = "now"
      data.totalPrice = "150"
      data.totalItems = 1



      // const { confirmPassword, ...resData } = data

      // const formData = new FormData()


      // for (let [key, value] of Object.entries(resData)) {


      //     if (key === "address") {

      //         // formData.append(key, JSON.stringify(value))

      //         for (let [key2, value2] of Object.entries(resData?.address)) {

      //             formData.set(`${key}[${key2}]`, `${value2}`)
      //             // // // Above line ---> ( address.city = gonda ) and so on. 
      //         }

      //     } else {
      //         formData.set(key, `${value}`)

      //         // // // Don't use append in form data use set() -----> See MDN form data docs.
      //     }


      // }

    }

    // // // Before dispatch add 3 keys in data (WhenCreated , TotalItems , TotalPrice)
    // dispatch(createNewUser({ formData: formData }))

    console.log(data)

    alert("Call dispatch now")

  }




  console.log(errors)



  return (
    <>

      <div className={` h-allAk flex flex-col  overflow-y-scroll shadow-xl ${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"}  `}>

        <div className=" w-full flex flex-col  md:justify-stretch md:flex-row">

          <div className=" md:w-3/5 p-2 px-3 flex flex-col justify-start items-center ">

            <h1 className=" font-bold text-5xl">Total Price is : {makeMoreRaedablePrice(getTotalPriceOfCart)}</h1>

            {/* User details including address (main problem solved ) */}
            <div className="flex flex-col items-center justify-center w-full pb-5 mt-10">

              <div className="flex flex-col items-center justify-center border border-blue-500 rounded-xl bg-blue-50 py-5 px-1 sm:w-4/5  md:w-2/3">


                <h2 className="font-semibold leading-7 text-center underline md:mt-0 mb-2 text-3xl">Personal Information</h2>
                {/* <p className="mt-1 text-sm leading-6 ">Use a permanent address where you can receive mail.</p> */}

                {/* <p>Use details will shown here like name email and old address</p> */}

                <img src={getUserData.profilePic} className=" w-56 rounded-md" alt="" />

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
            <form noValidate className="space-y-3 w-full flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>

              <div className=" w-full smm:w-4/5 border-b border-gray-900/10 pb-12">

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6  border border-teal-500 p-5 rounded-xl bg-teal-50">

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
                    className="flex justify-center flex-col md:flex-row col-span-full relative border-b border-teal-500 pb-2 gap-2 sm:gap-5 "
                  >
                    {/* <AddressInputCopm /> */}
                    {/* <UserAddressDiv submitAddress={submitAddress} /> */}

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

                                <div className=" flex items-center ">


                                  <input
                                    type="radio"
                                    className="  z-10 mt-2"
                                    name="address"
                                    id={`single_address_${i}`}
                                    onChange={(e) => { e.stopPropagation(); submitAddress(ele) }}

                                  // onClick={(e)=>{ e.stopPropagation(); submitAddress(ele)}}
                                  />


                                  <label className=" w-full" htmlFor={`single_address_${i}`}>

                                    <div className={`${!themeMode ? "bg-slate-100" : "bg-slate-900"} relative p-0.5 rounded  border-b border-green-300`}>

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


                    <div className=" md:w-1/2 flex flex-col smm:w-4/5">

                      <h2 className="text-base font-semibold leading-7 ">Payment Method</h2>
                      <p className="mt-1 text-sm leading-6 ">
                        Use Online Paymet to see more features like payment feature.
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
                  <div className=" col-span-full flex justify-center hover:cursor-pointer ">
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


        {/* order now btn  */}
        {/* This payment btn will visible in mobile devices */}
        {/* <div className=" md:hidden hover:cursor-pointer">
            <button type="submit"
              className="text-4xl my-10 border px-10 py-2 font-bold rounded-full bg-green-500 text-white"
            >Order Now</button>
          </div> */}


      </div >


    </>
  )
}

export default PaymentComp




