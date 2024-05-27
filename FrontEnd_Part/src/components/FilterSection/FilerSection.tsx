import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'


import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { fetchAllProducts, setSearchBrandAndCate, setSortByPriceChange } from '../../Slices/AllProductSlice'
import Pagination from '../Pagination/Pagination'


const sortOptions = [
    // { name: 'Best Rating', href: '#', current: false },
    { name: 'Price: Low to High', value: "acc", current: false },
    { name: 'Price: High to Low', value: "dec", current: false },
]


const filters = [
    {
        id: 'brand',
        name: 'Brand',
        options: [
            { value: "Apple", label: "Apple", checked: true },
            { value: "Samsung", label: "Samsung", checked: false },
            { value: "OPPO", label: "OPPO", checked: false },
            { value: "Huawei", label: "Huawei", checked: false },
            { value: "Microsoft Surface", label: "Microsoft Surface", checked: false },
            { value: "Infinix", label: "Infinix", checked: false },
            { value: "HP Pavilion", label: "HP Pavilion", checked: false },
            { value: "Impression of Acqua Di Gio", label: "Impression of Acqua Di Gio", checked: false },
            { value: "Royal_Mirage", label: "Royal_Mirage", checked: false },
            { value: "Fog Scent Xpressio", label: "Fog Scent Xpressio", checked: false },
            { value: "Al Munakh", label: "Al Munakh", checked: false },
            { value: "Lord - Al-Rehab", label: "Lord - Al-Rehab", checked: false },
            { value: "L'Oreal Paris", label: "L'Oreal Paris", checked: false },
            { value: "Hemani Tea", label: "Hemani Tea", checked: false },
            { value: "Dermive", label: "Dermive", checked: false },
            { value: "ROREC White Rice", label: "ROREC White Rice", checked: false },
            { value: "Fair & Clear", label: "Fair & Clear", checked: false },
            { value: "Saaf & Khaas", label: "Saaf & Khaas", checked: false },
            { value: "Bake Parlor Big", label: "Bake Parlor Big", checked: false },
            { value: "Baking Food Items", label: "Baking Food Items", checked: false },
            { value: "fauji", label: "fauji", checked: false },
            { value: "Dry Rose", label: "Dry Rose", checked: false },
            { value: "Boho Decor", label: "Boho Decor", checked: false },
            { value: "Flying Wooden", label: "Flying Wooden", checked: false },
            { value: "LED Lights", label: "LED Lights", checked: false },
            { value: "luxury palace", label: "luxury palace", checked: false },
            { value: "Golden", label: "Golden", checked: false },
            { value: "Furniture Bed Set", label: "Furniture Bed Set", checked: false },
            { value: "Ratttan Outdoor", label: "Ratttan Outdoor", checked: false },
            { value: "Kitchen Shelf", label: "Kitchen Shelf", checked: false },
            { value: "Multi Purpose", label: "Multi Purpose", checked: false },
            { value: "AmnaMart", label: "AmnaMart", checked: false },
            { value: "Professional Wear", label: "Professional Wear", checked: false },
            { value: "Soft Cotton", label: "Soft Cotton", checked: false },
            { value: "Top Sweater", label: "Top Sweater", checked: false },
            { value: "RED MICKY MOUSE..", label: "RED MICKY MOUSE..", checked: false },
            { value: "Digital Printed", label: "Digital Printed", checked: false },
            { value: "Ghazi Fabric", label: "Ghazi Fabric", checked: false },
            { value: "IELGY", label: "IELGY", checked: false },
            { value: "IELGY fashion", label: "IELGY fashion", checked: false },
            { value: "Synthetic Leather", label: "Synthetic Leather", checked: false },
            { value: "Sandals Flip Flops", label: "Sandals Flip Flops", checked: false },
            { value: "Maasai Sandals", label: "Maasai Sandals", checked: false },
            { value: "Arrivals Genuine", label: "Arrivals Genuine", checked: false },
            { value: "Vintage Apparel", label: "Vintage Apparel", checked: false },
            { value: "FREE FIRE", label: "FREE FIRE", checked: false },
            { value: "The Warehouse", label: "The Warehouse", checked: false },
            { value: "Sneakers", label: "Sneakers", checked: false },
            { value: "Rubber", label: "Rubber", checked: false },
            { value: "Naviforce", label: "Naviforce", checked: false },
            { value: "SKMEI 9117", label: "SKMEI 9117", checked: false },
            { value: "Strap Skeleton", label: "Strap Skeleton", checked: false },
            { value: "Stainless", label: "Stainless", checked: false },
            { value: "Eastern Watches", label: "Eastern Watches", checked: false },
            { value: "Luxury Digital", label: "Luxury Digital", checked: false },
            { value: "Watch Pearls", label: "Watch Pearls", checked: false },
            { value: "Bracelet", label: "Bracelet", checked: false },
            { value: "LouisWill", label: "LouisWill", checked: false },
            { value: "Copenhagen Luxe", label: "Copenhagen Luxe", checked: false },
            { value: "Steal Frame", label: "Steal Frame", checked: false },
            { value: "Darojay", label: "Darojay", checked: false },
            { value: "Fashion Jewellery", label: "Fashion Jewellery", checked: false },
            { value: "Cuff Butterfly", label: "Cuff Butterfly", checked: false },
            { value: "Designer Sun Glasses", label: "Designer Sun Glasses", checked: false },
            { value: "mastar watch", label: "mastar watch", checked: false },
            { value: "Car Aux", label: "Car Aux", checked: false },
            { value: "W1209 DC12V", label: "W1209 DC12V", checked: false },
            { value: "TC Reusable", label: "TC Reusable", checked: false },
            { value: "Neon LED Light", label: "Neon LED Light", checked: false },
            { value: "METRO 70cc Motorcycle - MR70", label: "METRO 70cc Motorcycle - MR70", checked: false },
            { value: "BRAVE BULL", label: "BRAVE BULL", checked: false },
            { value: "shock absorber", label: "shock absorber", checked: false },
            { value: "JIEPOLLY", label: "JIEPOLLY", checked: false },
            { value: "Xiangle", label: "Xiangle", checked: false },
            { value: "lightingbrilliance", label: "lightingbrilliance", checked: false },
            { value: "Ifei Home", label: "Ifei Home", checked: false },
            { value: "DADAWU", label: "DADAWU", checked: false },
            { value: "YIOSI", label: "YIOSI", checked: false }
        ]
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'smartphones', label: 'smartphones', checked: true },
            { value: 'laptops', label: 'laptops', checked: false },
            { value: 'fragrances', label: 'fragrances', checked: false },
            { value: 'skincare', label: 'skincare', checked: false },
            { value: 'groceries', label: 'groceries', checked: false },
            { value: 'home-decoration', label: 'home-decoration', checked: false },
            { value: 'furniture', label: 'furniture', checked: false },
            { value: 'tops', label: 'tops', checked: false },
            { value: 'womens-dresses', label: 'womens-dresses', checked: false },
            { value: 'womens-shoes', label: 'womens-shoes', checked: false },
            { value: 'mens-shirts', label: 'mens-shirts', checked: false },
            { value: 'mens-shoes', label: 'mens-shoes', checked: false },
            { value: 'mens-watches', label: 'mens-watches', checked: false },
            { value: 'womens-watches', label: 'womens-watches', checked: false },
            { value: 'womens-bags', label: 'womens-bags', checked: false },
            { value: 'womens-jewellery', label: 'womens-jewellery', checked: false },
            { value: 'sunglasses', label: 'sunglasses', checked: false },
            { value: 'automotive', label: 'automotive', checked: false },
            { value: 'motorcycle', label: 'motorcycle', checked: false },
            { value: 'lighting', label: 'lighting', checked: false }
        ],
    },
]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }


export default function FilterSection({ children }: any) {

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const [newFilter, setNewFilter] = useState([...filters])

    // const [queryObj, setQueryObj] = useState({ brand: '', category: "" })


    const {brand , category } = useSelector((state : RootState)=>state.allProductWithCatReducer.searchBrandAndCate)

    const dispatch = useDispatch<AppDispatch>()

    const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

    const allCategory = useSelector((store: RootState) => store.allProductWithCatReducer.filterAllCateory)
    const allBrands = useSelector((store: RootState) => store.allProductWithCatReducer.filterAllBrands)

    const sortByPrice = useSelector((state: RootState) => state.allProductWithCatReducer.sortByPrice)


    type EventTypeOfOncahnge = React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement, Element>

    function onChngeHandlerOfFilter(e: EventTypeOfOncahnge, section: string, value: string) {

        e.stopPropagation()
        e.preventDefault()

        // console.log(section, value)



        // console.log("search here now -----> " , brand , category)


        if (section === "brand") {

            // setQueryObj({ ...queryObj, brand: value })

            dispatch(setSearchBrandAndCate( {brand : value , category : category }))

            dispatch(fetchAllProducts({ brand: value, category: category, price: sortByPrice }))
        }


        if (section === "category") {

            dispatch(setSearchBrandAndCate( {brand : brand , category : value}))

            // setQueryObj({ ...queryObj, category: value })

            dispatch(fetchAllProducts({ brand: brand, category: value, price: sortByPrice }))
        }


        window.scroll(0, 500)   // // // This line is responsibil for scrooling the window
    }



    type ClickEventForPrice = React.MouseEvent<HTMLAnchorElement, MouseEvent>

    function onClickHandlerForPrice(e: ClickEventForPrice, price: String) {


        e.stopPropagation()
        e.preventDefault()

        console.log(price)


        if (price === "acc") {


            // setQueryObj({...queryObj , price : "1"})
            dispatch(setSortByPriceChange({ newPrice: "1" }))
            dispatch(fetchAllProducts({ brand: brand, category: category, price: "1" }))
        }

        if (price === "dec") {
            // setQueryObj({...queryObj , price : "-1"})
            dispatch(setSortByPriceChange({ newPrice: "-1" }))
            dispatch(fetchAllProducts({ brand: brand, category: category, price: "-1" }))
        }


        window.scroll(0, 500)   // // // This line is responsibil for scrooling the window

        //  

    }



    useEffect(() => {

        // console.log(allBrands)
        // console.log(allCategory)

        if ((allBrands && allBrands.length > 0) && (allCategory && allCategory.length > 0)) {

            // // // Making Formate only --->
            let makeAllBrands = allBrands.map((brand) => { return { value: brand, label: brand, checked: false } })
            
            // console.log(makeAllBrands)
            // console.log(newFilter)
            
            // // // See the filter var 
            let optionObjForBrand = { ...filters[0] }
            
            optionObjForBrand.options = makeAllBrands
            
            
            
            
            // // // Making Formate only --->
            let makeAllCategory = allCategory.map((cate) => { return { value: cate, label: cate, checked: false } })
            // console.log(makeAllCategory)
            
            // // // See the filter var 
            let optionObjForCat = { ...filters[1] }

            optionObjForCat.options = makeAllCategory



            setNewFilter([optionObjForBrand, optionObjForCat])



        }





    }, [allCategory])



    return (
        <div className={`${!themeMode ? "bg-white text-gray-600 " : 'bg-black text-gray-300 '} `}>
            <div className='mx-auto max-w-full md:max-w-allAk px-1 md:px-2 '>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >

                                {/* Belw div  used to show filter in mobile or less then leptop */}
                                <Dialog.Panel className={` z-50 relative ml-auto flex h-full  sm:w-full  sm:max-w-xs  flex-col overflow-y-auto  py-4 pb-12 shadow-xl ${!themeMode ? "bg-white text-gray-600 " : 'bg-black text-gray-300 '} `}>

                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-2xl  font-bold underline ">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md  p-2 "
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters in mobile section */}
                                    <form className="mt-4 border-t border-green-300">
                                        {newFilter.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-green-300 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3 ">
                                                                <span className="font-medium ">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon className="h-5 w-5 text-green-300" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon className="h-5 w-5 text-green-300" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            // type="radio"
                                                                            defaultChecked={option.checked}
                                                                            onChange={(e) => { onChngeHandlerOfFilter(e, section.id, option.value) }}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 capitalize"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>


                {/* Below div is visiable in leptop or above screen */}
                <main className="mx-auto max-w-full md:max-w-allAk px-1 md:px-2 lg:px-8  p-2 pt-16 ">

                    {/* Left section  */}
                    <div className="flex flex-wrap items-baseline justify-between border-b border-gray-200 pb-6 ">
                        <h1 className="text-4xl font-bold tracking-tight ">Products</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className={`absolute -right-1/2 z-10 mt-2 w-40 origin-top-right rounded-md shadow-2xl ring-3 ring-blue-700 ring-opacity-5 focus:outline-none ${!themeMode ? "bg-white text-gray-600 " : 'bg-gray-800 text-gray-300 '} `}>
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {
                                                        <a
                                                            className={`${option.current ? 'font-medium ' : ''}   block px-4 py-2 text-sm `}
                                                            onClick={(e) => onClickHandlerForPrice(e, option.value)}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    }
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>


                            </Menu>



                            <button
                                type="button"
                                className="-m-2 ml-1 p-2  hover: sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    {/* Right section all products will visiable in this section  */}
                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1  gap-y-10 lg:grid-cols-6">
                            {/* Filters    leptop */}
                            <form className="hidden  lg:block">
                                {newFilter.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-green-300 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm ">
                                                        <span className="font-medium ">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5 text-green-300" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5 text-green-300" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    onChange={(e) => { onChngeHandlerOfFilter(e, section.id, option.value) }}
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    // type='radio'
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm capitalize "
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-5">{/* Your content */   children}</div>
                        </div>
                    </section>


                    <Pagination />

                </main>
            </div>
        </div>
    )
}