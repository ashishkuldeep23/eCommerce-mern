import { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { reqVerifyMail, upadteUserData, userState } from "../../Slices/UserSlice"
import { AppDispatch } from "../../store"
import { setChildrenModal, setOpenMoadl } from "../../Slices/ModalSlice"



const formData = new FormData()



const UserImageDiv = () => {

    const getUserData = userState().userData

    const dispatch = useDispatch<AppDispatch>()


    const [showImgInput, setShowImgInput] = useState<boolean>(false)

    const [userImage, setUserImage] = useState<string>(getUserData.profilePic)


    function showModalWithValues() {

        let ChildrenOfModal = <img className=" rounded" src={userImage} alt="" />

        dispatch(setOpenMoadl(true))
        dispatch(setChildrenModal(ChildrenOfModal))
    }


    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        e.stopPropagation();
        e.preventDefault();


        if (e.target.files) {

            const file = e?.target?.files[0]

            formData.set('file', file)

            formData.set("whatUpadte", "userImg")

            // // // Show img direct by here --->
            setUserImage(URL.createObjectURL(file))


        }



    }


    function submitNewImg() {

        let checkImge = formData.get("file")

        // console.log(checkImge)

        if (!checkImge) {
            toast.error(`Change image by input please.`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }

        // console.log(formData.get("file"))
        // console.log(formData.values())

        if (formData.get("file")) {

            // dispatch(upadteUserData({ bodyData: { whatUpadte: "userImg", file : formData.get("file") } }))
            dispatch(upadteUserData({ formData: formData }))
        }


        // alert();

        // // Call dispatch here ---->
    }




    useEffect(() => {
        // console.log(getUserData.profilePic)

        setUserImage(getUserData.profilePic)
    }, [getUserData.profilePic])




    return (
        <>

            <div>


                <div className=" w-auto relative" onClick={() => { showModalWithValues() }} >

                    {
                        getUserData && (getUserData.firstName !== "" || getUserData.lastName !== "")
                            ?
                            <img
                                className=" w-80 md:max-w-sm  rounded-xl  outline outline-offset-2 outline-emerald-300  hover:outline-offset-4  transition-all "
                                src={userImage}
                                alt=""

                            />
                            :
                            <div
                                className={` w-full h-56 sm:w-80 sm:h-80 md:max-w-sm  rounded-xl  outline outline-offset-2 outline-emerald-300 bg-slate-300  hover:outline-offset-4  transition-all `}
                            ></div>
                    }

                    <button
                        className=" absolute bg-green-400 text-white -right-1 -bottom-1 px-1 rounded"
                        onClick={(e) => { e.stopPropagation(); setShowImgInput(!showImgInput) }}
                    >
                        {
                            !showImgInput
                                ? <span className='font-bold'>Upload</span>
                                : <span className=' text-red-100 font-bold'>Close</span>
                        }

                    </button>


                </div>


                {

                    showImgInput
                    &&

                    <div>

                        {

                            getUserData.isEmailVerified

                                ?


                                <div className="mt-3 flex flex-col justify-start items-end">
                                    <input
                                        className='rounded-full'
                                        type="file"
                                        name=""
                                        accept="image/png, image/png, image/jpeg"
                                        id="change_img"
                                        onChange={(e) => { onChangeHandler(e) }}
                                    />


                                    <div >
                                        <label htmlFor="change_img" className='text-green-500'>After changing click submit </label>
                                        <button className="bg-green-500 px-1 rounded text-white font-bold" onClick={(e) => { e.stopPropagation(); submitNewImg(); }}>☝️Upload</button>
                                    </div>

                                </div>

                                :
                                <div
                                    className="mt-3 flex flex-col justify-start items-center"
                                >
                                    <h1 className=' font-semibold '>Please verify your mail.</h1>
                                    <button
                                        className=' px-3 rounded bg-green-400 font-bold text-white my-2'
                                        onClick={() => { dispatch(reqVerifyMail()) }}
                                    >Verify Mail</button>
                                </div>

                        }


                    </div>

                }



            </div>

        </>
    )
}

export default UserImageDiv