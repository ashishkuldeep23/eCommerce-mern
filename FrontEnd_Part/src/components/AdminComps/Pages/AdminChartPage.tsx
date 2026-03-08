// import React from 'react'

// import ChartJs2 from "../ChartJs2"
// import DataInChartFormate from "../DataInChartFormate"
import ChartJs2 from "../Components/ChartJs2"
import DataInChartFormate from "../Components/DataInChartFormate"
import AdminMainLayout from "../AdminMainLayout"

const AdminChartPage = () => {
    return (
        <AdminMainLayout >
            {/* chat package ---> */}
            <ChartJs2 />

            {/* Simple chart to show all order (Improve letar) */}
            <DataInChartFormate />
        </AdminMainLayout>
    )
}

export default AdminChartPage