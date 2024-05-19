
// import React from 'react'

import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { logInUser } from "../../Slices/UserSlice"

const GoogleBtnLogic = () => {


    const dispatch = useDispatch<AppDispatch>()

    function googleLogIn() {
        // window.open(`${import.meta.env.VITE_BACKEND_URL}/userLoginGoogle` ,  'newwin', 'height=500,width=500,left=500,top=150,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
        window.open(`${import.meta.env.VITE_BACKEND_URL}/userLoginGoogle`, '_self')
    }


    function defultUserClickHandler() {
        dispatch(logInUser({
            bodyData: {
                username: "dell271125@gmail.com",
                password: "Dell@271125"
            }
        }))
    }



    return (
        <>
            <div className=" my-2 border-t border-b text-center">
                {/* <hr /> */}
                <p>OR</p>
            </div>

            <div className="flex justify-center my-1" onClick={() => { googleLogIn() }} >
                <button
                    className="bg-red-500 px-2 rounded text-lg text-white font-bold"
                >
                    <i className="ri-google-line mx-1"></i>
                    <span>Google</span>
                </button>

            </div>
            <div className="flex justify-center my-1" onClick={() => { defultUserClickHandler() }} >
                <button
                    className=" bg-indigo-500 px-2 rounded text-lg text-white font-bold"
                >
                    <i className="ri-user-3-line mx-1"></i>
                    <span>Default User</span>
                </button>

            </div>

        </>
    )
}

export default GoogleBtnLogic

