// import React from 'react'

import AllProducts from "../Components/AllProducts"
import AdminMainLayout from "../AdminMainLayout"
// import AllProducts from "../AllProducts"

const AdminProducts = () => {
    return (
        <AdminMainLayout >
            {/* All product visiable */}
            <AllProducts />
        </AdminMainLayout>
    )
}

export default AdminProducts