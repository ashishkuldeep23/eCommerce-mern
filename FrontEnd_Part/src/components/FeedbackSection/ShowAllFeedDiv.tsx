

// import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useEffect, useRef } from "react"
import { FeedBackSingle, feedbackState, getAllFeedbacks } from "../../Slices/FeedbackSliceFile"
import { motion, useDragControls } from "framer-motion"


function ShowAllFeedDiv() {

    const dispatch = useDispatch<AppDispatch>()

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const { allFeedbackArr } = feedbackState()

    const parentRef = useRef(null)




    useEffect(() => {
        dispatch(getAllFeedbacks());

        // // // To scroll window
        window.scroll(0, 0)
    }, [])

    return (
        <>
            <div
                className={` flex flex-col items-center justify-center min-h-[80vh] p-2 relative overflow-hidden w-full  sm:w-10/12 rounded-xl ${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"}`}
            >

                <BackGroundDiv />


                <div
                    ref={parentRef}
                    className={` flex flex-wrap item-center items-center gap-5  relative z-10 ${allFeedbackArr.length > 5 && " justify-center"}`}
                >


                    {
                        allFeedbackArr.length > 0
                            ? allFeedbackArr.map((ele, i) => <SingleFeedBack key={i} feedback={ele} i={i} refrance={parentRef} />)

                            : <p>No Feedback found currently</p>
                    }

                </div>


                {/* <FrontGroundDiv /> */}

            </div>

        </>
    )
}

export default ShowAllFeedDiv



function SingleFeedBack({ feedback, i, refrance }: { feedback: FeedBackSingle, i: number, refrance: React.MutableRefObject<null> }) {

    const controls = useDragControls()

    const { allFeedbackArr } = feedbackState()


    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)


    return (
        <>
            <motion.div
                drag
                dragControls={controls}
                dragConstraints={refrance}
                whileDrag={{ scale: 1.2, zIndex: 10 }}
                // dragElastic={0.1}
                dragPropagation

                className={` w-3/5 sm:w-auto sm:max-w-[30vw] rounded-2xl text-center hover:cursor-grab overflow-hidden border relative border-white bg-emerald-700  ${themeMode ? "text-black" : "text-white"} `}
            >
                <p className=" text-center py-2 bg-rose-600"><span className=" font-bold border-b border-black">{feedback.feedbackType}</span></p>

                <span className=" absolute top-1 right-1 border px-1 rounded-full py-0 text-white bg-rose-900 text-sm ">{allFeedbackArr.length - i}</span>

                <div className="py-2 text-slate-300">


                    <p className=" text-xl break-words" style={{ lineBreak: "anywhere" }}>Name : <span className=" font-semibold">{feedback.feedbackName}</span></p>
                    <p className=" py-2 break-words">Comment : <span className=" font-semibold">{feedback.feedbackMsg}</span></p>
                    <p> Reply : {feedback.reply}</p>
                </div>

                <p className=" text-center py-1.5 px-2 bg-[#1597BB] text-slate-300">{feedback.whenCreated}</p>
            </motion.div >
        </>
    )
}






function BackGroundDiv() {
    return (
        <>

            <div className=" bg-transparent flex flex-col justify-center items-center absolute top-0 left-0  h-full w-full -z-0 ">
                <p className=" text-center">Drag feedback and see effect😊</p>
                <h1
                    style={{ lineBreak: "anywhere", fontFamily: "cursive" }}
                    className=" text-7xl sm:text-9xl font-mono text-emerald-700 font-bold"
                >Feedback</h1>
                <p className=" text-center">All feedbacks about this web app is visiable here.</p>
            </div>

        </>
    )
}



