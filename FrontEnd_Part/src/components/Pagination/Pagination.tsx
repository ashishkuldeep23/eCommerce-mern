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

    const onePageLimitValue = useSelector( (state : RootState) => state.allProductWithCatReducer.onePageLimit)


    // // // Limit value is 4 set (Change in useEffect of app.jsx and here)
    const limitValue = onePageLimitValue


    // console.log(totalProducts/3)

    const totalPageShow = Math.ceil(totalProducts / limitValue)





    function handlePagination(page: number) {

        // console.log(page)

        
        // let productHeading = document.getElementById("products-heading")!
        window.scroll(0, 500)   // // // This line is responsibil for scrooling the window
        


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

        dispatch(fetchAllProducts({ brand: "", category: '', price: "-1", page: `${page}`, limit: `${limitValue}` }))



    }



    // // // if total page calculation is less then or qual to 1 then show nothing
    if(totalPageShow <= 1){

        return ""
    }





    return (





        <div className="flex items-center justify-between border-t border-gray-200  px-4 py-3 sm:px-6" >
            <div className="flex flex-1 justify-between sm:hidden">
                <p
                    className="relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium  hover:bg-gray-50"
                    onClick={() => handlePagination(currentPage - 1)}
                >
                    Previous
                </p>
                <p>{`${currentPage}/${totalPageShow}`}</p>
                <p
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium  hover:bg-gray-50"
                    onClick={() => handlePagination(currentPage + 1)}
                >
                    Next
                </p>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm ">
                        Showing page <span className="font-medium">{currentPage}</span>  of{' '}
                        <span className="font-medium">{totalPageShow}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <p

                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={() => handlePagination(currentPage - 1)}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </p>




                        {

                            Array.from(Array(totalPageShow), (ele, i) => {
                                return (
                                    <p
                                        key={i}

                                        className={` ${(currentPage === i + 1) && "bg-blue-700 text-white"} relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-300 hover:bg-blue-200 focus:z-20 focus:outline-offset-0`}
                                        onClick={() => { console.log(ele); handlePagination(++i); }}
                                    >
                                        {`${i + 1} `}
                                    </p>
                                )
                            })

                        }


                        <p

                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={() => handlePagination(currentPage + 1)}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </p>
                    </nav>
                </div>
            </div>
        </div >




    )



}
