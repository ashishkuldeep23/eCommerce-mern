

import { useSelector } from "react-redux"


import { RootState } from "../../store"

const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },

  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 6,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 7,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },

  {
    id: 8,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },


  // More products...
]






export default function ProductLists() {



  const themeMode = useSelector((store: RootState) => store.themeReducer.mode)



  const styleOfCatgioryDiv = {
    paddingRight : 0 ,
  }


  return (
    <div className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"}`} style={styleOfCatgioryDiv} >

      <div className="mx-auto  px-4 pt-10 sm:px-6  lg:max-w-7xl lg:px-8   flex flex-col " style={styleOfCatgioryDiv}>

        <div>
          <h2 className=" text-2xl font-bold underline">Category</h2>
        </div>

        <h2 className="sr-only">Products</h2>
        <div className=" flex flex-wrap flex-col overflow-y-hidden overflow-x-auto my-2 h-96 ">

          {products.map((product) => (
            <a key={product.id} href={product.href} className=" w-72 h-52  mx-2 ">
              <div className=" rounded-lg overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} mt-4 `}>{product.name}</h3>
              <p className={`mt-1 text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} mb-20`}>{product.price}</p>
            </a>
          ))}

        </div>
      </div>






      <div className="mx-auto  px-4 pt-10 sm:px-6  lg:max-w-7xl lg:px-8   flex flex-col " style={styleOfCatgioryDiv}>

        <div>
          <h2 className=" text-2xl font-bold underline">Category</h2>
        </div>

        <h2 className="sr-only">Products</h2>
        <div className=" flex flex-wrap flex-col overflow-y-hidden overflow-x-auto my-2 h-96 ">

          {products.map((product) => (
            <a key={product.id} href={product.href} className=" w-72 h-52  mx-2 ">
              <div className=" rounded-lg overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} mt-4 `}>{product.name}</h3>
              <p className={`mt-1 text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} mb-20`}>{product.price}</p>
            </a>
          ))}

        </div>
      </div>






      <div className="mx-auto  px-4 pt-10 sm:px-6  lg:max-w-7xl lg:px-8   flex flex-col " style={styleOfCatgioryDiv}>

        <div>
          <h2 className=" text-2xl font-bold underline">Category</h2>
        </div>

        <h2 className="sr-only">Products</h2>
        <div className=" flex flex-wrap flex-col overflow-y-hidden overflow-x-auto my-2 h-96 ">

          {products.map((product) => (
            <a key={product.id} href={product.href} className=" w-72 h-52  mx-2 ">
              <div className=" rounded-lg overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} mt-4 `}>{product.name}</h3>
              <p className={`mt-1 text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} mb-20`}>{product.price}</p>
            </a>
          ))}

        </div>
      </div>






      <div className="mx-auto  px-4 pt-10 sm:px-6  lg:max-w-7xl lg:px-8   flex flex-col " style={styleOfCatgioryDiv}>

        <div>
          <h2 className=" text-2xl font-bold underline">Category</h2>
        </div>

        <h2 className="sr-only">Products</h2>
        <div className=" flex flex-wrap flex-col overflow-y-hidden overflow-x-auto my-2 h-96 ">

          {products.map((product) => (
            <a key={product.id} href={product.href} className=" w-72 h-52  mx-2 ">
              <div className=" rounded-lg overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} mt-4 `}>{product.name}</h3>
              <p className={`mt-1 text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} mb-20`}>{product.price}</p>
            </a>
          ))}

        </div>
      </div>






      <div className="mx-auto  px-4 pt-10 sm:px-6  lg:max-w-7xl lg:px-8   flex flex-col " style={styleOfCatgioryDiv}>

        <div>
          <h2 className=" text-2xl font-bold underline">Category</h2>
        </div>

        <h2 className="sr-only">Products</h2>
        <div className=" flex flex-wrap flex-col overflow-y-hidden overflow-x-auto my-2 h-96 ">

          {products.map((product) => (
            <a key={product.id} href={product.href} className=" w-72 h-52  mx-2 ">
              <div className=" rounded-lg overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className={` ${!themeMode ? "text-gray-700" : " text-gray-100 "} mt-4 `}>{product.name}</h3>
              <p className={`mt-1 text-lg font-medium ${!themeMode ? "text-gray-900" : "text-gray-300"} mb-20`}>{product.price}</p>
            </a>
          ))}

        </div>
      </div>







    </div>
  )
}







