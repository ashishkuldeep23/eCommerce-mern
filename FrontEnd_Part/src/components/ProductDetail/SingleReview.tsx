import { StarIcon } from "@heroicons/react/24/outline"
import { ReviewData } from "./ProductDetails"
import { userState } from "../../Slices/UserSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { deleteReview, dislikeReview, likeReview, setReviewData, setReviewUpadte } from "../../Slices/ReviewSlice"
import { setChildrenModal, setOpenMoadl } from "../../Slices/ModalSlice"



type PropOfSingleReview = {
    reviewData: ReviewData
}


const SingleReview = ({ reviewData }: PropOfSingleReview) => {


    const userDataId = userState().userData.id

    const dispatch = useDispatch<AppDispatch>()



    const updateReview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, reviewData: ReviewData) => {

        e.stopPropagation();
        e.preventDefault();


        // console.log(reviewData)

        dispatch(setReviewData({ data: reviewData }))

        dispatch(setReviewUpadte({ data: true }))


        // let post_review_div = document.querySelector("#post_review")

        // console.log( window.pageYOffset ,post_review_div?.getBoundingClientRect().top , post_review_div.off)

        // let y = post_review_div?.getBoundingClientRect().y

        // if(y) window.scroll(0 , y)

        if (window.innerWidth <= 1024) {

            window.scroll(0, 1400)
        } else {

            window.scroll(0, 700)
        }


    }



    const likeHandler = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {


        e.stopPropagation();
        e.preventDefault();


        // alert("ok")

        if (!reviewData.likedUserIds.includes(userDataId)) {

            dispatch(likeReview({ reviewId: reviewData.id, isLiking: true, userId: userDataId }))
        } else {

            dispatch(likeReview({ reviewId: reviewData.id, isLiking: false, userId: userDataId }))
        }


    }



    const dislikeHandler = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {


        e.stopPropagation();
        e.preventDefault();


        // alert("ok")

        if (!reviewData.dislikedUserIds.includes(userDataId)) {

            dispatch(dislikeReview({ reviewId: reviewData.id, isDisliking: true, userId: userDataId }))
        } else {

            dispatch(dislikeReview({ reviewId: reviewData.id, isDisliking: false, userId: userDataId }))
        }


    }




    function showModalWithValues() {

        // e.stopPropagation();

        // alert()


        dispatch(setOpenMoadl(true))


        let ChildrenOfModal = <div><p className=" text-center font-bold text-xl underline">Name : {reviewData.userData.userName}</p><img src={reviewData.userData.userImg} alt="" /></div>

        dispatch(setChildrenModal(ChildrenOfModal))

    }



    return (
        <>

            <div className='p-1   my-4 mx-2 px-2 border border-green-300 rounded  ' id="post_review">


                {/* {JSON.stringify(r)} */}



                <div

                    className='flex items-center hover:cursor-pointer'
                    onClick={showModalWithValues}
                >
                    <img className=' w-6 h-6 object-cover rounded-full hover:rounded-sm hover:scale-125 transition-all' src={reviewData.userData.userImg} alt="" />
                    <p className=' text-xl pl-2 font-bold border-b '>{reviewData.userData.userName}</p>
                </div>

                <div>
                    <div className='flex items-center'>

                        <div className='flex items-center bg-yellow-400 text-white my-1 px-1 rounded'>
                            <StarIcon className={` h-4 w-4 flex-shrink-0`} />
                            <p >{reviewData.stars}</p>
                        </div>
                        <p className='ml-2 text-xl'>{reviewData.comment}</p>

                    </div>
                    <div className='flex  w-4/5 my-2'>


                        <p
                            className={`border px-3 mr-3 rounded ${reviewData.likedUserIds.includes(userDataId) && 'text-blue-400'}  `}
                            onClick={(e) => likeHandler(e)}
                        >
                            <i
                                className={`ri-thumb-up-fill ${reviewData.likedUserIds.includes(userDataId) ? 'text-blue-400' : "text-gray-300"} `}
                            ></i> {reviewData.likes}
                        </p>



                        <p
                            className={`border px-3 rounded ${reviewData.dislikedUserIds.includes(userDataId) && 'text-red-400'}  `}
                            onClick={(e) => dislikeHandler(e)}
                        >
                            <i
                                className={`ri-thumb-down-fill ${reviewData.dislikedUserIds.includes(userDataId) ? 'text-red-400' : "text-gray-300"} `}
                            ></i> {reviewData.dislikes}
                        </p>
                    </div>


                    <div className={`flex  justify-end relative  ${userDataId !== reviewData.userData.userUID ? " hidden" : "display"} `}>

                        <div className=" absolute left-0">

                            <button
                                className="  border rounded px-0.5 mx-0.5 hover:bg-red-300 hover:text-white"
                                onClick={(e) => { e.stopPropagation(); dispatch(deleteReview({ reviewId: reviewData.id, userUID: userDataId })) }}
                            >
                                <i className="ri-delete-bin-7-line"></i>
                            </button>

                            <button
                                className="  border rounded px-0.5 mx-0.5 hover:bg-blue-300 hover:text-white"
                                onClick={(e) => { updateReview(e, reviewData) }}
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
