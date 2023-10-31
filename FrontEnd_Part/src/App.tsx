import HomePage from "./Screens/HomePage"
import DetailOfSingleProduct from "./Screens/DetailOfSingleProduct"
import LogInScreen from "./Screens/LogInScreen"
import SignInScreeen from "./Screens/SignInScreen"
import UserDetails from "./Screens/UserDetails"


import { Routes, Route } from "react-router-dom"
import CartScreen from "./Screens/CartScreen"
import PaymentScreen from "./Screens/PaymentScreen"
import { useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"

import { useDispatch } from "react-redux"
import { loadDataIntoState } from "./Slices/AllProductSlice"
import { setModeOnLoad } from "./Slices/ThemeSlices"
import { loadCartFromLoacal } from "./Slices/CartSlice"




function App() {


  const dispatch = useDispatch()


  // // // This fn will call Backend to get data ------>
  async function loadData() {

    // const roductCat = ["smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration"]

    try {


      const callingData = await fetch('https://dummyjson.com/products?limit=100')

      let res = await callingData.json()

      // console.log(catArr)

      // setProducts(res.products)

      // setProductCategory(arrOfProductCat)   // // // When getting data then set into state var. 

      const outPutArr = [...res.products]  // // // By using this way i can use all methods of arr.

      // console.log(outPutArr)

      const allCategoryOfProducts = [...new Set(outPutArr.map(ele => ele.category))]     // // // taking all  categoriy from output arr.

      // console.log(allCategoryOfProducts)


      let loadObjInState = {
        allProducts: outPutArr,
        allCaegory: allCategoryOfProducts,
        allHighlightProducts: outPutArr.slice(4, 9)
      }

      // // // Load all Products --->
      dispatch(loadDataIntoState(loadObjInState))


      // // //Load Cart here (That present in localStorage of Browser ) ------>



      let getLocalCardData = localStorage.getItem("cardData")

      if (getLocalCardData) {
        getLocalCardData = JSON.parse(getLocalCardData)

        dispatch(loadCartFromLoacal({ data: getLocalCardData }))    // // // Here calling data and loading into localHost.

      }





    } catch (e: any) {
      console.log(e?.message)
      // alert(`${e?.message} | Try again , Open network data.`)
      toast.error(`${e?.message} | Try again , Open network data.`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }


  }


  useEffect(() => {

    loadData()

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
