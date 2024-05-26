
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { IProduct } from "../ProductListing/ProductLists"
import { useNavigate } from 'react-router-dom';
import { setSingleProductData } from '../../Slices/AllProductSlice';
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


                    (crousalItems && crousalItems.length < 0)

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

                                crousalItems.map((item, i) => <SingleCrouselForOriginalData item={item} key={i} />)




                            }



                            {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}



                        </ReactSimplyCarousel>

                        :

                        // // // This is Dummy crousel ( With some slides onliy  )
                        <div className=' animate-pulse'>


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

                                <div
                                    className='relative px-2 withAllImp singleCrousel   h-crH hover:cursor-pointer bg-[#175462]'
                                >

                                    <span className=' absolute top-1 right-3 border px-2 rounded-full '>1</span>
                                    <p className=' text-center font-semibold text-3xl'>This is an E-commerce clone web app.</p>
                                    <p className=' text-center text-xl font-semibold'>Made by using ReactJS, NodeJS, TypeScript, TailwindCSS,MongoDB, etc.</p>

                                </div>

                                <div
                                    className='relative px-2 withAllImp singleCrousel  h-crH hover:cursor-pointer bg-[#065535]'
                                >
                                    <span className=' absolute top-1 right-3 border px-2 rounded-full '>2</span>
                                    <p className=' text-center font-semibold text-3xl'>Deployed on Vercel and Render.</p>
                                    <p className=' text-center text-xl font-semibold'>Web hosting platform.</p>
                                </div>
                                <div
                                    className='relative px-2  withAllImp singleCrousel h-crH hover:cursor-pointer bg-[#000000]'
                                >
                                    <span className=' absolute top-1 right-3 border px-2 rounded-full '>3</span>
                                    <p className=' text-center font-semibold text-3xl'>Developed by Ashish Kuldeep.</p>
                                    <p className=' text-center text-xl font-semibold'>A self-made MERN developer.</p>
                                </div>
                                <div className='relative px-2 withAllImp singleCrousel  h-crH hover:cursor-pointer bg-[#893a32]'
                                >
                                    <span className=' absolute top-1 right-3 border px-2 rounded-full '>4</span>
                                    <p className=' text-center font-semibold text-3xl'>I created more than 5 MERN stack projects.</p>
                                    <p className=' text-center text-md font-semibold'>Such as food delivery, chatting app, e-commerce, social media app, Video sharing app, etc.</p>
                                </div>

                                <div className='relative px-2 withAllImp singleCrousel   h-crH hover:cursor-pointer bg-[#241b5d]'
                                >
                                    <span className=' absolute top-1 right-3 border px-2 rounded-full'>5</span>
                                    <p className=' text-center font-semibold text-2xl'>ReactJs, NodeJs, MongoDB, TypeScript, TailwindCSS, Redux, Redux Tool Kit, NextJs, React Native, HTML, CSS, JS.</p>
                                    <p className=' text-center text-md font-semibold'>Main skills I have.</p>
                                </div>


                                <div className=' relative px-2 withAllImp singleCrousel   h-crH hover:cursor-pointer bg-[#812378]'
                                >
                                    <span className=' absolute top-1 right-3 border px-2 rounded-full'>6</span>
                                    <p className=' text-center font-semibold text-3xl'>Looking for opportunities.</p>
                                    <p className=' text-center text-xl font-semibold'>To work and gain experience.</p>
                                </div>



                            </ReactSimplyCarousel>


                        </div>



                }




            </div>

        </div>

    );
}

export default NewCrousel





function SingleCrouselForOriginalData({ item }: { item: IProduct }) {

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
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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




