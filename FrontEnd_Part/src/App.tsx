import HomePage from "./Screens/HomePage"
import DetailOfSingleProduct from "./Screens/DetailOfSingleProduct"
import LogInScreen from "./Screens/LogInScreen"
import SignInScreeen from "./Screens/SignInScreen"
import UserDetails from "./Screens/UserDetails"


import { Routes, Route } from "react-router-dom"
import CartScreen from "./Screens/CartScreen"
import PaymentScreen from "./Screens/PaymentScreen"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"

import { useDispatch } from "react-redux"
import { AppDispatch } from "./store"
import { fetchAllProducts , fetchAllCategoryAndHighlight } from "./Slices/AllProductSlice"
import { setModeOnLoad } from "./Slices/ThemeSlices"


function App() {


  const dispatch = useDispatch<AppDispatch>()


  // // // This fn will call Backend to get data ------>


  useEffect(() => {
    
    dispatch(fetchAllCategoryAndHighlight())
    dispatch(fetchAllProducts({brand : "" , category : '' , price : ""}))

    //  let get =  fetchAllProducts()

    // console.log(get)



    // loadData()

    // // // Setting theme --->
    let mode = localStorage.getItem("ECommDark")
    if (mode) {

      dispatch(setModeOnLoad({ mode: JSON.parse(mode) }))
    } else {
      dispatch(setModeOnLoad({ mode: true }))   // // // I want first time dark time
    }

  }, [])


  return (
    <>

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<UserDetails />} />

        <Route path="/product" element={<DetailOfSingleProduct />} />

        <Route path="/login" element={<LogInScreen />} />

        <Route path="/signin" element={<SignInScreeen />} />

        <Route path="/cart" element={<CartScreen />} />

        <Route path="/pay" element={<PaymentScreen />} />

      </Routes>


      <ToastContainer />

    </>
  )
}

export default App
