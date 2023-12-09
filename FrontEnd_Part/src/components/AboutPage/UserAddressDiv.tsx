import { useDispatch, useSelector } from "react-redux"
import { UserAddressObj, setIsLoading, upadteUserData, userState } from "../../Slices/UserSlice"
import { AppDispatch, RootState } from "../../store"
import { Fragment, useEffect, useState } from 'react'


import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"





const addressFormData = new FormData()



const UserAddressDiv = () => {

    const getUserData = userState().userData

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserAddressObj>()

    const [postAdOpen, setPostAdOpen] = useState(false)

    const [upadteAd, setUpadteAd] = useState(false)

    const dispatch = useDispatch<AppDispatch>()

    // const [newAddressData, setNewAddresData] = useState<AddresInputs>()


    async function autoFillAddress(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {


        e.preventDefault()
        e.preventDefault()

        // // // Set is loading here ---->
        dispatch(setIsLoading(true))


        let navLocation = () => {
            return new Promise((res, rej) => {
                navigator.geolocation.getCurrentPosition(res, rej);
            });
        }


        let latlong = await navLocation().then((res: any) => {
            let latitude = res?.coords?.latitude;
            let longitude = res?.coords?.longitude;
            return [latitude, longitude]
        })

        let [lat, long] = latlong
        // console.log(lat, long)


        const getCurrentLocation = await fetch(`${import.meta.env.VITE_APP_API_URL}?q=${lat}+${long}&key=${import.meta.env.VITE_APP_API_KEY}`)

        let res = await getCurrentLocation.json()

        // console.log(res)


        if (res.status.code === 200) {
            let city = res.results[0].components.city
            //   let state = res.results[0].components.state
            let country = res.results[0].components.country
            let street = res.results[0].components.suburb
            let pincode = res.results[0].components.postcode


            //   console.log(res.results[0])

            //   let formated = `${city},${state},${country}`

            //   setLocation(formated)

            // console.log(location)
            // console.log(formated)

            setValue("street", street)
            setValue("city", city)
            setValue("country", country)
            setValue("pincode", pincode)


        }
        else {

            toast.error(`Error,Please try again. Or Write manually`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }


        dispatch(setIsLoading(false))


        // // // By this way we can set value in our from ---->
        // setValue("address.city" , "Godna")

    }


    // // // // So This is actual fucton that handles onSubit event
    const onSubmit: SubmitHandler<UserAddressObj> = (data) => {

        // console.log(data);
        // console.log(data);

        // // Create New form Data --->

        if (Object.keys(errors).length <= 0) {

            // console.log(data)

            // for (let [key, value] of Object.entries(data)) {
            //     // addressFormData.set(key , value)
            //     setNewAddresData({ ...newAddressData, [key]: value })
            // }


            if (!upadteAd) {

                // // // Add new address --->

                addressFormData.set("whatUpadte", "address")

                for (let [key, value] of Object.entries(data)) {
                    addressFormData.set(key, value)
                }

                dispatch(upadteUserData({ formData: addressFormData }))
            } else {

                // // // Update old address --->

                let { id, ...resData } = data

                addressFormData.set("whatUpadte", "upadteAddress")
                addressFormData.set("addressId", `${id}`)

                for (let [key, value] of Object.entries(resData)) {
                    addressFormData.set(key, value)
                }


                dispatch(upadteUserData({ formData: addressFormData }))
            }

        }

        // // // Here you can call you backend

    }



    function uapdetAddress(data: UserAddressObj) {

        setPostAdOpen(true)

        setValue("street", data.street)
        setValue("city", data.city)
        setValue("country", data.country)
        setValue("pincode", data.pincode)
        setValue("id", data.id)

        setUpadteAd(true)

    }



    function deleteAddressHandler(id: string) {

        addressFormData.set("whatUpadte", "deleteAddress")
        addressFormData.set("addressId", `${id}`)

        dispatch(upadteUserData({ formData: addressFormData }))
    }



    const isLoading = userState().isLoading

    const isFullfiled = userState().isFullFilled


    // // // back to normal all things ---->
    useEffect(() => {

        // // // back to normal all things ---->
        if (isFullfiled) {

            setValue("street", "")
            setValue("city", "")
            setValue("country", "")
            setValue("pincode", "")

            setPostAdOpen(false)
            setUpadteAd(false)
        }

    }, [isFullfiled])




    return (
        <>

            {/* Loader code -------> */}
            <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 scale-150 z-10">
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


            {/* Show All Address of user --> */}

            {
                getUserData.address
                &&
                (getUserData.address.length > 0)
                &&
                // (getUserData.address[0].city !== "" && getUserData.address[0].country !== "" && getUserData.address[0].street !== "" && getUserData.address[0].pincode !== "")

                // &&

                getUserData.address.map((ele , i) => {
                    return (


                        <Fragment key={i}>


                            <div className={`${!themeMode ? "bg-slate-100" : "bg-slate-900"} relative p-0.5 rounded  border-b border-green-300`}>

                                {/* <span className=" absolute left-5 border border-green-300 px-1 rounded-full text-green-300">{i + 1}</span> */}
                                <p>Street : {ele.street || "Not Given"}</p>
                                <p>City : {ele.city || "Not Given"}</p>
                                <p>Country : {ele.country || "Not Given"}</p>
                                <p>Pincode : {ele.pincode || "Not Given"}</p>

                                <button
                                    className=" absolute bottom-9 right-0  border rounded px-0.5 mx-0.5 hover:bg-red-300 hover:text-white"
                                    onClick={(e) => { e.stopPropagation(); deleteAddressHandler(ele.id); }}
                                >
                                    <i className="ri-delete-bin-7-line"></i>
                                </button>

                                <button
                                    className=" absolute bottom-1 right-0  border rounded px-0.5 mx-0.5 hover:bg-green-300 hover:text-white"
                                    onClick={(e) => { e.stopPropagation(); uapdetAddress(ele) }}
                                >

                                    <i className="ri-pencil-fill"></i>
                                </button>



                            </div>


                        </Fragment>

                    )
                })

                // : <p className={`${!themeMode ? "bg-slate-100" : "bg-slate-900"} relative px-1 border-b rounded-b-md `} >No address found</p>
            }


            <div className=" flex flex-col items-center justify-center">


                {
                    postAdOpen
                    &&

                    <div>


                        <div className="flex">

                            <button
                                className="text-green-500 border border-1 border-green-500 px-1 ml-auto mt-1 rounded text-sm hover:bg-green-500 hover:text-white "
                                onClick={(e) => autoFillAddress(e)}
                            >Autofill Address</button>
                        </div>

                        <div className="mt-2 flex flex-wrap">

                            <form noValidate className="space-y-3 flex flex-col xsm:w-60" onSubmit={handleSubmit(onSubmit)} >



                                {/* For street  */}
                                <input
                                    id="address"
                                    type="text"
                                    placeholder="Street"
                                    {...register("street", {
                                        required: "Street is Required |",
                                        pattern: {
                                            value: /[a-zA-Z][a-zA-Z0-9-_ .]{3,25}/, message: "Street is Invalid. |"
                                        }
                                    }
                                    )}
                                    className={` my-1 block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                {/* For City */}
                                <input

                                    type="text"
                                    placeholder="City"
                                    {...register("city", {
                                        required: "City is Required |",
                                        pattern: {
                                            value: /[a-zA-Z][a-zA-Z0-9-_ .]{3,25}/, message: "City is Invalid. |"
                                        }
                                    })}
                                    className={` my-1 block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                {/* For Country  */}
                                <input

                                    type="text"
                                    placeholder="Country"
                                    {...register("country", {
                                        required: "Country is Required |",
                                        pattern: {
                                            value: /[a-zA-Z][a-zA-Z0-9-_ .]{3,25}/, message: "Country is Invalid. |"
                                        }
                                    })}
                                    className={` block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                {/* For PIN Code  */}
                                <input

                                    type="number"
                                    placeholder="PIN Code"
                                    {...register("pincode", { required: "PIN Code is Required ", pattern: { value: /^[1-9][0-9]{5}$/, message: "Matches exactly one digit from 1 to 9 and Matches exactly five digits in the inclusive range 0-9" } })}
                                    className={`block  rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />

                                {/* Show Errors here ---> */}
                                <p className=" flex text-sm pl-2 text-red-500 font-bold">
                                    {errors.street?.message}
                                    {errors.city?.message}
                                    {errors.country?.message}
                                    {errors.pincode?.message}
                                </p>


                                {
                                    postAdOpen

                                    &&

                                    <button
                                        type="submit"
                                        className="rounded bg-green-500 text-white px-1 ml-auto"
                                    // onClick={() => onSubmit()}
                                    >
                                        {
                                            !upadteAd
                                                ? "+Add Address"
                                                : "↑Update Address"
                                        }
                                    </button>


                                }


                            </form>

                        </div>

                    </div>

                }





                <button
                    className="rounded bg-green-500 text-white px-1 mt-1 ml-auto"
                    onClick={() => setPostAdOpen(!postAdOpen)}
                >


                    {
                        !postAdOpen

                            ?

                            <span>+ Address</span>

                            :
                            <span className=" text-red-500 font-bold">+ Close</span>
                    }




                </button>







            </div >


        </>
    )
}

export default UserAddressDiv

