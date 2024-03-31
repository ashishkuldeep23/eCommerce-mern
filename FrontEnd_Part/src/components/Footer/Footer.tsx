

// import React from 'react'

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useNavigate } from "react-router-dom"
import { setSearchBrandAndCate } from "../../Slices/AllProductSlice"

import { useForm, SubmitHandler } from "react-hook-form"
import { bugReport, userState } from "../../Slices/UserSlice"

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



  function currentYear() {

    let date = new Date

    // console.log(date)
    // console.log(date.getFullYear())

    return date.getFullYear()

  }





  return (
    <>

      <div className={`${themeMode ? " bg-gray-800 border-white" : ' bg-gray-200 text-black border-black'} transition-all relative `}>


        <div className="mx-auto max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8  p-2 py-5 ">

          <div className="text-center">

            <p> <span className=" font-bold">&copy; {currentYear().toString()}</span> E-Commerce Website.</p>
            <p>Developed by <a className=" font-bold underline text-violet-500 font-mono" href="https://akp23.vercel.app/" target="_blank"> Ashish Kuldeep</a> </p>
          </div>


          {/* Mai UI for footer here ---> */}
          <div className=" py-5 flex flex-col items-start  justify-around lg:flex-row ">

            {/* Left section starts ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/}

            <div className="  rounded my-2 mt-10 px-1 py-5  w-full  lg:w-1/2 relative">

              <p className=" text-center underline mb-2  text-lg font-bold">Find product by </p>

              {/* Footer filter section here -----> */}
              <div className="  flex justify-center ">

                {/* Filter by all category */}
                <div className=" w-1/2  sm:w-2/6 px-2  text-end ">

                  <strong className=" w-full border-b-2 opacity-75 border-green-300  "> All Categories</strong>
                  <ul className=" mt-2 flex flex-col items-end">
                    {
                      allCategories.map((ele, i) => {
                        return (
                          <li
                            key={i}
                            style={{ lineBreak: "anywhere" }}
                            onClick={(e) => { e.stopPropagation(); searchByCatClickhandler("category", ele) }}
                            className={` my-1 px-2 rounded capitalize font-bold inline hover:scale-x-110 hover:bg-blue-400 transition-all border  ${themeMode ? "border-slate-300 bg-black text-white" : "border-slate-800 bg-white text-black"} `}
                          >{ele}</li>
                        )
                      })
                    }
                  </ul>

                </div>

                {/* Filter by all brand */}
                <div className="border-l-2 border-green-300 w-5/12 px-2 text-start ">

                  <strong className=" border-b-2 opacity-75 border-green-300"> All Brands</strong>
                  <ul className=" mt-2 flex flex-wrap ">
                    {
                      allBrands.map((ele, i) => {
                        return (
                          <li
                            key={i}
                            style={{ lineBreak: "anywhere" }}
                            onClick={(e) => { e.stopPropagation(); searchByCatClickhandler("brand", ele) }}
                            className={` my-1 mx-0.5 px-2 rounded capitalize font-bold border inline hover:scale-x-110 hover:bg-blue-400 transition-all  ${themeMode ? "border-slate-300 bg-black text-white" : "border-slate-800 bg-white text-black"} `}
                          >{ele}</li>
                        )
                      })
                    }
                  </ul>

                </div>




              </div>


            </div>


            {/* Right section starts ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/}
            <div className="w-full  lg:w-1/2 flex flex-col transition-all">

              {/* Contect logos ---> */}
              <ContactLogoDiv />
              {/* Feedback section here ----> */}
              <div
                className=" m-feedback bg-green-300 border border-black rounded my-2 px-2 py-3 mr-7 smm:mr-20 hover:cursor-pointer hover:scale-x-110 transition-all "
                onClick={() => { navigate("/feedback") }}
              >
                <p className="text-center font-bold text-3xl text-black ">Feedback</p>
              </div>

              {/* Bug section here ---> */}
              <div className=" rounded my-2 px-1 py-5  ml-7 smm:ml-20 " >
                <BugSectionRightSide />
              </div>

            </div>


          </div>


        </div>


        {/* GoTo top BTN */}
        <button
          className={`  absolute bottom-4 left-3 sm:left-20 sm:bottom-16 z-10 border p-2 rounded-full text-2xl hover:-translate-y-2 hover:scale-150 active:scale-75 transition-all ${!themeMode ? "text-black bg-white border-black" : "bg-black text-white border-white"} `}
          onClick={() => { window.scroll(0, 0) }}
        >🔝</button>

      </div>
    </>
  )
}

export default Footer





type FormInputs = {
  email: string;
  bugComment: string;
}


function BugSectionRightSide() {


  const [openMainBugSec, setOpenMainBugSec] = useState<boolean>(false)

  const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

  const isFullfilled = userState().isFullFilled

  const isLoading = userState().isLoading

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormInputs>()

  const dispatch = useDispatch<AppDispatch>()


  const onSubmit: SubmitHandler<FormInputs> = (data) => {

    // // Call dispatch here ------> this route shoul be open or all 

    // console.log(data)

    // alert("ok calling dispatch....")

    dispatch(bugReport({ ...data }))


  }



  useEffect(() => {

    if (isFullfilled) {
      /// // // Back to nomal froms and it's value
      setValue("bugComment", '')
      setValue("email", "")
      setOpenMainBugSec(false)
    }

  }, [isFullfilled])


  return (
    <>

      <div className=" relative ml-auto w-fit border  border-green-600 mx-2 px-0.5 smm:px-2 py-1 rounded transition-all overflow-hidden">

        {/* Loader ----> */}
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 z-40">
          {
            isLoading
            &&
            <div role="status">
              <svg aria-hidden="true" className="inline w-20 h-20 text-transparent animate-spin fill-red-600 opacity-100 " viewBox="0 0 100 101" fill="none" >
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>
          }
        </div>

        <div
          className="flex flex-col"
          onClick={(e) => { e.stopPropagation(); setOpenMainBugSec(!openMainBugSec); }}
        >

          <div className=" ml-auto w-fit flex  justify-end items-center font-bold  hover:cursor-pointer">


            <p className="  text-green-600 hover:scale-105 hover:underline transition-all">Open Bug Section</p>
            <button className="mt-2 -ml-1">
              {/* {
                openMainBugSec
                  ?
                  <i className="ri-arrow-drop-up-line text-3xl text-green-600 "></i>
                  :
                  <i className="ri-arrow-drop-down-line text-3xl text-green-600 "></i>

              } */}

              {

                <i className={`ri-arrow-drop-${openMainBugSec ? "down" : "up"}-line text-3xl text-green-600 transition-all `}></i>

              }


            </button>

          </div>

        </div>


        {
          openMainBugSec
          &&
          <div className="border-t border-green-600 p-1 animate__animated  animate__fadeInUp">


            <form noValidate={true} className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 mt-5 ">
                  Your Email ↓
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    // name="email"
                    type="email"
                    placeholder="Your email address here"
                    // autoComplete="email"
                    // required={true}
                    {...register('email', {
                      required: "Email is Required", pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "Email is Invalid."
                      }
                    })}
                    className={` w-fit block rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                  />
                  <p className="text-sm pl-2 text-red-500 font-bold"> {errors.email?.message} </p>

                </div>
              </div>


              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="Bug_comment" className="block text-sm font-medium leading-6 ">
                    Bug Comment ↓
                  </label>
                </div>
                <div className="mt-2 relative">

                  <textarea
                    // cols={30} rows={10}

                    cols={100} rows={7}

                    id="Bug_comment"
                    placeholder="Explain the bug please.Please do not spam."
                    // autoComplete="current-password"
                    {...register("bugComment", { required: "Bug Comment is required" })}
                    className={` w-full resize-none block rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}

                  >

                  </textarea>



                  <p className="text-sm pl-2 text-red-500 font-bold"> {errors.bugComment?.message} </p>
                </div>
              </div>


              <div>
                <button
                  type="submit"
                  className=" ml-auto flex justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 hover:scale-x-110 transition-all"
                >
                  Report the Bug
                </button>
              </div>


            </form>

          </div>
        }


      </div>

    </>
  )
}



type SocialLinkStructure = { socialName: string, href: string }

function ContactLogoDiv() {

  // // Data for links --------->
  let socialLinks: SocialLinkStructure[] = [
    { socialName: "github", href: "https://github.com/Ashishkuldeep23" },
    { socialName: "linkedin", href: "https://www.linkedin.com/in/ashish-kuldeep-09b96018b/" },
    { socialName: "twitter-x", href: "https://twitter.com/web_dev_with_ak" },
    { socialName: "youtube", href: "https://www.youtube.com/@web_dev_with_ak" },
    { socialName: "instagram", href: "https://www.instagram.com/web_dev_with_ak/" },
    { socialName: "mail", href: "https://mail.google.com/mail/u/0/?to=ashishkuldeep6@gmail.com&su=Just_Connect_with_you&body=Hey%20Ashish,%20I%20want%20to%20connect%20with%20you%20via%20What%27s%20App.%20I%27m,%20%3CYOURNAME_HERE%3E%20and%20I%20want%20to%20discuss%20%3CTOPIC_HERE%3E%20,%20Thank%20you.&bcc=ashishkuldeep6@gmail.com&fs=1&tf=cm" },
  ]


  return (
    <>
      <div className="w-fit  rounded my-6 px-2 py-3 ml-auto  text-center flex flex-col items-center " >
        <p className="text-xl font-bold border-b  border-green-600 w-fit px-5 ">Connect with me ↓ </p>

        <div className=" flex flex-wrap justify-center">
          {
            socialLinks.map((ele, i) => <SingleSocialLink ele={ele} key={i} />)
          }
        </div>

      </div>
    </>
  )
}

import { motion } from 'framer-motion'

function SingleSocialLink({ ele }: { ele: SocialLinkStructure }) {

  const ref = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState({ x: 0, y: 0 })


  function mouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    
    setPosition({ x: 5, y: -5 })

    const { clientX, clientY } = e;
    const { width, height, top, left } = ref?.current?.getBoundingClientRect() as DOMRect
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);


    console.log(x , y)

    setPosition({ x: 5, y: 5 })
  }



  return (
    <motion.div

      // ref={ref}
      animate={{ x: position.x, y: position.y }}

      onMouseMove={(e) => mouseMove(e)}

      onMouseLeave={()=>{setPosition({x : 0 , y : 0})}}

      className=" text-4xl mx-2 hover:-translate-y-1.5 hover:text-green-600 active:scale-75 transition-all"

      id="social_logo"

    >
      <a
        href={ele.href}
        target="__blank"
      >
        <i className={`ri-${ele.socialName}-line`}></i>
      </a>
    </motion.div>
  )
}



