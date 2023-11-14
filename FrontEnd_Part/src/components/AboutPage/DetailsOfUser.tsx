// import { useSelector } from "react-redux"
import { userState } from "../../Slices/UserSlice"
// import { RootState } from "../../store"


const DetailsOfUser = () => {

    // const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

    // const hightLightProducts = useSelector((store: RootState) => store.allProductWithCatReducer.allHighlightProducts)

    const getUserData = userState().userData

    return (
        <>

            {/* user Details div */}
            <div
                className="  flex mx-auto max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8  p-2 pt-16 justify-center items-center flex-col md:flex-row my-10"
            >

                <div className=" w-full sm:w-auto">

                    {/* <img
                            className=" w-80 md:max-w-sm  rounded-xl  outline outline-offset-2 outline-emerald-300  hover:outline-offset-4  transition-all "
                            src={getUserData.profilePic}
                            alt=""
                        /> */}

                    <div
                        className={` w-full h-56 sm:w-80 sm:h-80 md:max-w-sm  rounded-xl  outline outline-offset-2 outline-emerald-300 bg-slate-300  hover:outline-offset-4  transition-all `}
                    >


                    </div>

                </div>

                <div className="ml-0 mt-5 md:mt-0 md:ml-10">
                    <h2 className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1" >Name : {getUserData.name}</h2>
                    <p className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1" >Email : {getUserData.email} </p>
                    <p className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1" >Address : Array or all address</p>
                </div>

            </div>


        </>
    )
}

export default DetailsOfUser