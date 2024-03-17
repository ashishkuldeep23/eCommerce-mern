import { useEffect, useRef, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { addItemInCart } from '../../Slices/CartSlice'
import { toast } from "sonner"
import SingleProduct from '../ProductListing/SingleProduct'
import { useNavigate } from 'react-router-dom'
import { dislikeProduct, fetchOneProductByID, likeProduct } from '../../Slices/AllProductSlice'
import ReviewDivBoth from './ReviewDivBoth'
// import { setChildrenModal, setOpenMoadl } from '../../Slices/ModalSlice'
import { addOrRemoveWishList, userState } from '../../Slices/UserSlice'
import { LikeBtnDoubleClick } from './LikeBtnDoubleClick'
import { useParams } from 'react-router-dom';
import { setProductData, setUpdatingProduct } from '../../Slices/AdminSliceFile'
import ProductImagesDiv from './ProductImagesDiv'
import { setChildrenModal, setOpenMoadl } from '../../Slices/ModalSlice'



export type ReviewData = {

    "userData": {
        "userName": string,
        "userImg": string,
        "userUID": string,
    },

    "userId": {
        firstName: string,
        lastName: string,
        id: string,
        profilePic: string
    },

    "productName": string,
    "comment": string,

    "stars": number,
    "likes": number,
    "dislikes": number,
    "id": string,
    "whenCreated": string,
    "likedUserIds": string[],
    "dislikedUserIds": string[]
}


export type TypeObject = {
    typeName: string[],
    typeStock: number,
    typeVerity: string[],
    typePrice: number
    isChanged: boolean
}


export default function ProductDetails() {


    const [type, setType] = useState<TypeObject>({
        typeName: [""],
        typeVerity: [""],
        typePrice: 0,
        typeStock: 0,
        isChanged: false    // // // Just to check option chenged or not
    })

    // console.log(type)

    const [doubleClickLike, setDoubleClickLike] = useState<boolean>(false)

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const params = useParams();

    // const reiewRef = useRef<HTMLElement>(null)

    const { userData } = userState()

    const singleProductData = useSelector((store: RootState) => store.allProductWithCatReducer.singleProductData)

    const simmilarProducts = useSelector((store: RootState) => store.allProductWithCatReducer.simmilarProductWithOnePro)

    const userDataId = userState().userData.id

    const reviewRef = useRef<HTMLDivElement>(null)

    // // // // Add to cart fn --->
    function addToCartHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        // console.log(singleProductData)

        // console.log(type)


        e.stopPropagation();
        // e.preventDefault();

        const { id, title, price } = singleProductData

        if (!id && !title && !price) {
            console.log("Page is Empty , go to home and try again");

            toast.error(`Page is Empty , go to home and try again , GoTo Home`);

            return


        }



        // // // Check user choosed type or not -->
        if (!type.isChanged) {
            console.log("Option not changed.");

            toast.error(`Please choose one in available option.`);

            return
        }

        // console.log(singleProductData)

        let newObjWithType = { ...singleProductData, type: type, price: (Math.round(type.typePrice - ((singleProductData.discountPercentage * type.typePrice) / 100))) }

        // console.log(newObjWithType)


        let addaleCartItem = { ...newObjWithType, quantity: 1, verity: { ...type } }

        dispatch(addItemInCart(addaleCartItem))    // // // Adding into cart state

        // localStorage.setItem("cardData", JSON.stringify([...cardData , addaleCartItem ]))

        // // Sending Alert
        // toast.success(`${title}, added in cart`);
        toast.success(`${title}, added in cart.`, {
            action: {
                label: 'Goto🛒',
                onClick: () => {
                    window.scroll(0, 0)
                    navigate("/cart");
                }
            },
        });


    }


    function productLikeHandler(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
        e.stopPropagation();

        if (!singleProductData?.likedUserIds?.includes(userDataId)) {

            dispatch(likeProduct({ productId: singleProductData.id, isLiking: true, userId: userDataId }))

            animationCodeForLike() // // // show the animation for like now --->
        } else {

            dispatch(likeProduct({ productId: singleProductData.id, isLiking: false, userId: userDataId }))
        }

    }


    function productDislikeHandler(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
        e.stopPropagation();


        if (!singleProductData?.dislikedUserIds?.includes(userDataId)) {

            dispatch(dislikeProduct({ productId: singleProductData.id, isDisliking: true, userId: userDataId }))
        } else {

            dispatch(dislikeProduct({ productId: singleProductData.id, isDisliking: false, userId: userDataId }))
        }

    }


    function doubleClickHandler(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {

        e.stopPropagation();

        if (!singleProductData?.likedUserIds?.includes(userDataId)) {
            // // // Below code is responsiable for like product ---->
            productLikeHandler(e)

        }

    }


    // // // Below code is used to show animation ---->
    function animationCodeForLike() {
        setDoubleClickLike(true)

        setTimeout(() => {
            setDoubleClickLike(false)
        }, 1000)
    }



    // // // Add to wish list handler
    function addOrRemovetoWishListHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        event.stopPropagation()

        // console.log(singleProductData)
        // console.log(singleProductData.id)
        // alert("Done")

        dispatch(addOrRemoveWishList({ productId: `${singleProductData.id}` }))


    }


    // // // Share product handler --->

    function shareLinkOfProduct() {

        let url = window.location.href

        console.log(url)


        let ChildrenOfModal = <div>

            <div className='border bg-white px-2 rounded text-gray-600 flex gap-1 flex-wrap'>

                <p className='text-center mt-1 font-bold '>{url}</p>
                <button
                    className='text-xl'
                    onClick={async (e) => {
                        e.stopPropagation();
                        try {
                            await navigator.clipboard.writeText(`${url}`);
                            console.log('Product link copied to clipboard');
                            /* Resolved - text copied to clipboard successfully */
                        } catch (err) {
                            console.error('Failed to copy: ', err);
                            /* Rejected - text failed to copy to the clipboard */
                        }
                    }}
                >
                    <i className="ri-file-copy-2-line"></i>
                </button>
            </div>
            <p className='text-center mt-1 font-bold underline'>{singleProductData.title}</p>
        </div>

        dispatch(setOpenMoadl(true))
        dispatch(setChildrenModal(ChildrenOfModal))
    }



    // const mainDivRef = useRef<HTMLDivElement>(null)  // // Generics should given outerwise it will give err.
    // // // Type is imprtant of useRef ----> (Above will remove null error)

    useEffect(() => {


        // console.log(params)


        // // // No need to srool window in useEffect of singleProduct , i have added this in on click --->
        // if (!reviewIsFullFilled) {
        //     window.scroll(0, 0)   // // // This line is responsibil for scrooling the window
        // }


        // console.log(productId)
        /// // // This if check any data present in store with productId ----> (if not)


        // if (!productId) {
        //     // alert("Goood to go chief")

        //     let getIdOfProductLastView = localStorage.getItem("singleProductId")

        //     // // // // If product id saved in localhost then go inside or not.
        //     if (getIdOfProductLastView) {

        //         getIdOfProductLastView = JSON.parse(getIdOfProductLastView)

        //         // console.log(getIdOfProductLastView)

        //         // // // Here checking data is present in store or not ---->
        //         if (singleProductData.images.length === 0) {

        //             getIdOfProductLastView && params.id && dispatch(fetchOneProductByID({ productId: params.id }))
        //         }

        //     }

        // }



        // // // Previously using Above code but now no need of that (becoz now using useParam hook of react router dom) ---->

        params.id && dispatch(fetchOneProductByID({ productId: params.id }))


        // console.log("Calling Backend...")
    }, [])



    return (

        <>

            <div
                className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} w-full relative`}

            >


                {
                    userData.role === "admin"
                    &&
                    <span
                        className={`z-10 sticky top-16  left-full px-2 py-1 border border-green-400 m-2 rounded  ${!themeMode ? "bg-white " : "bg-black "}`}
                        onClick={() => {
                            navigate("/admin")
                            dispatch(setProductData(singleProductData));
                            dispatch(setUpdatingProduct(true));
                        }}
                    >
                        <span className=' font-semibold'>Edit</span> <i className="ri-pencil-line"></i>
                    </span>
                }


                <div className="mx-auto max-w-full  lg:max-w-allAk px-1  lg:px-8">
                    <div className="pt-6 ">


                        {/* This will come when data not come by some reason ----> */}

                        {
                            (singleProductData && singleProductData.images.length == 0)
                            &&
                            <div className='w-full text-center font-bold text-xl flex flex-col items-center justify-center '>

                                <div
                                    onClick={() => location.reload()}
                                    className='my-1 inline-flex bg-green-700 border border-green-300 text-white px-1 rounded hover:cursor-pointer'
                                >
                                    <i className="ri-loop-left-line mx-1"></i>
                                    <p>Reload same page.</p>
                                </div>

                                <div
                                    onClick={() => navigate("/")}
                                    className=' my-1 inline-flex bg-green-700 border border-green-300 text-white px-1 rounded hover:cursor-pointer'
                                >
                                    <i className="ri-home-4-line mx-1"></i>
                                    <p>Unable to fetch data, please go home.</p>
                                </div>

                            </div>

                        }


                        {/* Image gallery with about product */}
                        <div className="mx-auto max-w-2xl px-2 pt-10 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8  lg:pt-16  block lg:flex lg:items-start">

                            {/* Image div here */}

                            <ProductImagesDiv />

                            {/* About and Option div of product */}
                            {/* Add to cart and add to wishlist btns present ---------> */}
                            <div className="mt-4 lg:row-span-3 flex flex-col justify-center lg:w-2/5 lg:ml-5 lg:mt-10">
                                <h2 className="sr-only">Product information</h2>

                                {/* Product name price and like btn */}
                                <div
                                    className='relative'
                                    onDoubleClick={(e) => doubleClickHandler(e)}
                                >

                                    {/* Show on double click  */}
                                    <LikeBtnDoubleClick doubleClickLike={doubleClickLike} left={false} />


                                    {/* Product name and price div */}
                                    <div >

                                        <p className="text-3xl tracking-tight  font-bold capitalize underline">{singleProductData && singleProductData.title}</p>
                                        {/* <p className="text-3xl tracking-tight ">₹{singleProductData.price}</p> */}

                                        {
                                            singleProductData && singleProductData.discountPercentage
                                                ?
                                                <p className={`text-2xl text-start font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> <span className=' text-sm font-thin line-through'>₹{singleProductData.price}</span> ₹{(Math.round(singleProductData.price - ((singleProductData.discountPercentage * singleProductData.price) / 100)))}</p>

                                                :
                                                <p className={`text-lg text-end font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> ₹{singleProductData && singleProductData.price} </p>

                                        }

                                    </div>


                                    {/* Product like and dislike btn ----> */}
                                    <div className='flex items-center w-4/5 mt-5'>


                                        <p
                                            className={`border px-3 mr-3 rounded text-2xl hover:cursor-pointer hover:bg-blue-200 ${singleProductData?.likedUserIds?.includes(userDataId) && 'text-blue-400'}  `}
                                            onClick={(e) => { productLikeHandler(e) }}
                                        >
                                            <i
                                                className={`ri-thumb-up-fill  ${singleProductData?.likedUserIds?.includes(userDataId) ? 'text-blue-400' : "text-gray-300"} `}
                                            ></i> {singleProductData?.likes || 0}
                                        </p>

                                        <p
                                            className={`border px-3 rounded text-2xl hover:cursor-pointer hover:bg-red-200 ${singleProductData?.dislikedUserIds?.includes(userDataId) && 'text-red-400'}  `}
                                            onClick={(e) => { productDislikeHandler(e) }}
                                        >
                                            <i
                                                className={`ri-thumb-down-fill ${singleProductData?.dislikedUserIds?.includes(userDataId) ? 'text-red-400' : "text-gray-300"} `}
                                            ></i> {singleProductData?.dislikes || 0}
                                        </p>

                                        {/* Product Share div */}
                                        <div className='ml-3'>

                                            <button
                                                className={`border px-3 rounded text-2xl hover:cursor-pointer hover:bg-teal-200 `}
                                                onClick={() => { shareLinkOfProduct() }}
                                            >
                                                <i className="ri-share-forward-fill"></i>
                                            </button>
                                        </div>

                                    </div>
                                </div>


                                {/* Review div start here ----> */}
                                <div className="mt-5 "
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        (singleProductData?.rating?.totalPerson > 0) && (reviewRef.current?.getBoundingClientRect() && window.scrollTo(0, reviewRef.current?.getBoundingClientRect().top))
                                    }}
                                >
                                    <h3 className="sr-only">Reviews</h3>
                                    <div className="flex items-center">

                                        <div className="flex items-center">



                                            {

                                                Array.from(Array(5)).map((item, i) => {
                                                    return (
                                                        <StarIcon
                                                            key={i}
                                                            id={item}  // // // Id not used anyWhere 
                                                            className={` h-5 w-5 flex-shrink-0 ${i < (Math.floor(singleProductData?.rating?.avgRating / singleProductData?.rating?.totalPerson)) ? `${!themeMode ? "text-yellow-400" : "text-gray-50"}` : `${!themeMode ? "text-gray-300" : "text-gray-600"}`} `}
                                                        />
                                                    )
                                                })
                                            }
                                            <p className=' font-bold pl-1'>{singleProductData?.rating?.totalPerson > 0 && (singleProductData?.rating?.avgRating / singleProductData?.rating?.totalPerson).toFixed(1)}</p>
                                        </div>



                                        {/* </div> */}
                                        <p
                                            className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            {singleProductData?.review?.length} reviews
                                        </p>


                                    </div>
                                </div>



                                {/* Available types div and add to cart btn ---> */}
                                <div className="mt-5">

                                    <div>

                                        <h3 className="text-sm font-medium capitalize "> Available options  </h3>

                                        {/* <p>{JSON.stringify(type)}</p> */}
                                        <form >{

                                            // // // Mapping all option --->

                                            singleProductData?.type?.map((item: TypeObject, i) => {
                                                return <div className='my-2' key={i}>

                                                    <input type="radio" name="type" id={`type${i}`} onChange={() => { setType({ ...item, isChanged: true }) }} />

                                                    <label

                                                        className=' font-semibold mx-2 px-2 border border-blue-600 rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white capitalize  inline-flex  items-start'

                                                        htmlFor={`type${i}`}
                                                    >{`${item.typeName[0]} :  ${item.typeName[1]} | ${item.typeVerity[0]} : ${item.typeVerity[1]} | Stocks : ${item.typeStock} | Price : ₹${(Math.round(item.typePrice - ((singleProductData.discountPercentage * item.typePrice) / 100)))}`}</label>


                                                </div>
                                            })

                                        }
                                        </form>


                                    </div>

                                    {/* Add to cart */}
                                    <button
                                        type="submit"
                                        className="mt-10 flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  lg:w-3/4"
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCartHandler(e) }}
                                    >
                                        Add to Cart
                                    </button>


                                    {/* Add to wishlist */}
                                    <button
                                        type="submit"
                                        className={`mt-4 flex w-full items-center justify-center rounded-lg border-2  px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2  focus:ring-offset-2  lg:w-3/4

                                         ${(userData.wishListIdsArr && userData.wishListIdsArr.length > 0 && userData?.wishListIdsArr?.includes(singleProductData.id.toString()))
                                                ? 'border-red-600 focus:ring-red-500 hover:border-red-700'
                                                : 'border-indigo-600 focus:ring-indigo-500 hover:border-indigo-700'
                                            }
                                    
                                        `}
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addOrRemovetoWishListHandler(e) }}
                                    >
                                        {
                                            (userData.wishListIdsArr && userData.wishListIdsArr.length > 0 && userData?.wishListIdsArr?.includes(singleProductData.id.toString()))
                                                ?
                                                <span className=' mr-[0.3rem]'>-Remove from</span>

                                                :
                                                <span className=' mr-[0.3rem]'>+Add to</span>


                                        }
                                        <span> Wish List</span>
                                    </button>

                                </div>


                            </div>

                        </div>



                        {/* This is the code for project details (Detail wala) */}
                        {/* Product info */}
                        <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8  lg:pt-16  " >

                            <div className="lg:col-span-2 lg:pr-8 ">
                                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl capitalize underline">{singleProductData && singleProductData.description?.fullName}</h1>
                            </div>


                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6 flex  justify-between flex-col lg:flex-row lg:items-start  ">



                                {/* Description and details */}

                                <div className=' lg:w-1/2  '>

                                    <div>
                                        <h3 className="sr-only">Description</h3>

                                        <div className="space-y-6">
                                            <p className="text-base ">{singleProductData && singleProductData.description?.aboutProduct}</p>
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <h3 className="text-sm font-medium ">Highlights</h3>

                                        <div className="mt-4">
                                            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                                {
                                                    singleProductData && singleProductData.description?.highLights.length
                                                        ?

                                                        singleProductData && singleProductData.description?.highLights.map((highlight, i) => (
                                                            <li key={i}>
                                                                <span>{highlight}</span>
                                                            </li>
                                                        ))

                                                        : <>
                                                            <li >
                                                                <span>{"Not Found"}</span>
                                                            </li>
                                                        </>
                                                }
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <h3 className="text-sm font-medium ">Specifications</h3>

                                        <div className="mt-4">

                                            <table>

                                                <tbody>

                                                    {singleProductData && singleProductData.description?.specifications.map((specs, i) => (
                                                        <tr className=' border-b' key={i}>
                                                            {/* {JSON.stringify(specs)} */}

                                                            <td className='pr-5 capitalize'>{`${Object.keys(specs)[0]}`}</td>
                                                            <td>{`${Object.values(specs)[0]}`}</td>

                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>



                                    <div className="mt-10">
                                        <h3 className="text-sm font-medium ">Details</h3>

                                        <div className="mt-4">

                                            <table>

                                                <tbody>

                                                    {singleProductData && singleProductData.description?.product_Details.map((specs, i) => (
                                                        <tr className=' border-b' key={i}>
                                                            {/* {JSON.stringify(specs)} */}

                                                            <td className='pr-5 capitalize'>{`${Object.keys(specs)[0]}`}</td>
                                                            <td>{`${Object.values(specs)[0]}`}</td>

                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                    <div className="mt-10">
                                        <h3 className="text-sm font-medium ">Dimensions</h3>

                                        <div className="mt-4">

                                            <table>

                                                <tbody>

                                                    {singleProductData && singleProductData.description?.dimensions.map((specs, i) => (
                                                        <tr className=' border-b' key={i}>
                                                            {/* {JSON.stringify(specs)} */}

                                                            <td className='pr-5 capitalize'>{`${Object.keys(specs)[0]}`}</td>
                                                            <td>{`${Object.values(specs)[0]}`}</td>

                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>


                                {/* Review div (Both read all and create new) --------> */}

                                <ReviewDivBoth ref={reviewRef} data="Using forword ref" />


                            </div>


                        </div>


                        {/* div for simmilar products  */}

                        <div
                            className="mx-auto max-w-2xl  pb-16 sm:px-6  lg:max-w-7xl w-full   "
                        >


                            <div className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} pr-0`} >

                                <div className="mx-auto px-0  lg:px-4  lg:max-w-7xl flex flex-col ">

                                    <h1 className='text-xl  my-5 font-bold underline'>Simmilar products</h1>

                                    <div className=" h-80 flex flex-wrap items-start flex-col overflow-y-hidden overflow-x-auto ">

                                        {

                                            simmilarProducts && (simmilarProducts.length > 0)
                                                ?

                                                simmilarProducts.map((product) => <SingleProduct product={product} key={product.id} />)
                                                :
                                                "Not getting"
                                        }

                                    </div>

                                </div>
                            </div>



                        </div>


                    </div>

                </div>

            </div>

        </>
    )
}
