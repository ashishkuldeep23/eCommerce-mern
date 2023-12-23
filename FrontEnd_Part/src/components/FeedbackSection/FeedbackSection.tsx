// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"

const FeedbackSection = () => {

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    return (
        <div
            className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} w-full relative`}
        >
            <div className=" h-allAk mx-auto max-w-full lg:max-w-allAk px-1 lg:px-8 flex flex-col items-center justify-center">

                <p className=" text-4xl font-bold">FeedBack Section...</p>

            </div>

        </div>
    )
}

export default FeedbackSection