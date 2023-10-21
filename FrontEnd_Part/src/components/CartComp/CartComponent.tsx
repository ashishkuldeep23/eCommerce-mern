


import { Link, useNavigate } from 'react-router-dom'


const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]



import { useSelector } from 'react-redux'
import { RootState } from '../../store'


export default function CartComponent() {
  //   const [open, setCarOpen] = useState(true)

  const navigate = useNavigate()

  const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

  return (


    <div className={` h-allAk flex flex-col overflow-y-scroll shadow-xl ${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"}  `}>

      <div className=' max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8 md:mx-8 lg:mx-14'>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
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
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium ">
                          <h3>
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm ">{product.color}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="">Qty {product.quantity}</p>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium">
            <p>Subtotal</p>
            <p>$262.00</p>
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


      </div>
    </div>


  )
}
