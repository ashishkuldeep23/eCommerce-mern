// import React from 'react'

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

/**
 * Below blog used to show data chat --->
 * 
 * URL :- https://blog.logrocket.com/using-chart-js-react/#:~:text=react%2Dchartjs%2D2%20offers%20a,ones%20being%20data%20and%20options%20.&text=backgroundColor%20and%20borderWidth%20are%20just,added%20to%20the%20datasets%20array.
 */


import { Bar, Pie, PolarArea, Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from "react"
import { adminDataState, getAllOrdersAdmin } from "../../Slices/AdminSliceFile"
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';


import Chart from "chart.js/auto";
import { CategoryScale, Colors, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";


// Chart.register(CategoryScale);



Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



Chart.register(Colors);



type FormatedDataOfProduct = {
    id: number
    productName: string,
    sold: number,
}[]


type CartType = "Bar" | "Pie" | "PolarArea" | 'Doughnut'



const ChartJs2 = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { allOrders, groupedByProductAndSold, groupedByBrandObj, groupedByCategoryObj } = adminDataState()


    const [formatedDataOfProduct, setFormatedDataOfProduct] = useState<FormatedDataOfProduct>([])

    const [productBy, setProductBy] = useState("By Product")

    const arrOfProductBy = ["By Product", 'By Categoy', 'By Brand']

    const [cartType, setCartType] = useState<CartType>("Pie")

    const arrOfchartTypes = ["Pie", "Bar", "PolarArea", 'Doughnut']





    function formateByProductInitData() {
        if (Object.keys(groupedByProductAndSold).length > 0) {

            let arr = Object.keys(groupedByProductAndSold).map((key, i) => {
                return { productName: key, sold: groupedByProductAndSold[key], id: i + 1 }
            })

            // console.log(arr)

            setFormatedDataOfProduct(arr)
        }
    }



    useEffect(() => {

        if (productBy === "By Product" && Object.keys(groupedByProductAndSold).length > 0) {
            formateByProductInitData()
        }

        else if (productBy === "By Categoy" && Object.keys(groupedByCategoryObj).length > 0) {
            let arr = Object.keys(groupedByCategoryObj).map((key, i) => {
                return { productName: key, sold: groupedByCategoryObj[key].length, id: i + 1 }
            })

            // console.log(arr)

            setFormatedDataOfProduct(arr)
        }

        else if (productBy === "By Brand" && Object.keys(groupedByBrandObj).length > 0) {
            let arr = Object.keys(groupedByBrandObj).map((key, i) => {
                return { productName: key, sold: groupedByBrandObj[key].length, id: i + 1 }
            })

            // console.log(arr)

            setFormatedDataOfProduct(arr)
        }

    }, [productBy])

    useEffect(() => {

        formateByProductInitData()

    }, [groupedByProductAndSold])

    useEffect(() => {

        if (allOrders.length <= 0) {
            dispatch(getAllOrdersAdmin('-1'))
        }

    }, [])

    return (
        <>

            <div className=" my-5 rounded py-2 px-1 md:p-2 w-full">


                <h1 className=' text-4xl font-bold underline text-center my-5'>Data visualization </h1>


                <div>
                    <p className=' text-center my-2 underline'>⁕Data selected <span className=' text-yellow-400'>{productBy}</span> in <span className=' text-yellow-400'>{cartType}</span> Chart</p>
                </div>

                <div className=' flex gap-5 justify-center'>


                    <div className=' flex flex-col items-center justify-center'>


                        <label htmlFor="product_By_select">Select Data by👇</label>

                        <select

                            id="product_By_select"
                            value={productBy}
                            onChange={(e) => { setProductBy(e.target.value) }}
                            className=' bg-black text-white rounded-xl font-bold'
                        >

                            {
                                arrOfProductBy.map((ele, i) => <option key={i} value={ele}>{ele}</option>)
                            }

                        </select>

                    </div>

                    <div className=' flex flex-col items-center justify-center'>


                        <label htmlFor="chart_type_select">Select chart type👇</label>

                        <select

                            id="chart_type_select"
                            value={cartType}
                            onChange={(e) => { setCartType(e.target.value as CartType) }}
                            className=' bg-black text-white rounded-xl font-bold'
                        >

                            {
                                arrOfchartTypes.map((ele, i) => <option key={i} value={ele}>{ele}</option>)
                            }

                        </select>

                    </div>

                </div>


                <div className=" w-full min-h-screen flex flex-col justify-center items-center">


                    <MainChart Data={formatedDataOfProduct} cartType={cartType} />
                </div>

            </div>

        </>
    )
}

export default ChartJs2




type ChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string;
        borderWidth: number;
        borderRadius: number;
    }[];
}

// import React from "react";
// import { Pie } from "react-chartjs-2";

function MainChart({ Data, cartType }: { Data: FormatedDataOfProduct, cartType: CartType }) {

    const headingText = 'Sold products till now'

    const darkBgColorsForChart = [
        '#DA0C81',
        '#4477CE',
        '#03C988',
        '#C147E9',
        '#FB2576',
        '#ECB365',
        '#FFD700',
        '#F70776',
        '#8FD6E1',
        '#F1EBBB',
    ]

    let initialData = {
        labels: ["65", "59", "80", "81", "56", "55", "40"],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: darkBgColorsForChart,
            // color: "#666",
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 2,
            borderRadius: 10
        }]
    };

    const [chartData, setChartData] = useState<ChartData>(initialData);


    const [headingWithDateT, setHeadingWithDateT] = useState(`${headingText}`)


    useEffect(() => {


        // // // uPDATE date --->
        let date = new Date()
        // let todayTime = date.toTimeString()
        let todayDate = date.toDateString()
        setHeadingWithDateT(`${headingText} (${todayDate})`)


        if (Data.length > 0) {

            let labelsArr = Data.map(ele => ele.productName)
            let purchasedArr = Data.map(ele => ele.sold)

            setChartData({

                labels: labelsArr,
                datasets: [{
                    label: 'Sold',
                    data: purchasedArr,
                    backgroundColor: darkBgColorsForChart,

                    borderColor: "#666",
                    borderWidth: 2,

                    borderRadius: 20,


                }]
            })

        }

    }, [Data])



    return (

        <>

            {/* Actual code for charts ----> */}
            {
                cartType === "Pie"
                    ?
                    <div className="chart-container my-10  smm:h-[70vh] w-[100vw] sm:w-[70vw]  flex flex-col justify-center items-center">
                        <h2 className=' border-b' style={{ textAlign: "center" }}>{cartType} Chart</h2>

                        <Pie
                            // className="h-[40vh]"

                            data={chartData}


                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: headingWithDateT
                                    }
                                }
                            }}

                        />
                    </div>

                    :

                    cartType === "Bar"
                        ?
                        <div className="chart-container my-10  smm:h-[70vh] w-[100vw] sm:w-[70vw]  flex flex-col justify-center items-center">
                            <h2 className=' border-b' style={{ textAlign: "center" }}>{cartType} Chart</h2>
                            <Bar
                                // className="h-[40vh]"

                                data={chartData}


                                options={{
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: headingWithDateT
                                        }
                                    }
                                }}




                            />
                        </div>
                        :


                        cartType === "PolarArea"
                            ?

                            <div className="chart-container my-10  smm:h-[70vh] w-[100vw] sm:w-[70vw]  flex flex-col justify-center items-center">
                                <h2 className=' border-b' style={{ textAlign: "center" }}>{cartType} Chart</h2>
                                <PolarArea
                                    // className="h-[40vh]"

                                    data={chartData}

                                    options={{
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: headingWithDateT
                                            }
                                        }
                                    }}

                                />
                            </div>

                            :

                            <div className="chart-container my-10  smm:h-[70vh] w-[100vw] sm:w-[70vw]  flex flex-col justify-center items-center">
                                <h2 className=' border-b' style={{ textAlign: "center" }}>{cartType} Chart</h2>
                                <Doughnut
                                    // className="h-[40vh]"

                                    data={chartData}

                                    options={{
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: headingWithDateT
                                            }
                                        }
                                    }}

                                />
                            </div>

            }











        </>

    );
}


