
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { IProduct } from "../ProductListing/ProductLists"
import { useNavigate } from 'react-router-dom';
import { setSingleProductData } from '../../Slices/AllProductSlice';
import { fetchOneProductByID } from '../../Slices/AllProductSlice';
// import { userState } from '../../Slices/UserSlice';
// import { setProductData, setUpdatingProduct } from '../../Slices/AdminSliceFile';


const NewCrousel = () => {

    const themeMode = useSelector((store: RootState) => store.themeReducer.mode)
    const crousalItems: IProduct[] = useSelector((store: RootState) => store.allProductWithCatReducer.allHighlightProducts)
    // // // taking first 4 items as highlights and showing in to crousel / Now this doing on app.jsx after getting data.


    const [activeSlideIndex, setActiveSlideIndex] = useState(0);


    type SingleCrouselConetnt = {
        bgColor: string,
        mainHeading: string,
        subHeading: string,
        mainHeadingText?: string,
        subHeadingText?: string
    }


    const dummyCrouselContent: SingleCrouselConetnt[] = [
        {
            bgColor: "bg-[#175462]",
            mainHeading: 'This is an E-commerce clone web app.',
            subHeading: "Made by using ReactJS, NodeJS, TypeScript, TailwindCSS,MongoDB, etc.",
            mainHeadingText: "text-3xl",
            subHeadingText: "text-xl"
        },
        {
            bgColor: "bg-[#065535]",
            mainHeading: "Deployed on Vercel and Render.",
            subHeading: "Web hosting platform.",
            mainHeadingText: "text-3xl",
            subHeadingText: "text-xl"
        },
        {
            bgColor: "bg-[#000000]",
            mainHeading: "Developed by Ashish Kuldeep.",
            subHeading: "A self-made MERN developer.",
            mainHeadingText: "text-3xl",
            subHeadingText: "text-xl"
        },
        {
            bgColor: "bg-[#893a32]",
            mainHeading: "I created more than 5 MERN stack projects.",
            subHeading: "Such as food delivery, chatting app, e-commerce, social media app, Video sharing app, etc.",
            mainHeadingText: "text-3xl",
            subHeadingText: "text-md"
        },
        {
            bgColor: "bg-[#241b5d]",
            mainHeading: "ReactJs, NodeJs, MongoDB, TypeScript, TailwindCSS, Redux, Redux Tool Kit, NextJs, React Native, HTML, CSS, JS.",
            subHeading: "Main skills I have.",
            mainHeadingText: "text-xl",
            subHeadingText: "text-md"
        },
        {
            bgColor: "bg-[#812378]",
            mainHeading: "Looking for opportunities.",
            subHeading: "To work and gain experience.",
            mainHeadingText: "text-2xl",
            subHeadingText: "text-lg"
        }
    ]



    return (

        <div className={`p-1 pt-10 overflow-hidden flex justify-center ${!themeMode ? "bg-white" : 'bg-black'} `}>


            <div
                className={`overflow-hidden rounded-xl sm:rounded-3xl w-[100%]`}
            // id='crouselHolderDiv'
            >


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
                            speed={750}
                            autoplayDelay={2500}
                            easing="linear"
                            autoplay={true}
                            autoplayDirection="forward"
                        >

                            {

                                crousalItems.map((item, i) => <SingleCrouselForOriginalData
                                    item={item}
                                    key={i}
                                    activeSlideIndex={activeSlideIndex}
                                    index={i}
                                />)

                            }



                            {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}



                        </ReactSimplyCarousel>

                        :

                        // // // This is Dummy crousel ( With some slides onliy  )
                        <div className=' rounded-xl sm:rounded-3xl overflow-hidden'>
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
                                speed={750}
                                autoplayDelay={2500}
                                easing="linear"
                                autoplay={true}
                                autoplayDirection="forward"
                            >


                                {
                                    dummyCrouselContent.map((ele, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className={` !w-[97.5vw] relative px-2 withAllImp singleCrousel rounded-xl sm:rounded-3xl h-crH hover:cursor-pointer ${ele.bgColor} `}
                                            >
                                                <span className=' absolute top-1 right-3 lg:right-14  border px-1.5 py-[1px] text-xs rounded-full font-semibold'>{i + 1}</span>

                                                <p className={`text-center font-semibold ${ele.mainHeadingText || "text-3xl"} `}>{ele.mainHeading}</p>
                                                <p className={`text-center font-semibold ${ele.subHeadingText || "text-xl"} `}>{ele.subHeading}</p>

                                                {
                                                    (i === dummyCrouselContent.length - 1)
                                                    &&
                                                    <p className=' font-semibold text-lg'>Thank you🙂</p>
                                                }

                                            </div>
                                        )
                                    })
                                }

                            </ReactSimplyCarousel>
                        </div>

                }

            </div>

        </div>

    );
}

export default NewCrousel



function SingleCrouselForOriginalData({ item, activeSlideIndex, index }: { item: IProduct, activeSlideIndex: number, index: number }) {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    // const themeMode = useSelector((state: RootState) => state.themeReducer.mode)


    // const userData = userState().userData
    // // // This style is given to every crousel slide.
    const holderDivStyle = {
        backgroundRepeat: "repeat-x",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "hue(120deg)",
        backgroundSize: "contain",
    }


    return (
        <>
            <div className={`!w-[97.5vw] singleCrousel  flex justify-center  h-crH rounded-xl sm:rounded-3xl overflow-hidden hover:cursor-pointer relative 
                    ${index !== activeSlideIndex && " scale-y-75"} transition-all duration-1000`
            }>

                <div
                    style={
                        {
                            backgroundImage: `url("https://thumbs.dreamstime.com/b/error-rubber-stamp-word-error-inside-illustration-109026446.jpg")`,
                            ...holderDivStyle
                        }
                    }
                    className=' h-full w-full absolute top-0 left-0 bg-red-500 -z-[1] rounded-xl sm:rounded-3xl overflow-hidden'
                >

                </div>


                <div
                    style={{ backgroundImage: `url(${item.images[1]})`, ...holderDivStyle }}
                    className="carousel-item h-full hover:cursor-pointer box-content flex justify-around  w-full  "
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


                        {/* {
                            userData.role === "admin"
                            &&
                            <span
                                className={` ml-4 z-10 sticky top-16  left-full px-2 py-1 border border-green-400 m-2 rounded   `}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate("/admin");
                                    dispatch(setProductData(item));
                                    dispatch(setUpdatingProduct(true));
                                }}
                            >
                                <span className=' font-semibold'>Edit</span> <i className="ri-pencil-line"></i>
                            </span>
                        } */}


                    </p>





                </div>


            </div>
        </>
    )
}



