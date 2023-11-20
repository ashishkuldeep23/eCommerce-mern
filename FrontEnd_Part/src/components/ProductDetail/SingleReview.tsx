import { StarIcon } from "@heroicons/react/24/outline"
import { ReviewData } from "./ProductDetails"
import { userState } from "../../Slices/UserSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { deleteReview } from "../../Slices/ReviewSlice"



type PropOfSingleReview = {
    reviewData: ReviewData
}


const SingleReview = ({ reviewData }: PropOfSingleReview) => {


    const userDataId = userState().userData.id

    const dispatch = useDispatch<AppDispatch>()



    return (
        <>

            <div className='p-1   my-4 mx-2 px-2 border border-green-300 rounded  '>


                {/* {JSON.stringify(r)} */}



                <div className='flex items-center  '>
                    <img className=' w-6 h-6 object-cover rounded-full hover:rounded-sm hover:scale-125 transition-all' src={reviewData.userData.userImg} alt="" />
                    <p className=' text-xl pl-2 font-bold border-b '>{reviewData.userData.userName}</p>
                </div>

                <div>
                    <div className='flex items-center'>

                        <div className='flex items-center bg-green-500 text-white my-1 px-1 rounded'>
                            <StarIcon className={` h-4 w-4 flex-shrink-0`} />
                            <p >{reviewData.stars}</p>
                        </div>
                        <p className='ml-2 text-xl'>{reviewData.comment}</p>

                    </div>
                    <div className='flex  w-4/5 my-2'>

                        <p className='border px-3 mr-3 rounded '><i className="ri-thumb-up-fill"></i> {reviewData.likes}</p>
                        <p className='border px-3 rounded '><i className="ri-thumb-down-fill"></i> {reviewData.dislikes}</p>
                    </div>


                    <div className={`flex  justify-end relative  ${userDataId !== reviewData.userData.userUID ? " hidden" : "display" } `}>

                        <div className=" absolute left-0">

                            <button
                                className="  border rounded px-0.5 mx-0.5 hover:bg-red-300 hover:text-white"
                                onClick={(e)=>{e.stopPropagation(); dispatch(deleteReview( {reviewId : reviewData.id , userUID : userDataId} ))}}
                            >
                                <i className="ri-delete-bin-7-line"></i>
                            </button>

                            <button
                                className="  border rounded px-0.5 mx-0.5 hover:bg-blue-300 hover:text-white"
                            >
                                <i className="ri-pencil-fill"></i>
                            </button>

                        </div>

                        <p className='text-end mr-5 '>{reviewData.whenCreated}</p>
                    </div>

                </div>


            </div>
        </>

    )
}

export default SingleReview
