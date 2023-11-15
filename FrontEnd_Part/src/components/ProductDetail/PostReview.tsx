import { StarIcon } from "@heroicons/react/24/outline"
import {  useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewReview } from "../../Slices/ReviewSlice"
import { AppDispatch, RootState } from "../../store"
import { fetchOneProductByID, setSingleOProductId, setSingleProductData } from "../../Slices/AllProductSlice"
import { toast } from "react-toastify"
import { setReviewData } from "../../Slices/ReviewSlice"


const PostReview = () => {

    const dispatch = useDispatch<AppDispatch>()

    const productDetailByFilter = useSelector((store: RootState) => store.allProductWithCatReducer.singleProductData)

    const isLoading = useSelector((state: RootState) => state.reviewReducer.isLoading)

    const isReviewDone = useSelector((state: RootState) => state.reviewReducer.isReview)

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    // const [newReview, setNewReviw] = useState({ stars: 0, comment: "" })

    const inputReviewData = useSelector((state : RootState) => state.reviewReducer.inputReviewData)




    function postReviewHandler() {

        if (inputReviewData.stars === 0 && inputReviewData.comment === "") {

            toast.error(`Give comment and stars, both should given.`, {
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


        if (isLoading) {

            toast.error(`New review is creating.`, {
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


        // // // Check if data come then call fn or not ----------->



        // // // check is user logIn or not ----------->




        // // // now call dispatch here --------->

        dispatch(createNewReview({ comment: inputReviewData.comment, stars: inputReviewData.stars, productID: productDetailByFilter.id }))

    }





    useEffect(() => {

        if (isReviewDone) {
            dispatch(setSingleProductData({ id: productDetailByFilter.id })); dispatch(fetchOneProductByID({ productId: productDetailByFilter.id })); dispatch(setSingleOProductId({ id: productDetailByFilter.id }));
        }

    }, [isReviewDone])





    return (
        <>

            <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100">
                {
                    isLoading
                    &&
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-20 h-20  text-gray-200 animate-spin fill-red-600 opacity-100 " viewBox="0 0 100 101" fill="none" >
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                }
            </div>

            <div className="mt-5 border p-2 px-3 rounded border-green-300">

                <h1 className=" underline  mb-2 text-lg">Give new review</h1>

                <textarea
                    name="" id=""
                    onChange={(e) => { e.stopPropagation(); e.preventDefault(); dispatch(setReviewData( { data : { ...inputReviewData, comment: e.target.value }} ))   }}
                    value={inputReviewData.comment}
                    placeholder="Nice product 😊(Your new review)"
                    cols={25} rows={2}
                    className={`resize-none rounded p-1 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"} `}
                ></textarea>

                <div className='flex justify-between items-center'>
                    <div className='flex items-center '>

                        {

                            Array.from(Array(5)).map((item, i) => {
                                return (
                                    <StarIcon
                                        // onChange={ ()=>setNewReviw({...newReview , stars : i+1}) }
                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); dispatch(setReviewData( { data : { ...inputReviewData,  stars: i + 1 }} )) }}
                                        key={i} id={item}
                                        className={` h-6 w-6 flex-shrink-0 hover:cursor-pointer ${inputReviewData.stars >= i + 1 && "text-yellow-500"} `}
                                    />
                                )
                            })

                        }

                        <h1 className="font-bold text-xl ml-1">{inputReviewData.stars}</h1>

                    </div>

                    <div>
                        <button
                            className='px-3 border rounded bg-green-600 text-white font-bold'
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); postReviewHandler() }}
                        >New</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default PostReview
