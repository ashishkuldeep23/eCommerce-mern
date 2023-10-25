import { useEffect, useState, useRef } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'

import { addItemInCart } from '../../Slices/CartSlice'

import {  toast } from "react-toastify"
import 'react-toastify/ReactToastify.css';

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

const reviews = { href: '#', average: 4, totalCount: 117 }


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}


export default function ProductDetails() {
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const dispatch = useDispatch()

    // const [productDetailByApi , setProductDetailByApi] = useState([])


    const productDetailByFilter = useSelector((store: RootState) => store.allProductWithCatReducer.singleProductData)

    // const cardData = useSelector((state : RootState) => state.CartReducer.cartData)

    // console.log(productDetailByFilter)



    function addToCartHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        // console.log(productDetailByFilter)

        e.stopPropagation();
        e.preventDefault();

        const { id, title, price  } = productDetailByFilter

        if (!id && !title && !price) {
            console.log("Page is Empty");
            return alert("Page is Empty , go to home and try again");
        }

        let addaleCartItem = { ...productDetailByFilter, quantity: 1, verity: { a: 1 } }

        dispatch(addItemInCart(addaleCartItem))    // // // Adding into cart state

        // localStorage.setItem("cardData", JSON.stringify([...cardData , addaleCartItem ]))

        // // Sending Alert
        toast.success(`${title}, added in cart`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });


    }



    const mainDivRef = useRef<HTMLDivElement>(null)  // // Generics should given outerwise it will give err.

    useEffect(() => {

        mainDivRef?.current?.focus()
        // // this is not scrooling window


        window.scroll(0, 0)   // // // This line is responsibil for scrooling the window


        // console.log("Calling Backend...")
    }, [])

    return (

        <>


            <div
                className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} w-full`}

            >

                {
                    (productDetailByFilter && Object.keys(productDetailByFilter).length > 0)
                        ?
                        <div className="mx-auto max-w-full  md:max-w-allAk px-1 md:px-2 lg:px-8" ref={mainDivRef}>
                            <div className="pt-6 ">


                                {/* Image gallery with about product */}
                                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 ">

                                    {/* Image div here */}
                                    <div className="grid  gap-1 grid-cols-2">
                                        {/* <img
                                            src={product.images[3].src}
                                            alt={product.images[3].alt}
                                            className="h-full w-full object-cover object-center"
                                        /> */}


                                        {/* Now use map ---> */}

                                        {
                                            (productDetailByFilter && productDetailByFilter.images.length > 0)
                                                ?

                                                productDetailByFilter.images.map((image, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <img
                                                                src={image}
                                                                alt={productDetailByFilter.title}
                                                                className="h-full w-full rounded object-cover object-center hover:scale-95 transition-all"
                                                            />
                                                        </div>
                                                    )

                                                })



                                                :
                                                <div>

                                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3XKEJqpEWVLFp2gWAKNHFoarWaOReT23c4b8nWb7&s' />
                                                </div>

                                        }



                                    </div>

                                    {/* Options and about product */}
                                    <div className="mt-4 lg:row-span-3 lg:mt-0  flex flex-col justify-center">
                                        <h2 className="sr-only">Product information</h2>
                                        <p className="text-3xl tracking-tight  text-center font-bold capitalize underline">{productDetailByFilter.title}</p>
                                        {/* <p className="text-3xl tracking-tight ">₹{productDetailByFilter.price}</p> */}

                                        {
                                            productDetailByFilter.discountPercentage
                                                ?
                                                <p className={`text-2xl text-start font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> <span className=' text-sm font-thin line-through'>₹{productDetailByFilter.price}</span> ₹{Math.round(productDetailByFilter.price - ((productDetailByFilter.discountPercentage * productDetailByFilter.price) / 100))}</p>

                                                :
                                                <p className={`text-lg text-end font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} `}> ₹{productDetailByFilter.price} </p>

                                        }

                                        {/* Reviews */}
                                        <div className="mt-6">
                                            <h3 className="sr-only">Reviews</h3>
                                            <div className="flex items-center">
                                                {/* <div className="flex items-center"> */}
                                                {/* How many start should appare code here */}
                                                {/* {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                reviews.average > rating ? `${!themeMode ? "text-gray-900" : "text-gray-200"}` : `${!themeMode ? "text-gray-300" : "text-gray-600"}`,
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))} */}



                                                <div className="flex items-center">
                                                    {

                                                        Array.from(Array(5)).map((item, i) => {
                                                            return (
                                                                <StarIcon
                                                                    key={i}
                                                                    id={item}  // // // Id not used anyWhere 
                                                                    className={` h-5 w-5 flex-shrink-0
                                                    ${i < (Math.round(productDetailByFilter.rating)) ? `${!themeMode ? "text-gray-900" : "text-gray-200"}` : `${!themeMode ? "text-gray-300" : "text-gray-600"}`}
                                                    `}

                                                                />
                                                            )
                                                        })
                                                    }
                                                    <p className=' font-bold pl-1'>{productDetailByFilter.rating}</p>
                                                </div>



                                                {/* </div> */}
                                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                                                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                    {reviews.totalCount} reviews
                                                </a>
                                            </div>
                                        </div>

                                        <form className="mt-10">
                                            {/* Colors */}
                                            <div>
                                                <h3 className="text-sm font-medium ">Color</h3>

                                                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                                    <div className="flex items-center space-x-3">
                                                        {product.colors.map((color) => (
                                                            <RadioGroup.Option
                                                                key={color.name}
                                                                value={color}
                                                                className={({ active, checked }) =>
                                                                    classNames(
                                                                        color.selectedClass,
                                                                        active && checked ? 'ring ring-offset-1' : '',
                                                                        !active && checked ? 'ring-2' : '',
                                                                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                                    )
                                                                }
                                                            >
                                                                <RadioGroup.Label as="span" className="sr-only">
                                                                    {color.name}
                                                                </RadioGroup.Label>
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        color.class,
                                                                        'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                                    )}
                                                                />
                                                            </RadioGroup.Option>
                                                        ))}
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            {/* Sizes */}
                                            <div className="mt-10">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-medium">Size</h3>
                                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                        Size guide
                                                    </a>
                                                </div>

                                                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                        {product.sizes.map((size) => (
                                                            <RadioGroup.Option
                                                                key={size.name}
                                                                value={size}
                                                                disabled={!size.inStock}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        size.inStock
                                                                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                                        active ? 'ring-2 ring-indigo-500' : '',
                                                                        'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                                    )
                                                                }
                                                            >
                                                                {({ active, checked }) => (
                                                                    <>
                                                                        <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                                        {size.inStock ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    active ? 'border' : 'border-2',
                                                                                    checked ? 'border-indigo-500' : 'border-transparent',
                                                                                    'pointer-events-none absolute -inset-px rounded-md'
                                                                                )}
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <span
                                                                                aria-hidden="true"
                                                                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                            >
                                                                                <svg
                                                                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                                    viewBox="0 0 100 100"
                                                                                    preserveAspectRatio="none"
                                                                                    stroke="currentColor"
                                                                                >
                                                                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                                </svg>
                                                                            </span>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </RadioGroup.Option>
                                                        ))}
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            <button
                                                type="submit"
                                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCartHandler(e) }}
                                            >
                                                Add to Cart
                                            </button>
                                        </form>
                                    </div>

                                </div>



                                {/* This is the code for project details */}
                                {/* Product info */}
                                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16  " >
                                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl capitalize underline">{product.name}</h1>
                                    </div>



                                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                        {/* Description and details */}
                                        <div>
                                            <h3 className="sr-only">Description</h3>

                                            <div className="space-y-6">
                                                <p className="text-base ">{product.description}</p>
                                            </div>
                                        </div>

                                        <div className="mt-10">
                                            <h3 className="text-sm font-medium ">Highlights</h3>

                                            <div className="mt-4">
                                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                                    {product.highlights.map((highlight) => (
                                                        <li key={highlight} className="">
                                                            <span className="">{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-10">
                                            <h2 className="text-sm font-medium ">Details</h2>

                                            <div className="mt-4 space-y-6">
                                                <p className="text-sm ">{product.details}</p>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>

                        :
                        <p className='text-2xl'>There is something problem </p>

                }
            </div>

        </>
    )
}
