// // import React from 'react'

// import { useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { userState } from "../../Slices/UserSlice";
// // import { useEffect } from "react"
// // import { Navigate } from "react-router-dom";
// import CreateNewProduct from "./CreateProduct";
// import AllProducts from "./AllProducts";
// import { AllOdersComp } from "./AllOdersComp";
// import DataInChartFormate from "./DataInChartFormate";
// import ChartJs2 from "./ChartJs2";
// import { GetUrlOfImgDiv } from "./Comps/GetUrlOfImgDiv";
// import { LoaderCircle } from "../LoaderCircle/LoaderCircle";
// // import { useEffect } from "react";
// import { Link, } from "react-router-dom";
// // import { useEffect } from "react"

// const AdminMain = () => {
//    const themeMode = useSelector((state: RootState) => state.themeReducer.mode);

//    const isUserAdmin = userState().userData.role;

//    const isLoading = userState().isLoading;

//    // const globalLoading = useSelector(
//    //    (state: RootState) => state.allProductWithCatReducer.isLoading) || userState().isLoading;


//    // console.log(isUserAdmin)

//    const navigationTabInfo = [
//       { aTagName: "See Create Product", href: "createOrderDiv" },
//       { aTagName: "See All Products", href: "allProductsDiv" },
//       { aTagName: "See All Orders", href: "allOrdersDiv" },
//       { aTagName: "See Charts", href: "OrderDataChartDiv" },
//    ];

//    // // // Pure js method used (No any react thing used) ---->
//    function clickScrollHandler(divId: string) {
//       let actualDiv = document.querySelector(`#${divId}`);

//       // console.log(actualDiv)
//       // console.log(actualDiv?.getBoundingClientRect())

//       let top = actualDiv?.getBoundingClientRect().top;
//       let lessSrool = 100;
//       top && window.scroll(0, top - lessSrool);
//    }

//    // // // If user in not admin then redirect on home page ------>
//    // if (globalLoading && isUserAdmin !== "admin") {
//    //    return <Navigate to="/"></Navigate>;
//    // }

//    // const navigate = useNavigate();

//    // useEffect(() => {
//    //    if (!isLoading && isUserAdmin !== "admin") {
//    //       navigate("/")
//    //    }
//    // }, [isUserAdmin, isLoading])


//    if (isLoading && isUserAdmin !== "admin") {
//       return (
//          <div className=" bg-white dark:bg-black min-w-full min-h-screen flex justify-center items-center">
//             <LoaderCircle isLoading={isLoading} />
//             {/* // // create web skeleton that shows loading when user is not admin */}
//             <div className=" h-[80vh] w-[80%] bg-gray-300 dark:bg-gray-700 rounded-2xl animate-pulse flex flex-col items-center">
//                <p className=" text-4xl m-5 my-10 text-center">Getting user status</p>
//                <Link className=" border rounded  p-2 py-1 bg-blue-500 font-semibold" to="/">Go to Home</Link>
//             </div>
//          </div>
//       )
//    }


//    return (



//       // Make routes here to seprate pages
//       <div
//          className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} transition-all`}>
//          <div className="lg:max-w-7xl lg:px-8 md:px-4 sm:px-6 mx-auto py-10 px-1.5 flex flex-col justify-center items-center ">
//             <p className=" text-center text-5xl mb-5 underline font-bold">
//                Admin page
//             </p>

//             {/* Navigation bar for Admin. -------------->> */}
//             <div className="sticky z-[10] -top-24 sm:top-6 lg:top-12 hover:top-12 hover:sm:top-12 hover:lg:top-16  bg-green-400 text-white font-semibold flex flex-col sm:flex-row gap-2 flex-wrap items-center  px-2 rounded transition-all ">
//                {navigationTabInfo.map((ele, i) => {
//                   return (
//                      <span
//                         key={i}
//                         className="px-2 border-b my-1 hover:border-b-violet-800 hover:text-violet-800 hover:cursor-pointer transition-all"
//                         // href={`#${ele.href}`}

//                         onClick={() => {
//                            clickScrollHandler(ele.href);
//                         }}>
//                         {ele.aTagName}
//                      </span>
//                   );
//                })}
//             </div>

//             {/* <Routes>
//                   <Route path="/createOrderDiv" element={<CreateNewProduct />} />
//                   <Route path="/allProductsDiv" element={<AllProducts />} />
//                   <Route path="/allOrdersDiv" element={<AllOdersComp />} />
//                   <Route
//                      path="/OrderDataChartDiv"
//                      element={<DataInChartFormate />}
//                   />
//                </Routes> */}

//             {/* Create new product */}
//             <div className=" flex flex-col-reverse sm:flex-row justify-center items-start gap-2 ">
//                <div className=" mx-auto sm:mx-0 !w-[90%] sm:!w-[65%]">
//                   <CreateNewProduct />
//                </div>
//                <div className=" rounded mx-auto sm:mx-0 !w-[90%] sm:!w-[35%] ">
//                   <GetUrlOfImgDiv />
//                </div>
//             </div>

//             {/* All product visiable */}
//             <AllProducts />

//             {/* All order component  */}
//             <AllOdersComp />

//             {/* Simple chart to show all order (Improve letar) */}
//             <DataInChartFormate />

//             {/* chat package ---> */}
//             <ChartJs2 />

//             {/* <div> */}
//             <button
//                className={` ${!themeMode ? "bg-white text-zinc-900" : "bg-black text-gray-100"} font-semibold fixed bottom-5 right-5 md:bottom-10 md:right-10 text-sm capitalize px-4 border border-gray-400 rounded-full ml-auto mr-1`}
//                onClick={() => {
//                   window.scroll(0, 0);
//                }}>
//                Goto🔝
//             </button>
//             {/* </div> */}
//          </div>
//       </div>
//    );
// };

// export default AdminMain;
