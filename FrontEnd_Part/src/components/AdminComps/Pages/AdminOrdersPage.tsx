// import React from 'react'

import AdminMainLayout from "../AdminMainLayout"
import { AllOdersComp } from "../Components/AllOdersComp"

const AdminOrders = () => {
    return (
        <AdminMainLayout >
            {/* All order component  */}
            <AllOdersComp />
        </AdminMainLayout>
    )
}

export default AdminOrders