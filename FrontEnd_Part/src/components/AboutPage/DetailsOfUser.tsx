// import { useSelector } from "react-redux"
import { useSelector } from "react-redux"
import { userState } from "../../Slices/UserSlice"
import { RootState } from "../../store"
// import { RootState } from "../../store"


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
                className=" mx-auto max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8  p-2 pt-16 flex flex-col justify-center items-center md:flex-row "
            >

                <div className=" w-auto">

                    {
                        getUserData && getUserData.name !== ""
                            ?
                            <img
                                className=" w-80 md:max-w-sm  rounded-xl  outline outline-offset-2 outline-emerald-300  hover:outline-offset-4  transition-all "
                                src={getUserData.profilePic}
                                alt=""
                            />
                            :
                            <div
                                className={` w-full h-56 sm:w-80 sm:h-80 md:max-w-sm  rounded-xl  outline outline-offset-2 outline-emerald-300 bg-slate-300  hover:outline-offset-4  transition-all `}
                            ></div>
                    }

                </div>

                <div className="ml-0 mt-5 md:mt-0 md:ml-10">
                    <h2 className={` ${!themeMode ? "bg-slate-100" : "bg-slate-900"}   w-full rounded my-0.5 px-1`} >Name : {getUserData.name}</h2>
                    <p className={`  ${!themeMode ? "bg-slate-100" : "bg-slate-900"}   w-full rounded my-0.5 px-1 `} >Email : {checkEmail(getUserData.email)} </p>
                    <div className={`  ${!themeMode ? "bg-slate-100" : "bg-slate-900"}   w-full rounded my-0.5 px-1 `} >
                        <p>Address :</p>

                        {
                            getUserData.address && getUserData.address.length > 0
                                ?

                                getUserData.address.map((ele, i) => {
                                    return (
                                        <div className={`${!themeMode ? "bg-slate-100" : "bg-slate-900"} relative px-1 pl-10 pb-3 border-b rounded-b-md `} key={i}>

                                            <span className=" absolute left-5 border border-green-300 px-1 rounded-full text-green-300">{i+1}</span>

                                            <p>Street : {ele.street}</p>
                                            <p>City : {ele.city}</p>
                                            <p>Country : {ele.country}</p>
                                            <p>Pincode : {ele.pincode}</p>

                                        </div>
                                    )
                                })
                                :
                                <p  className={`${!themeMode ? "bg-slate-100" : "bg-slate-900"} relative px-1 pl-10 pb-3 border-b rounded-b-md `} >No address found</p>
                        }

                    </div>
                </div>

            </div>


        </>
    )
}

export default DetailsOfUser