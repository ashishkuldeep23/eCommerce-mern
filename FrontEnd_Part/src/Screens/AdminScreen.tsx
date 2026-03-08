//
// import React from 'react'

import { Link, Route, Routes } from "react-router-dom";
// import AdminMain from "../components/AdminComps/AdminMain";
// import Footer from "../components/Footer/Footer";
// import NavBar from "../components/NavBar/NavBar";
import AdminCreateDiv from "../components/AdminComps/Pages/AdminCreatePage";
import AdminMainLayout from "../components/AdminComps/AdminMainLayout";
import AdminProducts from "../components/AdminComps/Pages/AdminProductsPage";
import AdminOrders from "../components/AdminComps/Pages/AdminOrdersPage";
import AdminChartPage from "../components/AdminComps/Pages/AdminChartPage";

const AdminScreen = () => {
   return (
      // <div>AdminScreen</div>

      <>

         {/* Home route for admin. */}
         <Routes>
            <Route path="/" element={<AdminMainLayout />} />
            {/* <Route path="/" element={<>
               <NavBar />
               <AdminMain />
               <Footer /></>} /> */}

            <Route path={'/create'} element={<AdminCreateDiv />} />
            <Route path={'/products'} element={<AdminProducts />} />
            <Route path={'/orders'} element={<AdminOrders />} />
            <Route path={'/chart'} element={<AdminChartPage />} />

            {/* <Route path="/a" element={<div>A</div>} /> */}
            <Route path="/*" element={<>
               <div
                  style={{ height: "99vh" }}
                  className=" flex flex-col justify-center items-center ">
                  <h1 className=" text-center text-3xl text-red-500">
                     Wrong Admin path , Go to Home please.
                  </h1>
                  <Link to="/">
                     <button className="border my-3 rounded text-white bg-green-500 px-2">
                        GoTo Home 🏠
                     </button>
                  </Link>
               </div>
            </>} />
         </Routes>




      </>
   );
};

export default AdminScreen;
