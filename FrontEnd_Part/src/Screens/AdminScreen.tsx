//
// import React from 'react'

// import { Route, Routes } from "react-router-dom";
import AdminMain from "../components/AdminComps/AdminMain";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

const AdminScreen = () => {
   return (
      // <div>AdminScreen</div>

      <>
         <NavBar />
         <AdminMain />
         <Footer />
      </>
   );
};

export default AdminScreen;
