
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from "react-router-dom"



const navigation = [
    { name: 'My Orders', href: '#', current: true },
    { name: 'AAAA', href: '#', current: false },
    { name: 'AAAA', href: '#', current: false },
    // { name: 'Team', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
]






import { useSelector, useDispatch } from "react-redux";
import { toggleModeValue } from '../../Slices/ThemeSlices'
import { RootState } from '../../store'


export default function NavBar() {

    const navigate = useNavigate()

    const navigatetabs = useNavigate()

    const themeDispatch = useDispatch()

    const themeSate = useSelector((store: RootState) => store.themeReducer.mode)

    return (


        <Disclosure as="nav" className="bg-gray-800 border-b-2 border-green-200">
            {({ open }) => (
                <>
                    <div className=" mx-auto max-w-full md:max-w-allAk px-1  md:px-8 ">
                        <div className="relative flex h-16 items-center justify-between">



                            {/* This div will visiable on less then md devices */}
                            <div className="absolute inset-y-0 left-0 flex items-center md:hidden" onClick={() => { navigatetabs("/"), { replace: true } }}>

                                <div className="flex flex-shrink-0 items-center ">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                    />
                                </div>


                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">


                                <div className=" hidden md:flex flex-shrink-0 items-center hover:cursor-pointer  " onClick={() => { navigatetabs("/"), { replace: true } }} >
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                    />
                                </div>


                                <div className="hidden md:ml-6 md:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item, i) => (
                                            <a
                                                key={i}
                                                href={item.href}
                                                className={` ${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 text-md font-medium `}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}


                                        <div className='my-auto flex  items-center justify-center'>
                                            <input type="text" placeholder='Mens' className='py-1 rounded' name="" id="" />
                                            <button className='border text-white rounded text-md p-1 font-medium  hover:bg-gray-700 hover:text-white'>
                                                <MagnifyingGlassIcon className="h-6 w-6 text-gray-200" />
                                            </button>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            {/* <div>
                                <input type="text" name="" id="" />
                                <button>Serch</button>
                            </div> */}

                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">

                                {/* <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button> */}


                                {/* Cart btn */}
                                <button
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mx-1"
                                    onClick={() => { navigate("/cart") }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>

                                </button>


                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3 mx-1">

                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEymdd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
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
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/about"
                                                        className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-md text-gray-700`}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={`${active ? 'bg-gray-100' : ''}  block px-4 py-2 text-md text-gray-700`}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={`${active ? 'bg-gray-100' : ''}  block px-4 py-2 text-md text-gray-700`}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                {/* dark btn */}
                                <button
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white mx-1"
                                    onClick={() => { themeDispatch(toggleModeValue()); }}
                                >

                                    <label className="swap swap-rotate transition-all">

                                        {/* this hidden checkbox controls the state */}
                                        {/* <input type="checkbox" className='sr-only' /> */}

                                        {/* sun icon */}


                                        <svg className="swap-off fill-current w-7 h-7 mt-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">


                                            {

                                                !themeSate

                                                    ?
                                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />

                                                    :
                                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />


                                            }




                                        </svg>

                                        {/* moon icon */}

                                    </label>
                                </button>

                            </div>

                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">

                            {navigation.map((item, i) => (
                                <Disclosure.Button
                                    key={i}
                                    as="a"
                                    href={item.href}
                                    className={`${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block rounded-md px-3 py-2 text-base font-medium `}




                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}

                        </div>

                    </Disclosure.Panel>

                    {/* Below search bar will visible less then md (in mobile only) */}
                    <div className='my-auto flex  items-center justify-center md:hidden mb-1 m-1'>
                        <input type="text" placeholder='Mens' className='py-1 rounded w-full' name="" id="" />
                        <button className='border text-white rounded text-md p-1 font-medium  hover:bg-gray-700 hover:text-white'>
                            <MagnifyingGlassIcon className="h-6 w-6 text-gray-200" />
                        </button>
                    </div>
                </>
            )}
        </Disclosure>





    )
}