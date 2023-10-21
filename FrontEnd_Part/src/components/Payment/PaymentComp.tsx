
// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"

const PaymentComp = () => {

    const themeMode = useSelector( (store : RootState)=>store.themeReducer.mode )

  return (
    <>

        <div className={` h-allAk flex flex-col items-center overflow-y-scroll shadow-xl ${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"}  `}> 

            <p> PayMent Component Here </p>
            <p>This contain : User Address , Payment Method , Cart items , Total Amount</p>
        </div>
    
    </>
  )
}

export default PaymentComp
