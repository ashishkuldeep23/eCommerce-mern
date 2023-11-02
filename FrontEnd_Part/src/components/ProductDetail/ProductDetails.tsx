import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { addItemInCart } from '../../Slices/CartSlice'
import { toast } from "react-toastify"
import 'react-toastify/ReactToastify.css';
import SingleProduct from '../ProductListing/SingleProduct'
import { useNavigate } from 'react-router-dom'




type TypeObject = {
    typeName: string[],
    typeStock: number,
    typeVerity: string[],
    isChanged: boolean
}


type ReviewData = {

    "userData": {
        "userName": string,
        "userImg": string
    },

    "productName": string,
    "comment": string,

    "stars": number,
    "likes": number,
    "dislikes": number,
    "id": string,
    "whenCreated": string
}





export default function ProductDetails() {


    const [type, setType] = useState<TypeObject>({
        typeName: [""],
        typeVerity: [""],
        typeStock: 0,
        isChanged: false
    })

    // console.log(type)


    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()


    // const [productDetailByApi , setProductDetailByApi] = useState([])


    const productDetailByFilter = useSelector((store: RootState) => store.allProductWithCatReducer.singleProductData)

    const simmilarProducts = useSelector((store: RootState) => store.allProductWithCatReducer.simmilarProductWithOnePro)

    // const productDetailByFilter = []

    // const cardData = useSelector((state : RootState) => state.CartReducer.cartData)

    // console.log(productDetailByFilter)


    // // // // Add to cart fn --->
    function addToCartHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        // console.log(productDetailByFilter)

        e.stopPropagation();
        e.preventDefault();

        const { id, title, price } = productDetailByFilter

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

        // console.log(productDetailByFilter)

        let newObjWithType = { ...productDetailByFilter, type: type }

        // console.log(newObjWithType)


        let addaleCartItem = { ...newObjWithType, quantity: 1, verity: { a: 1 } }

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


        // console.log("Calling Backend...")
    }, [productDetailByFilter])

    return (

        <>


            <div
                className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} w-full`}

            >

                {

                    (productDetailByFilter && Object.keys(productDetailByFilter).length > 0)
                        ?
                        <div className="mx-auto max-w-full  md:max-w-allAk px-1 md:px-2 lg:px-8">
                            <div className="pt-6 ">




                                {
                                    (productDetailByFilter.images.length == 0)
                                    &&
                                    <div className='w-full text-center font-bold text-xl flex justify-center '>

                                        <div
                                            onClick={() => navigate("/")}
                                            className=' inline-flex bg-green-700 border border-green-300 text-white px-1 rounded hover:cursor-pointer'
                                        >
                                            <i className="ri-home-4-line mx-1"></i>
                                            <p>Unable to fetch data, please go home.</p>
                                        </div>

                                    </div>

                                }


                                {/* Image gallery with about product */}
                                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 ">

                                    {/* Image div here */}
                                    <div className="grid  gap-1 grid-cols-2">

                                        {
                                            (productDetailByFilter && productDetailByFilter.images.length > 0)
                                                ?

                                                productDetailByFilter.images.map((image, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <img
                                                                src={image}
                                                                alt={productDetailByFilter.title}
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

                                    {/* Options and about product */}
                                    <div className="mt-4 lg:row-span-3 lg:mt-0  flex flex-col justify-center">
                                        <h2 className="sr-only">Product information</h2>
                                        <p className="text-3xl tracking-tight  text-center font-bold capitalize underline">{productDetailByFilter.title}</p>
                                        {/* <p className="text-3xl tracking-tight ">₹{productDetailByFilter.price}</p> */}

                                        {
                                            productDetailByFilter.discountPercentage
                                                ?
                                                <p className={`text-2xl text-start font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> <span className=' text-sm font-thin line-through'>₹{productDetailByFilter.price}</span> ₹{(Math.round(productDetailByFilter.price - ((productDetailByFilter.discountPercentage * productDetailByFilter.price) / 100)))}</p>

                                                :
                                                <p className={`text-lg text-end font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> ₹{productDetailByFilter.price} </p>

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
                                                                    className={` h-5 w-5 flex-shrink-0 ${i < (Math.floor(productDetailByFilter.rating.avgRating / productDetailByFilter.rating.totalPerson)) ? `${!themeMode ? "text-gray-900" : "text-gray-200"}` : `${!themeMode ? "text-gray-300" : "text-gray-600"}`} `}
                                                                />
                                                            )
                                                        })
                                                    }
                                                    <p className=' font-bold pl-1'>{productDetailByFilter.rating.totalPerson > 0 && (Math.floor(productDetailByFilter.rating.avgRating / productDetailByFilter.rating.totalPerson))}</p>
                                                </div>



                                                {/* </div> */}
                                                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                    {productDetailByFilter?.review?.length} reviews
                                                </p>


                                            </div>
                                        </div>


                                        {/* Available types div */}
                                        <div className="mt-10">

                                            <div>

                                                <h3 className="text-sm font-medium capitalize "> Available options  </h3>



                                                {/* <p>{JSON.stringify(type)}</p> */}
                                                <form >{

                                                    productDetailByFilter?.type?.map((item, i) => {
                                                        return <div className='my-2' key={i}>

                                                            <input type="radio" name="type" id={`type${i}`} onChange={() => { setType({ ...item, isChanged: true }) }} />

                                                            <label

                                                                className=' font-semibold mx-2 px-2 border border-blue-600 rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white capitalize '

                                                                htmlFor={`type${i}`}
                                                            >{` ${item.typeName[0]} :  ${item.typeName[1]} ${item.typeVerity[0]} : ${item.typeVerity[1]} Stocks : ${item.typeStock}`}</label>

                                                        </div>
                                                    })

                                                }
                                                </form>


                                            </div>


                                            <div>

                                            </div>


                                            <button
                                                type="submit"
                                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCartHandler(e) }}
                                            >
                                                Add to Cart
                                            </button>

                                        </div>


                                    </div>

                                </div>



                                {/* This is the code for project details */}
                                {/* Product info */}
                                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16  " >
                                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl capitalize underline">{productDetailByFilter.title}</h1>
                                    </div>



                                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                        {/* Description and details */}
                                        <div>
                                            <h3 className="sr-only">Description</h3>

                                            <div className="space-y-6">
                                                <p className="text-base ">{productDetailByFilter && productDetailByFilter.description?.aboutProduct}</p>
                                            </div>
                                        </div>

                                        <div className="mt-10">
                                            <h3 className="text-sm font-medium ">Highlights</h3>

                                            <div className="mt-4">
                                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                                    {productDetailByFilter && productDetailByFilter.description?.highLights.map((highlight, i) => (
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

                                                        {productDetailByFilter && productDetailByFilter.description?.specifications.map((specs, i) => (
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

                                                        {productDetailByFilter && productDetailByFilter.description?.product_Details.map((specs, i) => (
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

                                                        {productDetailByFilter && productDetailByFilter.description?.dimensions.map((specs, i) => (
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

                                                        {productDetailByFilter && productDetailByFilter.description?.dimensions.map((specs, i) => (
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
                                            <h3 className="text-3xl font-bold underline ">Reviews</h3>



                                            <div className='flex flex-wrap  my-5'>


                                                {
                                                    productDetailByFilter.review && productDetailByFilter?.review?.length > 0
                                                        ?
                                                        productDetailByFilter?.review?.map((r: ReviewData) => (
                                                            <div className='p-1 w-60 my-4 border-l border-green-300 rounded-xl pl-2' key={r.id}>
                                                                {/* {JSON.stringify(r)} */}


                                                                <div className='flex items-center border-b border-green-300 w-4/5 '>
                                                                    <img className=' w-8 rounded-full mr-3' src={r.userData.userImg} alt="" />
                                                                    <p className=' text-2xl mr-1 font-bold'>{r.userData.userName}</p>

                                                                </div>

                                                                <div>
                                                                    <div className='flex items-center'>

                                                                        <div className='flex items-center bg-green-500 my-1 px-1 rounded'>
                                                                            <StarIcon className={` h-4 w-4 flex-shrink-0`} />
                                                                            <p >{r.stars}</p>

                                                                        </div>



                                                                        <p className='ml-2'>{r.comment}</p>

                                                                    </div>
                                                                    <div className='flex  w-4/5 my-2'>

                                                                        <p className='border px-5 mr-3 rounded '><i className="ri-thumb-up-fill"></i> {r.likes}</p>
                                                                        <p className='border px-5 rounded '><i className="ri-thumb-down-fill"></i> {r.dislikes}</p>
                                                                    </div>
                                                                    <p className='text-center'>{r.whenCreated}</p>
                                                                </div>


                                                            </div>
                                                        ))

                                                        : "Review not getting"
                                                }


                                            </div>

                                        </div>


                                    </div>


                                </div>









                                {/* div for simmilar products  */}

                                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16  ">


                                    <div className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} pr-0`} >

                                        <div className="mx-auto px-0  md:px-4  sm:px-6  lg:max-w-7xl lg:px-8   flex flex-col ">

                                            <h1 className=' text-xl  my-10 font-bold underline'>Simmilar products</h1>

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

                        :
                        <p className='text-2xl'>There is something problem </p>

                }
            </div>

        </>
    )
}
