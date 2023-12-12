
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { IProduct } from "../ProductListing/ProductLists"
import { useNavigate } from 'react-router-dom';
import {setSingleProductData } from '../../Slices/AllProductSlice';
import { fetchOneProductByID } from '../../Slices/AllProductSlice';


const NewCrousel = () => {

    const themeMode = useSelector((store: RootState) => store.themeReducer.mode)
    const crousalItems: IProduct[] = useSelector((store: RootState) => store.allProductWithCatReducer.allHighlightProducts)
    // // // taking first 4 items as highlights and showing in to crousel / Now this doing on app.jsx after getting data.


    const [activeSlideIndex, setActiveSlideIndex] = useState(0);



    return (

        <div className={`p-1 pt-10 sm:pt-10 sm:p-5  overflow-hidden flex justify-center ${!themeMode ? "bg-white" : 'bg-black'} `}>


            <div className={` border overflow-hidden rounded-xl sm:rounded-3xl`} id='crouselHolderDiv'>


                {


                    (crousalItems && crousalItems.length > 0)

                        ?

                        // // // This is main crousel (When real data come then it will displayed  )

                        <ReactSimplyCarousel

                            activeSlideIndex={activeSlideIndex}
                            onRequestChange={setActiveSlideIndex}
                            itemsToShow={1}
                            itemsToScroll={1}
                            forwardBtnProps={{
                                //here you can also pass className, or any other button element attributes
                                style: {
                                    right: "10%",
                                },
                                className: ' crouselBtn ',
                                children: <span>{`❯`}</span>,
                            }}
                            backwardBtnProps={{
                                //here you can also pass className, or any other button element attributes
                                style: {
                                    left: "10%",
                                },
                                className: ' crouselBtn ',
                                children: <span>{`❮`}</span>,
                            }}
                            responsiveProps={[
                                {
                                    itemsToShow: 1,
                                    itemsToScroll: 1,
                                    minWidth: 768,
                                },
                            ]}
                            speed={500}
                            autoplayDelay={2000}
                            easing="linear"
                            autoplay={true}
                            autoplayDirection="forward"
                        >

                            {

                                crousalItems.map((item, i) => <SingleCrousel item={item} key={i} />)




                            }



                            {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}



                        </ReactSimplyCarousel>

                        :

                        // // // This is Dummy crousel ( With some slides onliy  )

                        <div className='animate-pulse'>


                            <ReactSimplyCarousel

                                activeSlideIndex={activeSlideIndex}
                                onRequestChange={setActiveSlideIndex}
                                itemsToShow={1}
                                itemsToScroll={1}
                                forwardBtnProps={{
                                    //here you can also pass className, or any other button element attributes
                                    style: {
                                        right: "10%",
                                    },
                                    className: ' crouselBtn ',
                                    children: <span>{`❯`}</span>,
                                }}
                                backwardBtnProps={{
                                    //here you can also pass className, or any other button element attributes
                                    style: {
                                        left: "10%",
                                    },
                                    className: ' crouselBtn ',
                                    children: <span>{`❮`}</span>,
                                }}
                                responsiveProps={[
                                    {
                                        itemsToShow: 1,
                                        itemsToScroll: 1,
                                        minWidth: 768,
                                    },
                                ]}
                                speed={500}
                                autoplayDelay={2000}
                                easing="linear"
                                autoplay={true}
                                autoplayDirection="forward"
                            >

                                <div className='  withAllImp singleCrousel   h-crH hover:cursor-pointer' style={{ background: '#ffc0cb' }}>
                                    slide 1
                                </div>

                                <div className='  withAllImp singleCrousel  h-crH hover:cursor-pointer' style={{ background: '#065535' }}>
                                    slide 2
                                </div>
                                <div className='  withAllImp singleCrousel   h-crH hover:cursor-pointer' style={{ background: '#000000' }}>
                                    slide 3
                                </div>
                                <div className=' withAllImp singleCrousel  h-crH hover:cursor-pointer' style={{ background: '#ffe4e1' }}>
                                    slide 4
                                </div>

                                <div className=' withAllImp singleCrousel   h-crH hover:cursor-pointer' style={{ background: '#ffffff' }}>
                                    slide 5
                                </div>



                            </ReactSimplyCarousel>


                        </div>



                }




            </div>

        </div>

    );
}

export default NewCrousel





function SingleCrousel({ item }: { item: IProduct }) {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()


    const holderDivStyle = {
        backgroundRepeat: "repeat-x",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "hue(120deg)",
        backgroundSize: "contain",
    }
    return (
        <>
            <div className='withAllImp singleCrousel  flex justify-center  h-crH hover:cursor-pointer'>

                <div
                    style={{ backgroundImage: `url(${item.images[1]})`, ...holderDivStyle }}
                    className="carousel-item   h-full hover:cursor-pointer box-content flex justify-around  w-full  "
                    onClick={(e : React.MouseEvent<HTMLDivElement, MouseEvent>) => { 
                        e.stopPropagation();
                        navigate(`/product/${item.id}`); 
                        dispatch(setSingleProductData({ id: item.id })); 
                        dispatch(fetchOneProductByID({ productId: item.id })); 
                        // dispatch(setSingleOProductId({ id: item.id })) 
                        window.scroll(0, 0);
                    }}
                >


                    <p className=" text-sm md:text-3xl text-teal-300 text-center  absolute bottom-5 ">
                        {item.title} :

                        {
                            item.discountPercentage
                                ?
                                <span className={`text-end font-medium `}> <span className=' text-sm font-thin line-through'>₹{item.price}</span> ₹{Math.round(item.price - ((item.discountPercentage * item.price) / 100))}</span>

                                :
                                <span className={`text-end font-medium `}> ₹{item.price} </span>
                        }
                    </p>



                    {/* <div
            className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/2"
            onClick={(e) => { e.stopPropagation() }}
        >
        </div> */}

                </div>


            </div>
        </>
    )
}




