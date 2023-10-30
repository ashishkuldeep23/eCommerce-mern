
// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"

import CartComponent from "../CartComp/CartComponent"


const PaymentComp = () => {

  const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

  return (
    <>

      <div className={` h-allAk flex flex-col items-center overflow-y-scroll shadow-xl ${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"}  `}>




        <div className=" w-full flex flex-col-reverse  md:justify-stretch md:flex-row">

          <div className=" md:w-3/5 p-2 px-3 flex flex-col justify-start items-center ">

            {/* Copy Paste code paste here */}


            <div className=" md:w-4/5 border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-xl text-center underline mt-10 md:mt-0 ">Personal Information</h2>
              {/* <p className="mt-1 text-sm leading-6 ">Use a permanent address where you can receive mail.</p> */}


              <p>Use details will shown here like name email and old address</p>


              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <p className="text-center font-bold  underline col-span-full">Order Details</p>



                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="new_fullname" className="block text-sm font-medium leading-6 ">
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Receiver full name. Ex : Jhon cena"
                      type="text"
                      name="new_fullname"
                      id="new_fullname"
                      className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"} `}
                    />
                  </div>
                </div>

                <div className="col-span-full  sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 ">
                    Phone/Mob No.
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="+91 9000608040"
                      name="phone"
                      id="phone"
                      className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"} `}
                    />
                  </div>
                </div>

                <p className="col-span-full">Add New Address (use btn to  form of new address) </p>

                <>
                  <AddressInputCopm />
                </>




              </div>
            </div>



            <div className=" md:w-4/5  border-b border-gray-900/10 pb-12 ">

              <h2 className="text-base font-semibold leading-7 ">Payment Method</h2>
              <p className="mt-1 text-sm leading-6 ">
                Use Online Paymet to see more features like payment feature.
              </p>


              <div className="  flex justify-between ">



                <div className="space-y-10">


                  <fieldset>

                    <div className="mt-6 space-y-6">


                      <div className="flex items-center gap-x-3">
                        <input
                          id="online"
                          name="payment-method"
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
                          name="payment-method"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="cod" className="block text-sm font-medium leading-6 ">
                          Cash On Delivery
                        </label>
                      </div>




                    </div>


                  </fieldset>

                </div>


                <div className=" hidden md:flex hover:cursor-pointer ">
                  <p className="text-4xl my-10 border px-8 py-2 font-bold rounded-full bg-green-500 text-white">Pay Now</p>
                </div>

              </div>
            </div>



            {/* <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 ">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div> */}




            {/* Now used in above div with check box.  */}

            {/* <div className=" hidden md:flex hover:cursor-pointer ">
              <p className="text-5xl my-10 border px-10 py-2 font-bold rounded-full bg-green-500 text-white">Pay Now</p>
            </div> */}


          </div>


          <div className=" md:w-2/5">
            <CartComponent mainCartComp={false} />
          </div>

        </div>



        {/* This payment btn will visible in mobile devices */}
        <div className=" md:hidden hover:cursor-pointer">
          <p className="text-5xl my-10 border px-10 py-2 font-bold rounded-full bg-green-500 text-white">Pay Now</p>
        </div>


      </div >


    </>
  )
}

export default PaymentComp






function AddressInputCopm() {


  const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

  return (
    <>
      <div className="col-span-full">
        <label htmlFor="street-address" className="block text-sm font-medium leading-6 ">
          Street & City address
        </label>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Full address with street and city name"
            name="street-address"
            id="street-address"
            autoComplete="street-address"
            className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"} `}
          />
        </div>
      </div>


      <div className="sm:col-span-2 sm:col-start-1">
        <label htmlFor="region" className="block text-sm font-medium leading-6 ">
          State / Province
        </label>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Name of State. Ex : UP"
            name="region"
            id="region"
            autoComplete="state"
            className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"} `}
          />
        </div>
      </div>


      <div className="sm:col-span-2 ">
        <label htmlFor="country" className="block text-sm font-medium leading-6 ">
          Country
        </label>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Name of Country. Ex : India"
            name="city"
            id="country"
            autoComplete="country"
            className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"} `}
          />
        </div>
      </div>


      <div className="sm:col-span-2">
        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 ">
          ZIP / Postal code
        </label>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Ex : 271007"
            name="postal-code"
            id="postal-code"
            autoComplete="postal-code"
            className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"} `}
          />
        </div>
      </div>


      <div className=" sm:col-span-6 flex items-center justify-end">
        <button
          type="submit"

          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          + Address
        </button>
      </div>

    </>
  )
}


