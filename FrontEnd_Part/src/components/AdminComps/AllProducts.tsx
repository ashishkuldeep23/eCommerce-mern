import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useEffect, useState } from "react"
import { adminDataState, getAllProductAdmin, setProductData, setUpdatingProduct, updateProductAdmin } from "../../Slices/AdminSlice"
import { useNavigate } from "react-router-dom"
import { fetchOneProductByID, setSingleProductData } from "../../Slices/AllProductSlice"
import { IProduct } from "../ProductListing/ProductLists"




export default function AllProducts() {

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const dispatch = useDispatch<AppDispatch>()

    const { allProduct } = adminDataState()


    useEffect(() => {
        dispatch(getAllProductAdmin())
    }, [])

    return (
        <>
            <div className={` w-full smm:w-10/12 sm:w-3/4  md:w-3/4 my-5 py-2 px-1.5 rounded border ${themeMode ? "bg-lime-950  border-white " : "bg-lime-100 border-black"}`}>

                <div>
                    <h1 className=" text-3xl text-center">All product data</h1>
                </div>


                <ul role="list" className={`divide-y ${themeMode ? " divide-slate-100 " : "divide-slate-900"} `}>
                    {

                        allProduct.length > 0

                            ?
                            allProduct.map((product) => {
                                return <SingleUIData key={product.id} product={product} />
                            })
                            :
                            <li>Getting all products data</li>
                    }

                </ul>

            </div>
        </>

    )
}


// // // This from will store from data --->
// const formData = new FormData()


function SingleUIData({ product }: { product: IProduct }) {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    const [seeDetails, setSeeDetails] = useState(false)


    type TValueOfOptionBased = "delete" | "live"

    const [arrOfOptions, setArrOfOptions] = useState<[TValueOfOptionBased, TValueOfOptionBased]>(["delete", 'live'])


    function selectForDeleteHandler(e: React.ChangeEvent<HTMLSelectElement>) {

        // console.log(e.target.value)
        // alert("fsfdhgdsgsd")

        let makeDeleteVaue = (e.target.value === "delete") ? true : false

        const formData = new FormData()

        formData.set("whatUpadte", "makeDelete")
        formData.set("productId", `${product.id}`)
        formData.set("isDeleted", `${makeDeleteVaue}`)

        dispatch(updateProductAdmin(formData))
    }


    function upadteHighLioghtHandler() {

        const formData = new FormData()

        formData.set("whatUpadte", "highlight")
        formData.set("productId", `${product.id}`)
        formData.set("isHighlight", `${!product.isHighlight}`)

        dispatch(updateProductAdmin(formData))

    }


    // // // Here creating select value according to value of isDelete --->
    useEffect(() => {

        // console.log(product.isDeleted)
        // console.log("Render product -->")

        // let firstValueOfOptionBased: TValueOfOptionBased = product.isDeleted ? "delete" : 'live'
        // let secondValueOfOptionBased: TValueOfOptionBased = !product.isDeleted ? "delete" : 'live'
        // setArrOfOptions([firstValueOfOptionBased, secondValueOfOptionBased])


        if (!product.isDeleted) {
            setArrOfOptions(["live", "delete"])
        } else {
            setArrOfOptions(["delete", "live"])
        }


    }, [product])



    return (
        <>
            <li
                key={product.id}
                className="flex flex-col  justify-between gap-x-6 py-5"
            >

                <div className=" w-full flex flex-wrap justify-end xsm:justify-between">

                    <div
                        className="smm:flex items-center justify-between smm:w-1/2"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product.id}`);
                            dispatch(setSingleProductData({ id: product.id }));
                            dispatch(fetchOneProductByID({ productId: product.id }));
                            // dispatch(setSingleOProductId({ id: product.id })); 
                            window.scroll(0, 0);
                        }}
                    >


                        <div className="flex min-w-0 gap-x-4">
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={product.thumbnail} alt="" />

                            <div className="min-w-0 flex-auto" >
                                <p className=" capitalize text-sm font-semibold leading-6">{product.title}</p>
                                <p className=" capitalize mt-0.5 truncate text-xs leading-4">{product.brand}</p>
                                <p className=" capitalize mt-0.5 truncate text-xs leading-4">{product.category}</p>
                            </div>

                        </div>


                        <div className=" mt-2 flex flex-col justify-end items-center">
                            <button
                                className=" border px-0.5 rounded"
                                onClick={(e) => { e.stopPropagation(); setSeeDetails(!seeDetails) }}
                            >  See details</button>
                        </div>

                    </div>


                    <div className=" flex flex-col justify-between items-end ml-auto">

                        <div className=" flex">

                            <p>Discount : {product.discountPercentage}% | </p>
                            <p>Price : ₹{(Math.round(product.price - ((product.discountPercentage * product.price) / 100)))}</p>
                        </div>

                        {/* <p>{JSON.stringify(product.isDeleted)}</p> */}
                        <div className=" flex items-center flex-wrap justify-end ">


                            <select
                                name="" id=""
                                className=" border rounded px-0.5 mx-1 bg-transparent"
                                onChange={(e) => { selectForDeleteHandler(e) }}
                                value={arrOfOptions[0]}
                            >



                                {
                                    arrOfOptions.map((ele, i) => {
                                        return <option
                                            key={i}
                                            onClick={() => { console.log("not remove this line", ele) }}
                                            className="bg-transparent text-black"
                                            // value={isProductDeleted && i===0 ? 'delete' : 'live'}
                                            // value={(isProductDeleted === true && i === 0) ? 'delete' : (isProductDeleted === false && i === 0) ? 'live' : "delete"}
                                            value={ele}
                                        >

                                            {
                                                ele === "delete"
                                                    ? "🔻Deleted"
                                                    : "🟢Live"
                                            }

                                        </option>
                                    })
                                }


                            </select>

                            <p
                                className=" w-6 border border-yellow-700 rounded px-0.5 mx-1 hover:cursor-pointer"
                                onClick={() => { upadteHighLioghtHandler() }}
                            >{product.isHighlight ? <span><i className="ri-star-fill text-yellow-400"></i></span> : <span><i className="ri-star-line"></i></span>}</p>

                            <p
                                className=" w-6 border rounded px-0.5 mx-1 hover:cursor-pointer"
                                onClick={() => {
                                    dispatch(setProductData(product));
                                    dispatch(setUpdatingProduct(true))
                                }}
                            ><i className="ri-pencil-fill"></i></p>

                        </div>

                    </div>

                </div>


                <div
                    className={` overflow-hidden  `}
                >

                    {

                        seeDetails
                        &&

                        <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, minima recusandae doloribus fuga alias unde quisquam eaque similique non laboriosam numquam. Veniam similique optio tenetur consequatur nisi tempore doloribus labore quod, molestiae placeat officiis hic suscipit dolorem voluptas non quis? Repudiandae, doloribus debitis! Quidem, ullam nemo. Magnam, minus in quibusdam veniam reiciendis impedit rem? Ex aliquid molestiae veritatis modi consequuntur voluptatum delectus commodi? In, modi? Qui facere fuga, assumenda aspernatur voluptatem recusandae blanditiis quam! Dicta repudiandae doloremque nisi hic harum assumenda exercitationem totam id minus, beatae ipsam dolores ab modi deleniti aut repellendus necessitatibus maxime voluptate. Nisi facilis illum commodi.</p>


                    }

                </div>


            </li>
        </>
    )

}



