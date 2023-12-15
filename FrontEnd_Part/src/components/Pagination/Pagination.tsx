import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { fetchAllProducts } from '../../Slices/AllProductSlice'
import { toast } from "react-toastify"



export default function Pagination() {

    const dispatch = useDispatch<AppDispatch>()


    const [currentPage, setCurrentPage] = useState(1)


    const totalProducts = useSelector((state: RootState) => state.allProductWithCatReducer.totalProducts)

    const onePageLimitValue = useSelector((state: RootState) => state.allProductWithCatReducer.onePageLimit)

    // const isLoding = useSelector((state: RootState) => state.allProductWithCatReducer.isLoading)

    const sortByPrice = useSelector((state: RootState) => state.allProductWithCatReducer.sortByPrice)


    // // // Limit value is 4 set (Change in useEffect of app.jsx and here)
    const limitValue = onePageLimitValue


    // console.log(totalProducts/3)

    const totalPageShow = Math.ceil(totalProducts / limitValue)




    function handlePagination(page: number) {

        // console.log(page)


        if (page < 1) {
            toast.error(`Page ${page} is not possiable for search | 400 (Bad Request)`, {
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

        if (page > totalPageShow) {
            toast.error(`Page ${page} is not possiable for search | 400 (Bad Request)`, {
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


        setCurrentPage(page)

        dispatch(fetchAllProducts({ brand: "", category: '', price: sortByPrice, page: `${page}`, limit: `${limitValue}` }))




        // let productHeading = document.getElementById("products-heading")!
        // window.scroll({ top : 100 , left: 0 , behavior: "smooth",})   // // // This line is responsibil for scrooling the window


        if (window.innerWidth <= 640) {
            window.scroll({ top: 100, left: 0, behavior: "smooth", })
        } else {
            window.scroll({ top: 250, left: 0, behavior: "smooth", })
        }

    }


    // // // // If Getting data then show nothing
    // if (isLoding) {
    //     return ""
    // }


    // // // // if total page calculation is less then or qual to 1 then show nothing
    // if (totalPageShow <= 1) {
    //     return ""
    // }



    return (


        <div>


            {
                (totalPageShow <= 0)
                &&
                <p className='text-end pr-5 '>Getting actual data...(don't use pagination now)</p>
            }



            <div className="flex items-center justify-between border-t border-gray-200  px-4 py-3 sm:px-6" >



                {/* Below div will visiable only in mobile -----> */}
                <div className="flex flex-1 justify-between items-center sm:hidden">
                    <p
                        className="relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium  hover:bg-gray-50"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePagination(currentPage - 1) }}
                    >
                        Previous
                    </p>

                    {/* <p>{`${currentPage}/${totalPageShow}`}</p> */}

                    <p> <span className=' font-bold text-blue-700'>{currentPage}</span>/<span>{totalPageShow}</span> </p>

                    <p
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium  hover:bg-gray-50"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePagination(currentPage + 1) }}
                    >
                        Next
                    </p>
                </div>

                {/* Below div will visiable above then mobile devices ----> */}
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm ">
                            Showing page <span className="font-medium">{currentPage}</span>  of{' '}
                            <span className="font-medium">{totalPageShow || 1}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <p

                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePagination(currentPage - 1) }}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </p>




                            {

                                (totalPageShow > 0)

                                    ?

                                    Array.from(Array(totalPageShow), (ele, i) => {
                                        return (
                                            <p
                                                key={i}

                                                className={` ${(currentPage === i + 1) && "bg-blue-700 text-white"} relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-300 hover:bg-blue-200 hover:text-black focus:z-20 focus:outline-offset-0`}
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log("This console lo is imp.", ele); handlePagination(++i); }}
                                            >
                                                {`${i + 1} `}
                                            </p>
                                        )
                                    })


                                    :


                                    Array.from(Array(4), (ele, i) => {
                                        return (


                                            <p
                                                key={i}

                                                className={` ${(currentPage === i + 1) && "bg-red-500 text-white"} relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-300 hover:bg-red-200 hover:text-black focus:z-20 focus:outline-offset-0`}
                                                onClick={(e) => { e.stopPropagation(); console.log("This console lo is imp.", ele); }}
                                            >
                                                {`${i + 1} `}
                                            </p>
                                        )
                                    })
                            }


                            <p

                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePagination(currentPage + 1) }}
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </p>

                        </nav>
                    </div>
                </div>
            </div >

        </div>



    )



}
