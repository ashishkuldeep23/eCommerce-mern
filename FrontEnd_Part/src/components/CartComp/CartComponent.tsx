import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { removeOneItem, onePlusQuan, oneMinusQuan } from '../../Slices/CartSlice'
import { setSingleProductData } from '../../Slices/AllProductSlice'
// import { useEffect } from 'react'

// const products = [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//     imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   // More products...
// ]



export type CartCompProp = {

  mainCartComp?: boolean

}



export default function CartComponent({ mainCartComp = true }: CartCompProp) {
  //   const [open, setCarOpen] = useState(true)

  const navigate = useNavigate()

  const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

  const cartData = useSelector((store: RootState) => store.CartReducer.cartData)


  const dispatch = useDispatch()




  // useEffect(() => {


  // }, [])


  return (


    <div className={` md:h-allAk  flex flex-col overflow-y-scroll shadow-xl ${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"}  `}>

      <div className=' max-w-full md:max-w-allAk px-1  lg:px-8 lg:mx-14'>

        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">

          {/* Go To Home Left presented */}
          <div className="flex items-start justify-between">

            {

              (mainCartComp)
                ?

                <div className="h-7 flex items-center w-full">
                  <button
                    type="button"
                    className=" relative ml-auto p-2 border-blue-500 border rounded font-bold  hover:bg-blue-500 hover:text-white transition-all"
                    onClick={() => { navigate("/") }}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close panel</span>
                    GoTo Home
                  </button>
                </div>

                :
                <div className="h-7 flex items-center w-full  text-center">
                  <p className='w-full text-center font-bold font-serif bg-green-50'>See Your Cart</p>
                </div>
            }
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-green-300">

                {

                  (cartData && cartData.length > 0)

                    ?
                    cartData.map((product) => (
                      <li key={product.id}
                        className="flex py-6"
                        onClick={() => { navigate("/product"); dispatch(setSingleProductData({ id: product.id })) }}
                      >

                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md  ">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium ">
                              <h3>
                                <a href={product.title}>{product.title}</a>
                              </h3>


                              <div className='text-end'>
                                {
                                  (product.quantity > 1)
                                    ?
                                    <>
                                      <p className="ml-4">₹{product.price * 70} X {product.quantity}</p>
                                      <p className={`ml-4 border-1 border-t border-1`}>₹{product.quantity * product.price * 70}</p>
                                    </>
                                    :
                                    <>
                                      <p className="ml-4">₹{product.quantity * product.price * 70}</p>
                                    </>
                                }
                              </div>


                            </div>
                            {/* <p className="mt-1 text-sm ">{product.verity}</p> */}
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">

                            <div className='flex flex-col items-center'>

                              <p className=" font-bold">Qty {product.quantity}</p>


                              {

                                (mainCartComp) &&

                                <div className='flex items-center border border-cyan-400 rounded my-1'>
                                  <button
                                    className=' bg-cyan-400 px-1 rounded mr-1 font-bold hover:bg-cyan-600'
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      (product.quantity === 1)
                                        ? dispatch(removeOneItem({ id: product.id }))
                                        : dispatch(oneMinusQuan({ data: product }))
                                    }}
                                  >

                                    {
                                      (product.quantity === 1)
                                        ? <i className="ri-delete-bin-2-line text-red-600"></i>
                                        : "-"
                                    }
                                  </button>
                                  <p className=' px-1 font-bold '>{product.quantity}</p>
                                  <button
                                    className=' bg-cyan-400 px-1 rounded ml-1  font-bold hover:bg-cyan-600'
                                    onClick={(e) => { e.stopPropagation(); dispatch(onePlusQuan({ data: product })) }}
                                  ><i className="ri-add-line"></i></button>
                                </div>


                              }

                            </div>

                            {
                              (mainCartComp) &&
                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-red-600 hover:text-red-500 rounded p-1 scale-125 hover:border hover:border-red-500"
                                  onClick={(e) => { e.stopPropagation(); dispatch(removeOneItem({ id: product.id })) }}
                                >
                                  <i className="ri-delete-bin-2-line"></i>
                                </button>
                              </div>
                            }

                          </div>
                        </div>

                      </li>
                    ))


                    :

                    <>

                      <li className='text-center text-2xl md:text-3xl font-bold mt-2 '>🛒Cart is Empty😔, Go to home and Shopping please😊 </li>

                    </>


                }

              </ul>
            </div>
          </div>
        </div>



        {/* This is total amount div with both btns */}
        {

          (mainCartComp) &&

          <>
            {

              (cartData && cartData.length > 0)

                ?
                <div className="border-t border-green-300 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium">
                    <p>Subtotal</p>
                    <p>₹262.00</p>
                  </div>
                  <p className="mt-0.5 text-sm ">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <Link
                      to={"/pay"}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm">
                    <p>
                      or
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                        onClick={() => navigate("/")}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>

                :
                <div className="border-t border-green-300 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium">
                    <p>Subtotal</p>
                    <p>NA</p>
                  </div>
                  <div className="mt-6">
                    <Link
                      to={"/pay"}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Shop Now
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm">
                    <p>
                      or
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                        onClick={() => navigate("/")}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>

                </div>
            }
          </>

        }




      </div>
    </div>


  )
}
