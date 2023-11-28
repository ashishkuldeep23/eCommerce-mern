import { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { upadteUserData, userState } from "../../Slices/UserSlice"
import { AppDispatch } from "../../store"
import { setChildrenModal, setOpenMoadl } from "../../Slices/ModalSlice"



const formData = new FormData()



const UserImageDiv = () => {

    const getUserData = userState().userData

    const dispatch = useDispatch<AppDispatch>()


    const [showImgInput, setShowImgInput] = useState<boolean>(false)

    const [userImage, setUserImage] = useState(getUserData.profilePic)


    function showModalWithValues() {

        dispatch(setOpenMoadl(true))

        let ChildrenOfModal = <img className=" rounded" src={userImage} alt="" />

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
                        getUserData && (getUserData.firstName !== "" || getUserData.lastName !== "" )
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
                                ? "Upload"
                                : "Close"
                        }

                    </button>


                </div>


                {

                    showImgInput
                    &&

                    <div className="mt-3 flex flex-col justify-start items-end">
                        <input
                            className='rounded-full'
                            type="file"
                            name=""
                            accept="image/png, image/gif, image/jpeg"
                            id="change_img"
                            onChange={(e) => { onChangeHandler(e) }}
                        />



                        <div >
                            <label htmlFor="change_img" className='text-green-500'>After changing click submit </label>
                            <button className="bg-green-500 px-1 rounded text-white" onClick={(e) => { e.stopPropagation(); submitNewImg(); }}>☝️Submit</button>
                        </div>

                    </div>

                }



            </div>

        </>
    )
}

export default UserImageDiv