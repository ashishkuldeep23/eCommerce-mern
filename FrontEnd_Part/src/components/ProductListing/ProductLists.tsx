import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Fragment } from "react";
import SingleProduct from "./SingleProduct";
// import {
//    fetchAllProducts,
//    setSearchBrandAndCate,
// } from "../../Slices/AllProductSlice";

export default function ProductLists() {
   // const dispatch = useDispatch<AppDispatch>();

   const themeMode = useSelector((store: RootState) => store.themeReducer.mode);

   const productCategory = useSelector(
      (store: RootState) => store.allProductWithCatReducer.allCaegory,
   );

   const isLoding = useSelector(
      (state: RootState) => state.allProductWithCatReducer.isLoading,
   );

   const products = useSelector(
      (store: RootState) => store.allProductWithCatReducer.allProducts,
   );

   const { brand, category } = useSelector(
      (store: RootState) => store.allProductWithCatReducer.searchBrandAndCate,
   );

   const allCatNameOfProducts = products?.map(
      (product) => product.categoryName,
   );

   const styleOfCatgioryDiv = {
      paddingRight: 0,
   };

   if (isLoding && products.length <= 0) return <DummyUiCode />;

   if (products.length <= 0 && (brand || category)) {
      return (
         <div className="h-80 flex flex-wrap flex-col gap-14 items-start ml-0 mx-auto overflow-y-hidden overflow-x-auto my-2  pb-3 ">
            <div className=" pt-10 pl-5">
               <p className=" capitalize text-2xl mb-2  ">
                  No Product Found for your query.
               </p>
               <p>
                  You are searching products for{" "}
                  <span className=" font-semibold">Category : {category}</span>  and{" "}
                  <span className=" font-semibold">Brand : {brand}.</span>
               </p>

               {/* <button onClick={} className=" text-red-500 border-2 border-red-500 rounded px-2 mt-2 font-semibold ">Clear Search</button> */}
            </div>
         </div>
      );
   }

   return (
      <div
         className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"}`}
         style={styleOfCatgioryDiv}>
         <div className="mx-auto px-0  md:px-4  sm:px-6  lg:max-w-7xl lg:px-8   flex flex-col ">
            <h2 className="sr-only">Products</h2>

            {
               // // // Comment for till actual data is incoming -->
               isLoding && (
                  <div>
                     <p>Loading...</p>
                     <p>Actual data is coming...</p>
                     <p>
                        Please refresh page twice or thrice after 10 seconds (If
                        actual data is not coming).
                     </p>
                  </div>
               )
            }

            {productCategory && productCategory.length > 0 ? (
               // // // Actual ui code here --->
               productCategory?.map((element, i) => {
                  if (!allCatNameOfProducts?.includes(element))
                     return <Fragment key={i}></Fragment>;
                  return (
                     <Fragment key={i}>
                        <p className="pt-10 capitalize text-2xl font-bold pl-2 underline">
                           {element}
                        </p>

                        <div className="h-80 flex flex-wrap flex-col gap-2 sm:gap-7 items-start ml-0 mx-auto overflow-y-hidden overflow-x-auto my-2 pb-3 ">
                           {products.length > 0 ? (
                              products
                                 ?.filter((item) => {
                                    if (
                                       item?.categoryName?.toLowerCase() ===
                                       element?.toLowerCase()
                                    ) {
                                       return item;
                                    }
                                 })
                                 ?.map((product, i) => (
                                    <SingleProduct product={product} key={i} />
                                 ))
                           ) : (
                              <h1>Getting data , Place skeleton here </h1>
                           )}
                        </div>

                        {/* {i} */}

                        {i === 0 && (
                           <div className=" w-full h-[40vh] rounded-xl p-5 bg-teal-500">
                              <p>
                                 This is how you can add recently viewed
                                 products{" "}
                              </p>
                           </div>
                        )}
                     </Fragment>
                  );
               })
            ) : (
               <></>
            )}
         </div>
      </div>
   );
}

const DummyUiCode = () => {
   return (
      // // // Dummy code here --->
      <>
         {/* Dummy data Skeleton only ------> */}
         <SingleDummyFragment />
         <SingleDummyFragment />
         <SingleDummyFragment />
         <SingleDummyFragment />
      </>
   );
};

const SingleDummyFragment = () => {
   return (
      <Fragment>
         <p className="pt-10 capitalize text-2xl font-bold pl-2 underline">
            Getting Data ....
         </p>

         <div className=" h-90 flex flex-wrap flex-col overflow-y-hidden overflow-x-auto my-2  pb-3  ">
            <a
               // href={"/product"}
               className={` border border-slate-300 dark:border-slate-100 rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
               id="singleCardHolder">
               <div className=" rounded-lg overflow-hidden">
                  {/* This div present in the place of Image */}
                  <div className=" h-60 flex justify-center items-center p-1">
                     <div className=" h-full w-full rounded-lg bg-slate-300"></div>
                  </div>
               </div>

               <div className="flex justify-between pt-5  px-2 ">
                  <div>
                     {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                     <h3 className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white">
                        Loading...
                     </h3>

                     <div className="flex items-center">
                        {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                        {/* <p>{product.rating.avgRating }</p> */}
                        {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                     </div>
                  </div>

                  <div className="flex flex-col items-end justify-center">
                     {/* <p>{product.discountPercentage}%</p> */}
                     {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}

                     <p
                        className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}>
                        {" "}
                        <span className=" text-sm font-thin line-through">
                           ₹000{" "}
                        </span>{" "}
                        ₹000{" "}
                     </p>
                  </div>
               </div>
            </a>

            <a
               // href={"/product"}
               className={` border border-slate-300 dark:border-slate-100  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
               id="singleCardHolder">
               <div className=" rounded-lg overflow-hidden">
                  {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}

                  {/* This div present in the place of Image */}
                  <div className=" h-60 flex justify-center items-center p-1">
                     <div className=" h-full w-full rounded-lg bg-slate-300"></div>
                  </div>
               </div>

               <div className="flex justify-between pt-5  px-2 ">
                  <div>
                     {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                     <h3 className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white">
                        Loading...
                     </h3>

                     <div className="flex items-center">
                        {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                        {/* <p>{product.rating.avgRating }</p> */}
                        {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                     </div>
                  </div>

                  <div className="flex flex-col items-end justify-center">
                     {/* <p>{product.discountPercentage}%</p> */}
                     {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}

                     <p
                        className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}>
                        {" "}
                        <span className=" text-sm font-thin line-through">
                           ₹000{" "}
                        </span>{" "}
                        ₹000{" "}
                     </p>
                  </div>
               </div>
            </a>

            <a
               // href={"/product"}
               className={` border border-slate-300 dark:border-slate-100  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
               id="singleCardHolder">
               <div className=" rounded-lg overflow-hidden">
                  {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}

                  {/* This div present in the place of Image */}
                  <div className=" h-60 flex justify-center items-center p-1">
                     <div className=" h-full w-full rounded-lg bg-slate-300"></div>
                  </div>
               </div>

               <div className="flex justify-between pt-5  px-2 ">
                  <div>
                     {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                     <h3 className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white">
                        Loading...
                     </h3>

                     <div className="flex items-center">
                        {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                        {/* <p>{product.rating.avgRating }</p> */}
                        {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                     </div>
                  </div>

                  <div className="flex flex-col items-end justify-center">
                     {/* <p>{product.discountPercentage}%</p> */}
                     {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}

                     <p
                        className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}>
                        {" "}
                        <span className=" text-sm font-thin line-through">
                           ₹000{" "}
                        </span>{" "}
                        ₹000{" "}
                     </p>
                  </div>
               </div>
            </a>

            <a
               // href={"/product"}
               className={` border border-slate-300 dark:border-slate-100  rounded-lg min-h-52 h-auto  w-72  mb  mx-2 hover:cursor-pointer  cursor-pointer animate-pulse `}
               id="singleCardHolder">
               <div className=" rounded-lg overflow-hidden">
                  {/* <img
                      src={"..."}
                      alt={"......."}
                      className=" h-52  w-full  object-cover object-center scale-95 rounded group-hover:opacity-75 mb-2"
                    /> */}

                  {/* This div present in the place of Image */}
                  <div className=" h-60 flex justify-center items-center p-1">
                     <div className=" h-full w-full rounded-lg bg-slate-300"></div>
                  </div>
               </div>

               <div className="flex justify-between pt-5  px-2 ">
                  <div>
                     {/* <h3
                          className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} text-xl capitalize `}
                          id="headingOfProduct"
                        >Loading...</h3> */}

                     <h3 className=" bg-slate-300 w-full  rounded my-1 px-5 py-1 text-white">
                        Loading...
                     </h3>

                     <div className="flex items-center">
                        {/* <p className="h-5 w-5">{<StarIcon />}</p> */}
                        {/* <p>{product.rating.avgRating }</p> */}
                        {/* <p>{product.rating.totalPerson > 0 ? (Math.floor(product.rating.avgRating / product.rating.totalPerson)) : 0}</p> */}
                     </div>
                  </div>

                  <div className="flex flex-col items-end justify-center">
                     {/* <p>{product.discountPercentage}%</p> */}
                     {/* <p className={`text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> Price :</p> */}

                     <p
                        className={`bg-slate-300 w-full  rounded my-1 px-5 py-1.5 text-lg text-white text-end font-medium  `}>
                        {" "}
                        <span className=" text-sm font-thin line-through">
                           ₹000{" "}
                        </span>{" "}
                        ₹000{" "}
                     </p>
                  </div>
               </div>
            </a>
         </div>
      </Fragment>
   );
};
