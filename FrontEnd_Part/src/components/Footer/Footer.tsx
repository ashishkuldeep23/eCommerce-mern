

// import React from 'react'

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useNavigate } from "react-router-dom"
import { setSearchBrandAndCate } from "../../Slices/AllProductSlice"

const Footer = () => {

  const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

  const allCategories = useSelector((state: RootState) => state.allProductWithCatReducer.filterAllCateory)

  const allBrands = useSelector((state: RootState) => state.allProductWithCatReducer.filterAllBrands)

  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()




  function searchByCatClickhandler(catOrbarnd: string, searchKey: string) {

    navigate("/catPage")
    window.scroll(0, 0)


    console.log(catOrbarnd, searchKey)


    if (catOrbarnd === "brand") {

      dispatch(setSearchBrandAndCate({ brand: searchKey, category: "" }))

    } else {

      dispatch(setSearchBrandAndCate({ brand: "", category: searchKey }))
    }

  }



  return (
    <>

      <div className={`    bg-gray-800 border text-white ${!themeMode ? "border-white" : 'border-black'} `}>


        <div className="mx-auto max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8  p-2 py-5">

          <div className="text-center">

            <p> &copy; 2023 Your E-Commerce Website. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
          </div>



          <div className=" py-5 flex flex-col items-center  justify-around lg:flex-row ">

            {/* Left section */}

            <div className="  rounded my-2 px-1 py-5  w-full  lg:w-1/3">



              <p className=" text-center underline mb-2  text-lg font-bold">Find product by </p>



              <div className="  flex justify-center ">


                <div className=" w-1/2  sm:w-2/6 px-2  text-end ">

                  <strong className=" border-b-2  w-full text-slate-300 border-slate-300"> All Categories</strong>
                  <ul className=" flex flex-col items-end">
                    {
                      allCategories.map((ele, i) => {
                        return (
                          <li onClick={(e) => { e.stopPropagation(); searchByCatClickhandler("category", ele) }} key={i} className=" my-1 px-2 rounded capitalize font-bold border inline hover:scale-x-110 hover:bg-blue-400 transition-all">{ele}</li>
                        )
                      })
                    }
                  </ul>

                </div>

                <div className="border-l-2 border-green-300 w-5/12 px-2 text-start ">

                  <strong className=" border-b-2 text-slate-300 border-slate-300"> All Brands</strong>
                  <ul className=" flex flex-wrap ">
                    {
                      allBrands.map((ele, i) => {
                        return (
                          <li onClick={(e) => { e.stopPropagation(); searchByCatClickhandler("brand", ele) }} key={i} className=" my-1 mx-0.5 px-2 rounded capitalize font-bold border inline hover:scale-x-110 hover:bg-blue-400 transition-all">{ele}</li>
                        )
                      })
                    }
                  </ul>

                </div>

              </div>


            </div>


            {/* Right section  */}

            <div className="   w-full  lg:w-1/2">



              <div className="border  rounded my-2 px-1 py-5 " >
                <p>Contect  id's</p>
              </div>


              <BugSectionRightSide />


              <div className="border  rounded my-2 px-1 py-5 " >

                <p>Feedback</p>

              </div>

            </div>

          </div>



        </div>


      </div>
    </>
  )
}

export default Footer





function BugSectionRightSide() {


  const [openMainBugSec, setOpenMainBugSec] = useState(false)

  return (
    <>

      <div className="border  rounded my-2 px-1 py-5 " >

        <div className="mx-2 px-2 py-1 border rounded transition-all overflow-hidden">

          <div
            className="flex justify-between font-bold "
            onClick={(e) => { e.stopPropagation(); setOpenMainBugSec(!openMainBugSec) }}
          >

            <p className=" underline">Open bug section</p>
            <button>
              {
                openMainBugSec 
                ?
                <i className="ri-arrow-drop-up-line text-4xl"></i>
                :
                <i className="ri-arrow-drop-down-line text-4xl"></i>

              }
            </button>
          </div>



          {
            openMainBugSec
            &&
            <div className="border-t animate__animated  animate__fadeInUp">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus minus repudiandae quia. Doloribus in quasi voluptatem quaerat fuga asperiores expedita, aliquid necessitatibus, accusantium ipsa vitae.</div>
          }


        </div>






      </div>
    </>
  )
}


