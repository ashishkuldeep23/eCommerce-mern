import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { addItemInCart } from '../../Slices/CartSlice'
import { toast } from "react-toastify"
import 'react-toastify/ReactToastify.css';
import SingleProduct from '../ProductListing/SingleProduct'
import { useNavigate } from 'react-router-dom'
import { fetchOneProductByID } from '../../Slices/AllProductSlice'
import PostReview from './PostReview'
import SingleReview from './SingleReview'





export type ReviewData = {

    "userData": {
        "userName": string,
        "userImg": string,
        "userUID": string,
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



type TypeObject = {
    typeName: string[],
    typeStock: number,
    typeVerity: string[],
    isChanged: boolean
}




export default function ProductDetails() {


    const [type, setType] = useState<TypeObject>({
        typeName: [""],
        typeVerity: [""],
        typeStock: 0,
        isChanged: false    // // // Just to check option chenged or not
    })

    // console.log(type)


    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()


    // const [productDetailByApi , setProductDetailByApi] = useState([])


    const singleProductData = useSelector((store: RootState) => store.allProductWithCatReducer.singleProductData)

    const productId = useSelector((store: RootState) => store.allProductWithCatReducer.singleProductId)

    const simmilarProducts = useSelector((store: RootState) => store.allProductWithCatReducer.simmilarProductWithOnePro)

    const isLoading = useSelector((state: RootState) => state.reviewReducer.isLoading)

    // const singleProductData = []

    // const cardData = useSelector((state : RootState) => state.CartReducer.cartData)

    // console.log(singleProductData)


    // // // // Add to cart fn --->
    function addToCartHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        // console.log(singleProductData)

        e.stopPropagation();
        // e.preventDefault();

        const { id, title, price } = singleProductData

        if (!id && !title && !price) {
            console.log("Page is Empty , go to home and try again");

            toast.error(`Page is Empty , go to home and try again , GoTo Home`, {
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


        if (!type.isChanged) {
            console.log("Option not changed.");

            toast.error(`Please choose one in available option.`, {
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

        // console.log(singleProductData)

        let newObjWithType = { ...singleProductData, type: type }

        // console.log(newObjWithType)


        let addaleCartItem = { ...newObjWithType, quantity: 1, verity: { ...type } }

        dispatch(addItemInCart(addaleCartItem))    // // // Adding into cart state

        // localStorage.setItem("cardData", JSON.stringify([...cardData , addaleCartItem ]))

        // // Sending Alert
        toast.success(`${title}, added in cart`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });


    }



    // const mainDivRef = useRef<HTMLDivElement>(null)  // // Generics should given outerwise it will give err.
    // // // Type is imprtant of useRef ----> (Above will remove null error)

    useEffect(() => {


        window.scroll(0, 0)   // // // This line is responsibil for scrooling the window


        // console.log(productId)
        /// // // This if check any data present in store with productId ----> (if not)
        if (!productId) {
            // alert("Goood to go chief")

            let getIdOfProductLastView = localStorage.getItem("singleProductId")

            // // // // If product id saved in localhost then go inside or not.
            if (getIdOfProductLastView) {

                getIdOfProductLastView = JSON.parse(getIdOfProductLastView)

                // console.log(getIdOfProductLastView)

                // // // Here checking data is present in store or not ---->
                if (singleProductData.images.length === 0) {

                    getIdOfProductLastView && dispatch(fetchOneProductByID({ productId: getIdOfProductLastView }))
                }

            }

        }



        // console.log("Calling Backend...")
    }, [singleProductData])

    return (

        <>


            <div
                className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} w-full relative`}

            >

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
                            <div className="grid  gap-1 grid-cols-2 lg:w-3/5">

                                {
                                    (singleProductData && singleProductData.images.length > 0)
                                        ?

                                        singleProductData.images.map((image, i) => {
                                            return (
                                                <div key={i}>
                                                    <img
                                                        src={image}
                                                        alt={singleProductData.title}
                                                        className="h-full w-full rounded object-cover object-center hover:scale-95 transition-all"
                                                    />
                                                </div>
                                            )

                                        })



                                        :
                                        <>
                                            <div className='flex flex-wrap gap-2 justify-center  col-span-4' >
                                                <img
                                                    className='border rounded hover:scale-95 transition-all'
                                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3XKEJqpEWVLFp2gWAKNHFoarWaOReT23c4b8nWb7&s' />
                                                <img
                                                    className='border rounded hover:scale-95 transition-all'
                                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3XKEJqpEWVLFp2gWAKNHFoarWaOReT23c4b8nWb7&s' />
                                                <img className='border rounded hover:scale-95 transition-all'
                                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3XKEJqpEWVLFp2gWAKNHFoarWaOReT23c4b8nWb7&s' />
                                                <img className='border rounded hover:scale-95 transition-all'
                                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3XKEJqpEWVLFp2gWAKNHFoarWaOReT23c4b8nWb7&s' />
                                            </div>
                                        </>

                                }



                            </div>

                            {/* About and Option div of product */}
                            <div className="mt-4 lg:row-span-3   flex flex-col justify-center lg:w-2/5 lg:ml-5 lg:mt-10">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight  font-bold capitalize underline">{singleProductData && singleProductData.title}</p>
                                {/* <p className="text-3xl tracking-tight ">₹{singleProductData.price}</p> */}

                                {
                                    singleProductData && singleProductData.discountPercentage
                                        ?
                                        <p className={`text-2xl text-start font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> <span className=' text-sm font-thin line-through'>₹{singleProductData.price}</span> ₹{(Math.round(singleProductData.price - ((singleProductData.discountPercentage * singleProductData.price) / 100)))}</p>

                                        :
                                        <p className={`text-lg text-end font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> ₹{singleProductData && singleProductData.price} </p>

                                }


                                {/* Review div start here ----> */}
                                <div className="mt-6">
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
                                        <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            {singleProductData?.review?.length} reviews
                                        </p>


                                    </div>
                                </div>


                                {/* Available types div */}
                                <div className="mt-10">

                                    <div>

                                        <h3 className="text-sm font-medium capitalize "> Available options  </h3>

                                        {/* <p>{JSON.stringify(type)}</p> */}
                                        <form >{

                                            // // // Mapping all option --->

                                            singleProductData?.type?.map((item, i) => {
                                                return <div className='my-2' key={i}>

                                                    <input type="radio" name="type" id={`type${i}`} onChange={() => { setType({ ...item, isChanged: true }) }} />

                                                    <label

                                                        className=' font-semibold mx-2 px-2 border border-blue-600 rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white capitalize  inline-flex  items-start'

                                                        htmlFor={`type${i}`}
                                                    >{`${item.typeName[0]} :  ${item.typeName[1]} | ${item.typeVerity[0]} : ${item.typeVerity[1]} | Stocks : ${item.typeStock}`}</label>

                                                </div>
                                            })

                                        }
                                        </form>


                                    </div>


                                    <div>

                                    </div>


                                    <button
                                        type="submit"
                                        className="mt-10 flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  lg:w-3/4"
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCartHandler(e) }}
                                    >
                                        Add to Cart
                                    </button>

                                </div>


                            </div>

                        </div>



                        {/* This is the code for project details (Detail wala) */}
                        {/* Product info */}
                        <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8  lg:pt-16  " >

                            <div className="lg:col-span-2 lg:pr-8 ">
                                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl capitalize underline">{singleProductData && singleProductData.title}</h1>
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
                                                {singleProductData && singleProductData.description?.highLights.map((highlight, i) => (
                                                    <li key={i}>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
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
                                <div className={` lg:w-1/2 flex flex-col items-start lg:items-center my-10 lg:h-5/6 lg:overflow-x-scroll relative ${isLoading && " opacity-50"} `}>




                                    {/* Loader code -------> */}
                                    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 scale-200 z-10">
                                        {
                                            isLoading
                                            &&

                                            <div role="status">
                                                <svg aria-hidden="true" className="inline w-20 h-20  text-transparent animate-spin fill-red-600 opacity-100 " viewBox="0 0 100 101" fill="none" >
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </div>
                                        }
                                    </div>


                                    <h3 className="text-3xl font-bold underline lg:text-center ">Create new Review</h3>
                                    {/* Create new review form ----> */}
                                    {/* <h1 className=' text-lg'>Create Review</h1> */}
                                    <PostReview />


                                    <div className="mt-10">
                                        <h3 className="text-3xl font-bold underline lg:text-center ">All Reviews</h3>

                                        {/* All Review div ----> */}
                                        <div className='flex flex-wrap my-5 lg:justify-center'>


                                            {
                                                singleProductData && singleProductData.review && singleProductData?.review?.length > 0
                                                    ?
                                                    singleProductData?.review?.map((reviewData: ReviewData) => <SingleReview reviewData={reviewData} key={reviewData.id} />)

                                                    : "No review found for this product"
                                            }

                                        </div>



                                        {
                                            // // // Total Avg Show in last of reviews --->
                                            singleProductData?.review && singleProductData?.review?.length > 0
                                            &&
                                            <div>
                                                <p
                                                    className=' underline block text-center'
                                                > Total Stars <strong>{singleProductData.rating.avgRating}</strong> | Total Reviews <strong>{singleProductData.rating.totalPerson}</strong> | Avg Rating <strong>{(singleProductData.rating.avgRating / singleProductData.rating.totalPerson).toFixed(1)}</strong></p>
                                            </div>

                                        }


                                    </div>

                                </div>



                            </div>


                        </div>




                        {/* div for simmilar products  */}

                        <div className="mx-auto max-w-2xl  pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8  lg:pb-24   ">


                            <div className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} pr-0`} >

                                <div className="mx-auto px-0  lg:px-4  lg:max-w-7xl flex flex-col ">

                                    <h1 className=' text-xl  my-5 font-bold underline'>Simmilar products</h1>

                                    <div className="h-96 flex flex-wrap flex-col overflow-y-hidden overflow-x-auto  pb-3 ">




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
