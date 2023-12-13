

// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"

const Footer = () => {

    const themeMode = useSelector((state : RootState)=>state.themeReducer.mode)



  return (
    <>
    
    <div className={`    bg-gray-800 border text-white ${!themeMode ? "border-white" : 'border-black'} `}>


        <div className="mx-auto max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8  p-2 py-5">

            <div className="text-center">

            <p> &copy; 2023 Your E-Commerce Website. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
            </div>
        </div>


    </div>
    </>
  )
}

export default Footer


