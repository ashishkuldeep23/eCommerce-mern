// import React from 'react'

import CreateNewProduct from "../Components/CreateProduct"
import { GetUrlOfImgDiv } from "../Components/GetUrlOfImgDiv"
import AdminMainLayout from "../AdminMainLayout"
// import CreateNewProduct from "../CreateProduct"

const AdminCreateDiv = () => {
    return (
        <AdminMainLayout >
            <div className=" flex flex-col-reverse sm:flex-row justify-center items-start gap-2 ">
                <div className=" mx-auto sm:mx-0 !w-[90%] sm:!w-[65%]">
                    <CreateNewProduct />
                </div>
                <div className=" rounded mx-auto sm:mx-0 !w-[90%] sm:!w-[35%] ">
                    <GetUrlOfImgDiv />
                </div>
            </div>
        </AdminMainLayout>
    )
}

export default AdminCreateDiv