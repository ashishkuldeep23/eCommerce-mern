import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { modalStore, setOpenMoadl } from '../../Slices/ModalSlice'
import { useDispatch } from 'react-redux'

export default function Modal() {
    // const [open, setOpen] = useState(true)

    const dispatch = useDispatch()

    const open = modalStore().open

    function setOpen(data: boolean) {

        dispatch(setOpenMoadl(data))

    }


    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300 "
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg  text-left transition-all sm:my-8 delay-150 lg:max-w-3/5 ">
                                {/* Widt of Modal is controled by above div ----> */}

                                <div
                                    className='py-10 bg-transparent'
                                    onClick={() => setOpen(false)}
                                >


                                    <button
                                        type="button"
                                        className=" justify-center  px-2 py-1 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-red-600  sm:mt-0  absolute right-0.5 top-7 rounded-full bg-red-600 text-white z-10 w-full hidden sm:inline-flex sm:w-auto"
                                        ref={cancelButtonRef}
                                    >
                                        <span className=' hidden sm:block'>X</span>
                                        <span className=' block sm:hidden'>Close</span>
                                    </button>

                                    {/* Below div will hold children ---> main content */}
                                    <div className="rounded bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border flex flex-col items-center  overflow-hidden">

                                        {
                                            modalStore().children
                                        }


                                        {/* <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Deactivate account
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to deactivate your account? All of your data will be permanently
                                                        removed. This action cannot be undone.
                                                    </p>
                                                </div>
                                            </div>
                                        </div> */}





                                    </div>


                                    <button
                                        type="button"
                                        className=" justify-center  px-2 py-1 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-red-600  sm:mt-0 absolute right-0.5 bottom-4 rounded-full bg-red-600 text-white z-10 w-full inline-flex sm:hidden sm:w-auto"
                                        ref={cancelButtonRef}
                                    >
                                        <span className=' hidden sm:block'>X</span>
                                        <span className=' block sm:hidden'>Close</span>
                                    </button>

                                </div>



                                {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div> */}



                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>


            </Dialog>
        </Transition.Root>
    )
}
