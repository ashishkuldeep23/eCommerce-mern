
// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { useEffect, useState } from "react"
import { GroupedByData, adminDataState } from "../../Slices/AdminSliceFile"

const DataInChartFormate = () => {

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const { groupedByCategoryObj, groupedByBrandObj } = adminDataState()

    const [groupedData, setGroupedData] = useState<GroupedByData>(groupedByCategoryObj)

    const [maxNumber, setMaxNumber] = useState(0)

    type GrouptedByValue = "byCategory" | "byBrand"

    const [groupedByValue, setGroupedByValue] = useState<GrouptedByValue>('byCategory')



    function changeDataBy() {
        setGroupedByValue(groupedByValue === "byCategory" ? "byBrand" : "byCategory")

        if (groupedByValue === "byCategory") {
            setGroupedData(groupedByBrandObj)
        } else {
            setGroupedData(groupedByCategoryObj)

        }

    }




    useEffect(() => {

        let allLengthArr = []

        for (let key in groupedData) {
            allLengthArr.push(groupedData[key].length)
        }

        const maxValue = allLengthArr.sort((a, b) => b - a)

        // console.log(maxValue)


        setMaxNumber(maxValue[0])

    }, [groupedData])


    useEffect(() => {


        // console.log(groupedByCategoryObj)

        setGroupedData(groupedByCategoryObj)

    }, [groupedByCategoryObj, groupedByBrandObj])


    return (
        <>


            <div
                className={`my-20 w-full smm:w-10/12 sm:w-4/6 md:w-1/2 py-2 px-1.5 rounded border flex flex-col items-center justify-between overflow-hidden
                ${themeMode
                        ? " bg-emerald-950  border-white "
                        : "bg-emerald-200 border-black"}
                `}
                id="OrderDataChartDiv"
            >


                <p>Total orders by <span className=" font-semibold border-b text-green-500 border-green-500">{groupedByValue === "byCategory" ? "Category" : "Brand"}</span> wise.</p>

                <div
                    className=" my-5 md:my-0  border-l-2 border-b-2 md:border-b-0 md:border-l-2 md:border-t-2 p-1 md:rotate-270 md:scale-125"
                // style={{ height: "40vh" }}
                >


                    {

                        Object.keys(groupedData).map((key, i) => {
                            return (
                                <div
                                    className=" flex h-auto  rounded-full border-2  border-green-500 my-2 capitalize overflow-hidden relative "
                                    key={i}
                                >
                                    <span
                                        className=" absolute bg-green-500"

                                        style={{
                                            width: `${(groupedData[key].length * 100) / maxNumber}%`,
                                            borderRadius: "76% 24% 100% 0% / 0% 80% 20% 100% "
                                        }}

                                    >{key}</span>
                                    {key}<p className=" md:rotate-90 ml-auto mr-1 z-10 font-semibold">{groupedData[key].length}
                                    </p></div>
                            )
                        })
                    }


                </div>


                <div>
                    <button
                        className=" px-2 border border-gray-400 rounded-full capitalize"
                        onClick={() => { changeDataBy() }}
                    >Get By {groupedByValue === "byCategory" ? "Brand" : "Category"}</button>
                </div>



            </div>


        </>
    )
}

export default DataInChartFormate
