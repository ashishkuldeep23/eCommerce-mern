// import { useSelector } from "react-redux"
import { useDispatch, useSelector } from "react-redux"
import { upadteUserData, userState } from "../../Slices/UserSlice"
import { AppDispatch, RootState } from "../../store"
// import { setChildrenModal, setOpenMoadl } from "../../Slices/ModalSlice"
import UserAddressDiv from "./UserAddressDiv"
import UserImageDiv from "./UserImage"
import { useEffect, useState } from "react"
// import { RootState } from "../../store"



const fromData = new FormData()

const DetailsOfUser = () => {


    // const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

    // const hightLightProducts = useSelector((store: RootState) => store.allProductWithCatReducer.allHighlightProducts)

    const getUserData = userState().userData


    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)



    const validateEmail = (/^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/);

    const checkEmail = (email: string) => {

        // // // If data not matched with email then show this type ----->
        if (!validateEmail.test(email)) {
            email = `Google Account (${email.slice(0, 7)}...)`
        }


        return email
    }






    return (
        <>

            {/* user Details div */}
            <div
                className=" mx-auto max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8  p-2 pt-16"
            >

                <div className="flex flex-col justify-center items-center md:flex-row">



                    <UserImageDiv />

                    <div className="ml-0 mt-5 md:mt-0 md:ml-10">

                        <h2 className={` ${!themeMode ? "bg-slate-100" : "bg-slate-900"}  font-bold w-full rounded my-0.5 px-1`} >Name : {getUserData.name} </h2>

                        <p className={`  ${!themeMode ? "bg-slate-100" : "bg-slate-900"}   w-full rounded my-0.5 px-1 `} >Email : {checkEmail(getUserData.email)} </p>

                        <div className={`  ${!themeMode ? "bg-slate-100" : "bg-slate-900"}   w-full rounded my-0.5 px-1 `} >
                            <p>Address :</p>

                            <div className="pl-10 pb-3 relative ">

                                <UserAddressDiv />

                            </div>

                        </div>
                    </div>

                </div>


                {
                    (getUserData.allImages && getUserData.allImages.length > 1)

                    &&

                    <UserImgsMoreThenOn />

                }


            </div>


        </>
    )
}

export default DetailsOfUser




function UserImgsMoreThenOn() {

    const getUserData = userState().userData

    const isLoading = userState().isLoading

    const dispatch = useDispatch<AppDispatch>()

    function makeThisProfilePic(img: string) {

        fromData.set("whatUpadte", "makeProfilePic")
        fromData.set("pathUrl", `${img}`)

        dispatch(upadteUserData({ formData: fromData }))
    }


    const [userAllImgs , setUserAllImgs] = useState([])


    useEffect( ()=>{


        if(getUserData.allImages){

            // // // Making Reverse of an image --->
            let makeRevOfImgs = [...getUserData.allImages].reverse()

            setUserAllImgs(makeRevOfImgs)
        }

    } , [getUserData.allImages])



    return (
        <>
            <div
                className=" text-center mx-auto max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8  p-2 pt-16 relative"
            >

                {/* Loader code -------> */}
                <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 scale-200 z-30">
                    {
                        isLoading
                        &&

                        <div role="status">
                            <svg aria-hidden="true" className="inline w-20 h-20  text-transparent animate-spin fill-red-600 opacity-100 " viewBox="0 0 100 101" fill="none" >
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    }
                </div>

                <h1 className=" text-2xl  underline text-blue-500">Your all updated images</h1>

                <p className="mb-5 text-teal-400">Click on image and make profile picture.</p>

                <div className="flex flex-wrap justify-center items-center gap-3">


                    {

                        getUserData.allImages && userAllImgs.map((img, i) => {
                            return (
                                <div
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); makeThisProfilePic(img) }}
                                    className=" relative p-0.5 rounded hover:scale-110  hover:cursor-pointer hover:z-10 hover:border-green-400 hover:border "
                                    id="user_single_img"
                                >
                                    <p className=" absolute top-1/2 -translate-y-1/2 z-20 text-green-400 text-center text-xl xsm:text-4xl sm:text-6xl  ">Make Profile Pic</p>
                                    <img className="w-full sm:w-80 rounded " src={img} alt="" />
                                </div>
                            )
                        })


                    }


                </div>



            </div>

        </>
    )

}


