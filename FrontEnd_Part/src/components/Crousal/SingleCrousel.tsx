
// import React from 'react'

import { ItemsType } from "./Crousal"

type TSingleCrouselPropes = {

    item: ItemsType,
    i: number,
    crousalItems: ItemsType[]

}



const holderDivStyle = {
    backgroundRepeat: "repeat-x",
    backgroundAttachment: "fixed",
    backgroundBlendMode: "hue(120deg)",
    backgroundSize: "contain" ,
    
}


const SingleCrousel = ({ item, i, crousalItems }: TSingleCrouselPropes) => {
    return (
        <>

            <div id={`slide${i}`} style={{ backgroundImage: `url(${item.imageSrc})`  , ...holderDivStyle }} className="carousel-item relative w-full h-full ">
                <img src={item.imageSrc}
                    className=" w-full  object-contain rounded"
                />

                <p className=" absolute left-1/2 bottom-3 -translate-x-1/2 text-2xl text-teal-300">{item.name} @ {item.price}</p>

                <div className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/2">
                    <a href={`#slide${(i !== 0) ? i - 1 : crousalItems.length - 1}`} className="btn btn-circle bg-transparent border-0 text-4xl ml-0">❮</a>
                    <a href={`#slide${(i !== crousalItems.length - 1) ? i + 1 : 0}`} className="btn btn-circle bg-transparent border-0 text-4xl ml-0">❯</a>
                </div>
            </div>


        </>
    )
}

export default SingleCrousel
