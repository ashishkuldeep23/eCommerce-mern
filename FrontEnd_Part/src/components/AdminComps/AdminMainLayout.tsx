import React from "react";
import { userState } from "../../Slices/UserSlice";
import { LoaderCircle } from "../LoaderCircle/LoaderCircle";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
// import Footer from "../Footer/Footer";

const AdminMainLayout = ({ children }: { children?: React.ReactNode }) => {
    const isUserAdmin = userState().userData.role;
    const isLoading = userState().isLoading;

    const navigationTabInfo = [
        { aTagName: "See Create Product", href: "createOrderDiv", to: "/admin/create" },
        { aTagName: "See All Products", href: "allProductsDiv", to: "/admin/products" },
        { aTagName: "See All Orders", href: "allOrdersDiv", to: "/admin/orders" },
        { aTagName: "See Charts", href: "OrderDataChartDiv", to: "/admin/chart" },
    ];

    // // // Pure js method used (No any react thing used) ---->
    function clickScrollHandler(divId: string) {
        let actualDiv = document.querySelector(`#${divId}`);
        // console.log(actualDiv)
        // console.log(actualDiv?.getBoundingClientRect())

        let top = actualDiv?.getBoundingClientRect().top;
        let lessSrool = 100;
        top && window.scroll(0, top - lessSrool);
    }

    if (isLoading && isUserAdmin !== "admin") {
        return (
            <div className=" bg-white dark:bg-black min-w-full min-h-screen flex justify-center items-center">
                <LoaderCircle isLoading={isLoading} />
                {/* // // create web skeleton that shows loading when user is not admin */}
                <div className=" h-[80vh] w-[80%] bg-gray-300 dark:bg-gray-700 rounded-2xl animate-pulse flex flex-col items-center">
                    <p className=" text-4xl m-5 my-10 text-center">Getting user status</p>
                    <Link className=" border rounded  p-2 py-1 bg-blue-500 font-semibold" to="/">Go to Home</Link>
                </div>
            </div>
        )
    }


    return (
        // Make routes here to seprate pages

        <>
            <NavBar />
            <div
                className={` min-h-[88vh] bg-white text-gray-700 dark:bg-black dark:text-gray-100  transition-all`}>
                <div className="lg:max-w-7xl lg:px-8 md:px-4 sm:px-6 mx-auto py-10 px-1.5 flex flex-col justify-center items-center ">
                    <p className=" text-center text-5xl mb-5 underline font-bold">
                        Admin page
                    </p>

                    {/* Navigation bar for Admin. -------------->> */}
                    <div className="sticky z-[10] -top-24 sm:top-6 lg:top-12 hover:top-12 hover:sm:top-12 hover:lg:top-16  bg-green-400 text-white font-semibold flex flex-col sm:flex-row gap-2 flex-wrap items-center  px-2 rounded transition-all ">
                        {navigationTabInfo.map((ele, i) => {
                            return (
                                <Link
                                    to={ele.to || ''}
                                    key={i}
                                    className="px-2 border-b my-1 hover:border-b-violet-800 hover:text-violet-800 hover:cursor-pointer transition-all"
                                    // href={`#${ele.href}`}

                                    onClick={() => {
                                        clickScrollHandler(ele.href);
                                    }}>
                                    {ele.aTagName}
                                </Link>
                            );
                        })}
                    </div>

                    {children}


                    <button
                        className={`  bg-white text-zinc-900 dark:bg-black dark:text-gray-100 font-semibold fixed bottom-5 right-5 md:bottom-10 md:right-10 text-sm capitalize px-4 border border-gray-400 rounded-full ml-auto mr-1`}
                        onClick={() => {
                            window.scroll(0, 0);
                        }}>
                        Goto🔝
                    </button>
                    {/* </div> */}
                </div>
            </div>
            {/* <Footer /> */}
        </>

    );
}

export default AdminMainLayout