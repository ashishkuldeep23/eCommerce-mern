import { StarIcon } from "@heroicons/react/24/solid"
import { useDispatch, useSelector } from "react-redux"
import { createNewReview, reviewState, updateReview } from "../../Slices/ReviewSlice"
import { AppDispatch, RootState } from "../../store"
import { toast } from "sonner"
import { setReviewData } from "../../Slices/ReviewSlice"
import { gettingTokenInCookieAndLocalHost } from "../../App"
import { useNavigate } from "react-router-dom"


const PostReview = () => {

    const dispatch = useDispatch<AppDispatch>()

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const isLoading = useSelector((state: RootState) => state.reviewReducer.isLoading)

    // const [newReview, setNewReviw] = useState({ stars: 0, comment: "" })

    const inputReviewData = useSelector((state: RootState) => state.reviewReducer.inputReviewData)

    const singleProductData = useSelector((store: RootState) => store.allProductWithCatReducer.singleProductData)

    const reviewUpdateState = useSelector((store: RootState) => store.reviewReducer.isUpdatng)

    const updateReviewId = reviewState().inputReviewData.id

    const navigate = useNavigate()


    function checkUserIsLogInEd(): boolean {

        let logined = true

        // // // Check user is logIn or not --->
        if (!gettingTokenInCookieAndLocalHost()) {
            toast.error(`Can't do this, you are not logged in person.`, {
                action: {
                    label: 'LogIn',
                    onClick: () => {
                        window.scroll(0, 0)
                        navigate("/login");
                    }
                },
            });
            logined = false
        }

        return logined
    }



    function postReviewHandler() {

        if (inputReviewData.stars === 0 || inputReviewData.comment === "") {

            toast.error(`Give comment and stars, both should given.`);

            return
        }


        // // // FN calling to check Login ---->
        if (!checkUserIsLogInEd()) return


        // // // check is user logIn or not ----------->


        // // // now call dispatch here --------->

        dispatch(createNewReview({ comment: inputReviewData.comment, stars: inputReviewData.stars, productID: singleProductData.id }))

    }



    function updateReviewHandler() {

        if (inputReviewData.comment === "") {

            toast.error(`Comment can't empty for update.`);

            return
        }


        // // // FN calling to check Login ---->
        if (!checkUserIsLogInEd()) return


        // // // check is user logIn or not ----------->

        // // // now call dispatch here --------->

        dispatch(updateReview({ comment: inputReviewData.comment, stars: inputReviewData.stars, reviewId: updateReviewId }))

    }



    function submitEmoji(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, emoji: string) {

        e.stopPropagation();
        e.preventDefault();

        // console.log(s)


        dispatch(setReviewData({ data: { ...inputReviewData, comment: inputReviewData.comment + `${emoji}` } }))


    }




    // // // No Need of this different logic implemented with isFullFilled see ReviewSlice and ReviewDiv Comp.
    // useEffect(() => {

    //     // // // Here controlling reload of page , on successful new review post ----->

    //     if (isReviewDone) {
    //         location.reload();
    //     }

    // }, [isReviewDone])





    return (
        <>



            {

                // // // Here checking actual data is come or not ----->
                singleProductData && (singleProductData.images.length > 0)
                    ?

                    <div className={`mt-5 my-4 border p-2 sm:px-3 rounded border-green-300 relative ${!themeMode ? "bg-blue-50" : "bg-blue-950"} `}>

                        {/* Loader code -------> */}
                        {/* <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100">
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
                        </div> */}


                        <label
                            htmlFor="new_review_text_area"
                            className=" text-lg block hover:cursor-pointer"
                        >
                            {
                                !reviewUpdateState
                                    ? "Give new review"
                                    : "Update old review"

                            }
                        </label>

                        <textarea
                            name="" id="new_review_text_area"
                            onChange={(e) => { e.stopPropagation(); e.preventDefault(); dispatch(setReviewData({ data: { ...inputReviewData, comment: e.target.value } })) }}
                            value={inputReviewData.comment}
                            placeholder="Nice product 😊(Your new review)"
                            cols={25} rows={2}
                            className={`resize-none rounded p-1 ${!themeMode ? " bg-white text-gray-900 border-black " : "bg-gray-900 text-white border-white"} border-black z-10 `}
                        ></textarea>


                        {/* Emojies Div ----> */}
                        <div className={`border  rounded-b -mt-2 mb-1 flex justify-center ${!themeMode ? "bg-white border-black" : "bg-black border-white"} flex justify-between `}>
                            <p className=" opacity-80 hover:cursor-pointer hover:bg-blue-400" onClick={(e) => { submitEmoji(e, "👍") }} >👍</p>
                            <p className=" opacity-80 hover:cursor-pointer hover:bg-blue-400" onClick={(e) => { submitEmoji(e, "😍") }} >😍</p>
                            <p className="opacity-80 hover:cursor-pointer hover:bg-blue-400" onClick={(e) => { submitEmoji(e, "😱") }} >😱</p>
                            <p className="opacity-80 hover:cursor-pointer hover:bg-blue-400" onClick={(e) => { submitEmoji(e, "❤️") }} >❤️</p>
                            <p className=" opacity-80 hover:cursor-pointer hover:bg-blue-400" onClick={(e) => { submitEmoji(e, "👌") }} >👌</p>
                            <p className=" opacity-80 hover:cursor-pointer hover:bg-blue-400" onClick={(e) => { submitEmoji(e, "👎") }} >👎</p>
                            <p className=" opacity-80 hover:cursor-pointer hover:bg-blue-400" onClick={(e) => { submitEmoji(e, "👏") }} >👏</p>
                            <p className=" opacity-80 hover:cursor-pointer hover:bg-blue-400" onClick={(e) => { submitEmoji(e, "🛒") }} >🛒</p>
                            <p className=" opacity-80 hover:cursor-pointer hover:bg-blue-400" onClick={(e) => { submitEmoji(e, "✅") }} >✅</p>
                        </div>

                        {/* Stars input ---> */}
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center '>

                                {

                                    Array.from(Array(5)).map((item, i) => {
                                        return (
                                            <StarIcon
                                                // onChange={ ()=>setNewReviw({...newReview , stars : i+1}) }
                                                onClick={(e) => { e.stopPropagation(); e.preventDefault(); dispatch(setReviewData({ data: { ...inputReviewData, stars: i + 1 } })) }}
                                                key={i} id={item}
                                                className={` h-6 w-6 flex-shrink-0 hover:cursor-pointer ${(inputReviewData.stars >= i + 1) ? "text-yellow-500" : "text-gray-300"} `}
                                            />
                                        )
                                    })

                                }

                                <h1 className="font-bold text-xl ml-1">{inputReviewData.stars}</h1>

                            </div>

                            <div>

                                {
                                    !isLoading
                                    &&


                                    <>
                                        {
                                            !reviewUpdateState

                                                ?

                                                <button
                                                    className='px-1 border rounded bg-green-600 text-white font-bold'
                                                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); postReviewHandler() }}
                                                >+New</button>

                                                :

                                                <button
                                                    className=' border rounded bg-blue-600 text-white font-bold'
                                                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); updateReviewHandler() }}
                                                >↑Update</button>
                                        }
                                    </>
                                }

                            </div>

                        </div>

                    </div>

                    :

                    <div className={` w-60 h-32 mt-5 border p-2 px-3 rounded border-green-300 relative ${!themeMode ? "bg-blue-50" : "bg-blue-950"}  ${isLoading && " opacity-50"} `}></div>

            }







        </>
    )
}

export default PostReview
