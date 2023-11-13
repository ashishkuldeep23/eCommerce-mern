
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { Fragment } from "react"


import SingleProduct from "./SingleProduct"
import { fetchAllCategoryAndHighlight, fetchAllProducts } from "../../Slices/AllProductSlice"



export type SingleTypeObject = {
  "typeName": string[],
  "typeStock": number,
  "typeVerity": string[],
  "typeId": string
}



export interface IProduct {


  "id": number | string;
  "title": string;
  "description"?: {
    "fullName": string;
    "aboutProduct": string;
    "highLights": string[],
    "specifications": object[],
    "product_Details": object[],
    "dimensions": object[]
  };
  "price": number;
  "discountPercentage": number;

  "type"?: SingleTypeObject[]

  "brand": string;
  "category": string;

  "rating": {
    "totalPerson": number;
    "avgRating": number;
  };

  "thumbnail": string;
  "images": string[];
  "isHighlight": boolean;

  "isDeleted": boolean;
  "review"?: []

}



export default function ProductLists() {

  const dispatch = useDispatch<AppDispatch>()


  // const [products, setProducts] = useState<IProduct[]>([])

  // const arrOfProductCat = ["smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration"]

  // const [productCategory, setProductCategory] = useState<string[]>([])


  const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

  const productCategory = useSelector((store: RootState) => store.allProductWithCatReducer.allCaegory)

  const isLoding = useSelector((state: RootState) => state.allProductWithCatReducer.isLoading)

  const products = useSelector((store: RootState) => store.allProductWithCatReducer.allProducts)

  const searchByQuery = useSelector((state: RootState) => state.allProductWithCatReducer.searchByQuery)

  const limitValue = useSelector((state: RootState) => state.allProductWithCatReducer.onePageLimit)


  const styleOfCatgioryDiv = {
    paddingRight: 0,
  }


  return (
    <div className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"}`} style={styleOfCatgioryDiv} >

      <div className="mx-auto px-0  md:px-4  sm:px-6  lg:max-w-7xl lg:px-8   flex flex-col ">


        <h2 className="sr-only">Products</h2>

        {
          isLoding && <div>Loading</div>
        }


        {

          (productCategory && productCategory.length > 0)

            ?

            productCategory.map((element, i) => {

              return (

                <Fragment key={i}>

                  <p className="pt-10 capitalize text-2xl font-bold pl-2 underline">{element}</p>

                  <div className="h-96 flex flex-wrap flex-col overflow-y-hidden overflow-x-auto my-2  pb-3 ">

                    {
                      (products.length > 0)
                        ?

                        products.filter((item) => {
                          if (item.category === element) {
                            return item;
                          }
                        })
                          .map((product, i) => (
                            <SingleProduct product={product} key={i} />
                          ))

                        : <h1>Getting data , Place skeleton here </h1>
                    }


                  </div>

                </Fragment>

              )

            })





            :

            <>

            

              <Fragment >

                <p className="pt-10 capitalize text-2xl font-bold pl-2 underline">Getting Data ....</p>

                <div className="h-96 flex flex-wrap flex-col overflow-y-hidden overflow-x-auto my-2  pb-3 ">

                  <a

                    // href={"/product"}
                    className={` border ${!themeMode ? "border-slate-300" : " border-slate-100 "}  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
                    id='singleCardHolder'
                  >
                    <div className=" rounded-lg overflow-hidden">
                      {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}


                      {/* This div present in the place of Image */}
                      <div className=" h-60 flex justify-center items-center p-1">

                        <div className=" h-full w-full rounded-lg bg-slate-300">

                          

                        </div>

                      </div>

                    </div>

                    <div className="flex justify-between pt-5  px-2 ">

                      <div>
                        {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                        <h3 
                        className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white"
                        >Loading...</h3>

                        <div className="flex items-center">

                          {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                          {/* <p>{product.rating.avgRating }</p> */}
                          {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                        </div>
                      </div>


                      <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}


                        <p className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}> <span className=' text-sm font-thin line-through'>₹000 </span> ₹000  </p>


                      </div>


                    </div>

                  </a>




                  <a

                    // href={"/product"}
                    className={` border ${!themeMode ? "border-slate-300" : " border-slate-100 "}  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
                    id='singleCardHolder'
                  >
                    <div className=" rounded-lg overflow-hidden">
                      {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}


                      {/* This div present in the place of Image */}
                      <div className=" h-60 flex justify-center items-center p-1">

                        <div className=" h-full w-full rounded-lg bg-slate-300">

                          

                        </div>

                      </div>

                    </div>

                    <div className="flex justify-between pt-5  px-2 ">

                      <div>
                        {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                        <h3 
                        className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white"
                        >Loading...</h3>

                        <div className="flex items-center">

                          {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                          {/* <p>{product.rating.avgRating }</p> */}
                          {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                        </div>
                      </div>


                      <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}


                        <p className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}> <span className=' text-sm font-thin line-through'>₹000 </span> ₹000  </p>


                      </div>


                    </div>

                  </a>




                  <a

                    // href={"/product"}
                    className={` border ${!themeMode ? "border-slate-300" : " border-slate-100 "}  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
                    id='singleCardHolder'
                  >
                    <div className=" rounded-lg overflow-hidden">
                      {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}


                      {/* This div present in the place of Image */}
                      <div className=" h-60 flex justify-center items-center p-1">

                        <div className=" h-full w-full rounded-lg bg-slate-300">

                          

                        </div>

                      </div>

                    </div>

                    <div className="flex justify-between pt-5  px-2 ">

                      <div>
                        {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                        <h3 
                        className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white"
                        >Loading...</h3>

                        <div className="flex items-center">

                          {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                          {/* <p>{product.rating.avgRating }</p> */}
                          {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                        </div>
                      </div>


                      <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}


                        <p className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}> <span className=' text-sm font-thin line-through'>₹000 </span> ₹000  </p>


                      </div>


                    </div>

                  </a>




                </div>

              </Fragment>


              
              <Fragment >

                <p className="pt-10 capitalize text-2xl font-bold pl-2 underline">Getting Data ....</p>

                <div className="h-96 flex flex-wrap flex-col overflow-y-hidden overflow-x-auto my-2  pb-3  ">

                  <a

                    // href={"/product"}
                    className={` border ${!themeMode ? "border-slate-300" : " border-slate-100 "}  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
                    id='singleCardHolder'
                  >
                    <div className=" rounded-lg overflow-hidden">
                      {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}


                      {/* This div present in the place of Image */}
                      <div className=" h-60 flex justify-center items-center p-1">

                        <div className=" h-full w-full rounded-lg bg-slate-300">

                          

                        </div>

                      </div>

                    </div>

                    <div className="flex justify-between pt-5  px-2 ">

                      <div>
                        {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                        <h3 
                        className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white"
                        >Loading...</h3>

                        <div className="flex items-center">

                          {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                          {/* <p>{product.rating.avgRating }</p> */}
                          {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                        </div>
                      </div>


                      <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}


                        <p className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}> <span className=' text-sm font-thin line-through'>₹000 </span> ₹000  </p>


                      </div>


                    </div>

                  </a>


                  <a

                    // href={"/product"}
                    className={` border ${!themeMode ? "border-slate-300" : " border-slate-100 "}  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
                    id='singleCardHolder'
                  >
                    <div className=" rounded-lg overflow-hidden">
                      {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}


                      {/* This div present in the place of Image */}
                      <div className=" h-60 flex justify-center items-center p-1">

                        <div className=" h-full w-full rounded-lg bg-slate-300">

                          

                        </div>

                      </div>

                    </div>

                    <div className="flex justify-between pt-5  px-2 ">

                      <div>
                        {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                        <h3 
                        className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white"
                        >Loading...</h3>

                        <div className="flex items-center">

                          {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                          {/* <p>{product.rating.avgRating }</p> */}
                          {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                        </div>
                      </div>


                      <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}


                        <p className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}> <span className=' text-sm font-thin line-through'>₹000 </span> ₹000  </p>


                      </div>


                    </div>

                  </a>


                  <a

                    // href={"/product"}
                    className={` border ${!themeMode ? "border-slate-300" : " border-slate-100 "}  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
                    id='singleCardHolder'
                  >
                    <div className=" rounded-lg overflow-hidden">
                      {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}


                      {/* This div present in the place of Image */}
                      <div className=" h-60 flex justify-center items-center p-1">

                        <div className=" h-full w-full rounded-lg bg-slate-300">

                          

                        </div>

                      </div>

                    </div>

                    <div className="flex justify-between pt-5  px-2 ">

                      <div>
                        {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                        <h3 
                        className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white"
                        >Loading...</h3>

                        <div className="flex items-center">

                          {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                          {/* <p>{product.rating.avgRating }</p> */}
                          {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                        </div>
                      </div>


                      <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}


                        <p className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}> <span className=' text-sm font-thin line-through'>₹000 </span> ₹000  </p>


                      </div>


                    </div>

                  </a>




                </div>

              </Fragment>


                   
              <Fragment >

                <p className="pt-10 capitalize text-2xl font-bold pl-2 underline">Getting Data ....</p>

                <div className="h-96 flex flex-wrap flex-col overflow-y-hidden overflow-x-auto my-2  pb-3  ">

                  <a

                    // href={"/product"}
                    className={` border ${!themeMode ? "border-slate-300" : " border-slate-100 "}  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
                    id='singleCardHolder'
                  >
                    <div className=" rounded-lg overflow-hidden">


                      {/* This div present in the place of Image */}
                      <div className=" h-60 flex justify-center items-center p-1">

                        <div className=" h-full w-full rounded-lg bg-slate-300">

                          

                        </div>

                      </div>

                    </div>

                    <div className="flex justify-between pt-5  px-2 ">

                      <div>
                        {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                        <h3 
                        className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white"
                        >Loading...</h3>

                        <div className="flex items-center">

                          {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                          {/* <p>{product.rating.avgRating }</p> */}
                          {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                        </div>
                      </div>


                      <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}


                        <p className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}> <span className=' text-sm font-thin line-through'>₹000 </span> ₹000  </p>


                      </div>


                    </div>

                  </a>




                  <a

                    // href={"/product"}
                    className={` border ${!themeMode ? "border-slate-300" : " border-slate-100 "}  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
                    id='singleCardHolder'
                  >
                    <div className=" rounded-lg overflow-hidden">
                      {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}


                      {/* This div present in the place of Image */}
                      <div className=" h-60 flex justify-center items-center p-1">

                        <div className=" h-full w-full rounded-lg bg-slate-300">

                          

                        </div>

                      </div>

                    </div>

                    <div className="flex justify-between pt-5  px-2 ">

                      <div>
                        {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                        <h3 
                        className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white"
                        >Loading...</h3>

                        <div className="flex items-center">

                          {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                          {/* <p>{product.rating.avgRating }</p> */}
                          {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                        </div>
                      </div>


                      <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}


                        <p className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}> <span className=' text-sm font-thin line-through'>₹000 </span> ₹000  </p>


                      </div>


                    </div>

                  </a>




                  <a

                    // href={"/product"}
                    className={` border ${!themeMode ? "border-slate-300" : " border-slate-100 "}  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
                    id='singleCardHolder'
                  >
                    <div className=" rounded-lg overflow-hidden">
                      {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}


                      {/* This div present in the place of Image */}
                      <div className=" h-60 flex justify-center items-center p-1">

                        <div className=" h-full w-full rounded-lg bg-slate-300">

                          

                        </div>

                      </div>

                    </div>

                    <div className="flex justify-between pt-5  px-2 ">

                      <div>
                        {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                        <h3 
                        className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white"
                        >Loading...</h3>

                        <div className="flex items-center">

                          {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                          {/* <p>{product.rating.avgRating }</p> */}
                          {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                        </div>
                      </div>


                      <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}


                        <p className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}> <span className=' text-sm font-thin line-through'>₹000 </span> ₹000  </p>


                      </div>


                    </div>

                  </a>




                  <a

                    // href={"/product"}
                    className={` border ${!themeMode ? "border-slate-300" : " border-slate-100 "}  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
                    id='singleCardHolder'
                  >
                    <div className=" rounded-lg overflow-hidden">
                      {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}


                      {/* This div present in the place of Image */}
                      <div className=" h-60 flex justify-center items-center p-1">

                        <div className=" h-full w-full rounded-lg bg-slate-300">

                          

                        </div>

                      </div>

                    </div>

                    <div className="flex justify-between pt-5  px-2 ">

                      <div>
                        {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                        <h3 
                        className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white"
                        >Loading...</h3>

                        <div className="flex items-center">

                          {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                          {/* <p>{product.rating.avgRating }</p> */}
                          {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                        </div>
                      </div>


                      <div className="flex flex-col items-end justify-center">
                        {/* <p>{product.discountPercentage}%</p> */}
                        {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}


                        <p className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}> <span className=' text-sm font-thin line-through'>₹000 </span> ₹000  </p>


                      </div>


                    </div>

                  </a>




                </div>

              </Fragment>

              

            </>


        }


        {

          searchByQuery
          &&
          <div className="flex justify-center">
            <h1
              className="border  px-1 rounded-lg font-bold hover:bg-green-500 hover:scale-110 transition-all"
              onClick={() => {
                dispatch(fetchAllCategoryAndHighlight());
                dispatch(fetchAllProducts({ brand: "", category: '', price: "-1", limit: `${limitValue}` }));
                window.scroll(0, 0)
              }}
            >Back To normal Data</h1>
          </div>

        }





      </div>






















    </div>
  )
}







