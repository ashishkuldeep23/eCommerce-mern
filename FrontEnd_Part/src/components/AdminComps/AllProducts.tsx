import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useEffect, useState } from "react"
import { IProductAdmin, adminDataState, getAllProductAdmin } from "../../Slices/adminSlice"



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






function SingleUIData({product} : {product : IProductAdmin}) {


    const [seeDetails, setSeeDetails] = useState(false)

    return (
        <>
            <li
                key={product.id}
                className="flex flex-col  justify-between gap-x-6 py-5"
            >

                <div className=" w-full flex justify-between">


                    <div className="flex min-w-0 gap-x-4">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={product.thumbnail} alt="" />

                        <div className="min-w-0 flex-auto" >
                            <p className=" capitalize text-sm font-semibold leading-6">{product.title}</p>
                            <p className=" capitalize mt-0.5 truncate text-xs leading-4">{product.brand}</p>
                            <p className=" capitalize mt-0.5 truncate text-xs leading-4">{product.category}</p>
                        </div>

                    </div>


                    <div className=" flex flex-col justify-end items-center">




                        <button
                            className=" border px-0.5 rounded"
                            onClick={() => { setSeeDetails(!seeDetails) }}
                        >  See details</button>
                    </div>


                    <div className=" flex flex-col justify-between items-end">
                        <p>  Price : ₹{(Math.round(product.price - ((product.discountPercentage * product.price) / 100)))}</p>

                        <div className=" flex ">

                            <p className=" border rounded px-0.5 mx-1">{product.isDeleted ? <span>🔻Deleted</span> : <span>🟢Live</span>}</p>


                            <p className=" border border-yellow-700 rounded px-0.5 mx-1 hover:cursor-pointer">{product.isHighlight ? <span><i className="ri-star-fill text-yellow-400"></i></span> : <span><i className="ri-star-line"></i></span>}</p>

                            <p className=" border rounded px-0.5 mx-1 hover:cursor-pointer"><i className="ri-pencil-fill"></i></p>

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



