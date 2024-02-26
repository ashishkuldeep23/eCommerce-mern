
// import React from 'react'
// import { motion } from "framer-motion"

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setChildrenModal, setOpenMoadl } from "../../Slices/ModalSlice";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable"


const ProductImagesDiv = () => {

    const dispatch = useDispatch<AppDispatch>()

    const singleProductData = useSelector((store: RootState) => store.allProductWithCatReducer.singleProductData)


    const [mainImg, setMainImg] = useState('')

    const [arrOfImage, setArrOfImage] = useState<string[]>([])

    const handlers = useSwipeable({
        onSwipedLeft: () => next(),
        onSwipedRight: () => previous(),
        // Add other event handlers as needed
    });


    useEffect(() => {
        if (singleProductData && singleProductData.images.length > 0) {
            setMainImg(singleProductData?.images[0])
            setArrOfImage(singleProductData.images)
        }
    }, [singleProductData])


    function showModalWithValues(userImage: string, productName: string) {

        // // // Modal inner value (UI shown)
        let ChildrenOfModal = <div><img className=" rounded" src={userImage} alt="" /> <p className='text-center mt-1 font-bold underline'>{productName}</p> </div>

        dispatch(setOpenMoadl(true))
        dispatch(setChildrenModal(ChildrenOfModal))

    }


    function previous() {
        // e.stopPropagation()
        // alert("Previous logic")


        let getIndex = arrOfImage.indexOf(mainImg)

        if (getIndex === 0) {
            setMainImg(arrOfImage[arrOfImage.length - 1])
        } else {
            setMainImg(arrOfImage[getIndex - 1])
        }


    }

    function next() {

        // e.stopPropagation()

        // alert("next logic")

        let getIndex = arrOfImage.indexOf(mainImg)

        if (getIndex === arrOfImage.length - 1) {
            setMainImg(arrOfImage[0])
        } else {
            setMainImg(arrOfImage[getIndex + 1])
        }

    }


    function onImageErr(e: React.SyntheticEvent<HTMLImageElement, Event>) {

        let { currentTarget } = e
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = "https://thumbs.dreamstime.com/b/error-rubber-stamp-word-error-inside-illustration-109026446.jpg";
    }




    return (

        <div className="  lg:w-3/5 flex flex-col justify-center items-center sm:flex-row-reverse">


            <div className="grid gap-1 grid-cols-1 grid-rows-1 place-content-center place-items-center  ">

                {
                    (arrOfImage.length > 0 && mainImg)


                        ?

                        <div className=" relative w-full flex justify-center">

                            <button
                                className=" absolute text-4xl -left-1 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-100 focus:text-blue-100 transition-all"
                                onClick={(e) => { e.stopPropagation(); previous() }}
                            >{'◁'}</button>


                            <img
                        

                                className=" rounded h-56 sm:h-90 object-contain hover:cursor-pointer"
                                src={mainImg}
                                alt="Product Image."
                                onClick={(e) => { e.stopPropagation(); showModalWithValues(mainImg, singleProductData.title) }}
                                onError={(e) => onImageErr(e)}
                                {...handlers}
                            // onSwipedLeft={()=>alert("ok")}

                            />


                            <button
                                className=" absolute text-4xl -right-1 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-100  focus:text-blue-100 transition-all"
                                onClick={(e) => { e.stopPropagation(); next() }}
                            >{'▷'}</button>

                        </div>



                        :
                        <img
                            className='border rounded hover:scale-95 transition-all'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3XKEJqpEWVLFp2gWAKNHFoarWaOReT23c4b8nWb7&s'
                        />

                }






            </div>

            <div className="h-24 w-full my-2 rounded flex justify-center gap-1 sm:flex-col items-center sm:h-full sm:w-2/6 ">

                {
                    (arrOfImage.length > 0)
                        ?
                        arrOfImage.map((image, i) => {
                            return (
                                <div key={i} className="w-3/4">
                                    <img
                                        onClick={(e) => { e.stopPropagation(); setMainImg(image) }}
                                        onError={(e) => onImageErr(e)}
                                        src={image}
                                        alt="Product Image."
                                        className={`h-full rounded object-cover object-center hover:scale-90 transition-all w-full hover:cursor-pointer
                                                ${image !== mainImg && "opacity-50"}
                                                ${image === mainImg && "border-b-[0.5vh] border border-blue-600 relative bottom-2 left-0 sm:bottom-0 sm:left-2 transition-all"}
                                            `}
                                    />
                                </div>
                            )

                        })

                        :
                        <>
                            <div className='flex flex-wrap gap-2 justify-center  col-span-4' >

                                {
                                    [1].map((ele) => {
                                        return (
                                            <img
                                                key={ele}
                                                className='border rounded hover:scale-95 transition-all'
                                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3XKEJqpEWVLFp2gWAKNHFoarWaOReT23c4b8nWb7&s'
                                            />
                                        )
                                    })
                                }
                            </div>
                        </>
                }

            </div>

        </div>

    )
}

export default ProductImagesDiv

