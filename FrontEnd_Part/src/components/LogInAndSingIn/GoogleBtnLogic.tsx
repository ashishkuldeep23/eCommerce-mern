
// import React from 'react'

const GoogleBtnLogic = () => {



    function googleLogIn(){
        window.open(`${import.meta.env.VITE_BACKEND_URL}/userLoginGoogle` , "_self")
    }



    return (
        <>
            <div className=" my-2 border-t border-b text-center">
                {/* <hr /> */}
                <p>OR</p>
            </div>

            <div className="flex justify-center" onClick={()=>{googleLogIn()}} >
                <button
                    className="bg-red-500 px-2 rounded text-lg text-white font-bold"
                >
                    <i className="ri-google-line mx-1"></i>
                    Google</button>
            </div>

        </>
    )
}

export default GoogleBtnLogic

