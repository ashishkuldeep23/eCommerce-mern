import { Fragment } from "react"
import SingleCrousel from "./SingleCrousel"
import { useSelector} from "react-redux"
import { RootState } from "../../store"

import { IProduct } from "../ProductListing/ProductLists"

// export type ItemsType = {
//     id: number,
//     name: string,
//     href: string,
//     imageSrc: string,
//     imageAlt: string,
//     price: string
// }



// const crousalItems: ItemsType[] = [

//     {
//         id: 2,
//         name: 'Nomad Tumbler',
//         href: '#',
//         price: '$35',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
//         imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
//     },
//     {
//         id: 1,
//         name: 'Earthen Bottle',
//         href: '#',
//         price: '$48',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
//         imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
//     },

//     {
//         id: 3,
//         name: 'Focus Paper Refill',
//         href: '#',
//         price: '$89',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
//         imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
//     },
//     {
//         id: 4,
//         name: 'Machined Mechanical Pencil',
//         href: '#',
//         price: '$35',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//         imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//     },
// ]






const Crousal = () => {

    const themeMode = useSelector( (store : RootState)=> store.themeReducer.mode )

    // const allProductList = useSelector( (store : RootState)=>store.allProductWithCatReducer.allProducts )


    const crousalItems : IProduct[] = useSelector( (store : RootState) => store.allProductWithCatReducer.allHighlightProducts )
    // // // taking first 4 items as highlights and showing in to crousel / Now this doing on app.jsx after getting data.


    return (
        <>

            <div id="crouselHolderDiv" className={` ${!themeMode ? "bg-white" : 'bg-black' }  `}>


                <div className='mx-auto h-full px-1 sm:px-6 max-w-full md:max-w-allAk md:px-2 lg:px-8  p-2 pt-16  border-green-950  flex flex-col'>



                    <div className="carousel w-full rounded-lg outline outline-2 outline-offset-8 outline-green-200">

                        {

                            crousalItems.map((item, i) => {
                                return (
                                    <Fragment key={i}>

                                        <SingleCrousel item={item} i={i} crousalItems={crousalItems} />

                                    </Fragment>
                                )
                            }
                            )
                        }




                        {/* <div id="slide2" className="carousel-item relative w-full h-80 ">
                                    <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg" className="w-full object-contain" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                        <a href="#slide1" className="btn btn-circle">❮</a>
                                        <a href="#slide3" className="btn btn-circle">❯</a>
                                    </div>
                                </div>

                                <div id="slide3" className="carousel-item relative w-full h-80 ">
                                    <img src="/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                        <a href="#slide2" className="btn btn-circle">❮</a>
                                        <a href="#slide4" className="btn btn-circle">❯</a>
                                    </div>
                                </div>

                                <div id="slide4" className="carousel-item relative w-full h-80 ">
                                    <img src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                        <a href="#slide3" className="btn btn-circle">❮</a>
                                        <a href="#slide1" className="btn btn-circle">❯</a>
                                    </div>
                                </div> */}

                    </div>


                </div>


            </div>

        </>
    )
}

export default Crousal

