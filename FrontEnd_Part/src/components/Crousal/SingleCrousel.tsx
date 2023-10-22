

import { IProduct } from "../ProductListing/ProductLists"

import { useDispatch } from "react-redux"
import { useNavigate  } from "react-router-dom"
import { setSingleProductData  } from "../../Slices/AllProductSlice"

type TSingleCrouselPropes = {

    item: IProduct,
    i: number,
    crousalItems: IProduct[]

}



const holderDivStyle = {
    backgroundRepeat: "repeat-x",
    backgroundAttachment: "fixed",
    backgroundBlendMode: "hue(120deg)",
    backgroundSize: "contain",

}


const SingleCrousel = ({ item, i, crousalItems }: TSingleCrouselPropes) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    return (
        <>

            <div
                id={`slide${i}`}
                style={{ backgroundImage: `url(${item.images[0]})`, ...holderDivStyle }}
                className="carousel-item relative w-full h-full hover:cursor-pointer "
                onClick={() => { navigate("/product"); dispatch(setSingleProductData({ id: item.id })) }}
            >
                <img src={item.thumbnail}
                    className=" w-full  object-contain rounded"
                />

                <p className=" absolute left-1/2 bottom-3 -translate-x-1/2 text-2xl text-teal-300">
                    {item.title} @

                    {
                        item.discountPercentage
                            ?
                            <span className={`text-lg text-end font-medium `}> <span className=' text-sm font-thin line-through'>₹{item.price}</span> ₹{Math.round(item.price - ((item.discountPercentage * item.price) / 100))}</span>

                            :
                            <span className={`text-lg text-end font-medium `}> ₹{item.price} </span>

                    }
                </p>

                <div 
                className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/2"
                onClick={ (e)=>{e.stopPropagation()} }
                >
                    <a href={`#slide${(i !== 0) ? i - 1 : crousalItems.length - 1}`} className="btn btn-circle bg-transparent border-0 text-4xl ml-0">❮</a>
                    <a href={`#slide${(i !== crousalItems.length - 1) ? i + 1 : 0}`} className="btn btn-circle bg-transparent border-0 text-4xl ml-0">❯</a>
                </div>
            </div>


        </>
    )
}

export default SingleCrousel
