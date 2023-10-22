import HomePage from "./Screens/HomePage"

import DetailOfSingleProduct from "./Screens/DetailOfSingleProduct"
import LogInScreen from "./Screens/LogInScreen"
import SignInScreeen from "./Screens/SignInScreen"
import UserDetails from "./Screens/UserDetails"


import { Routes, Route } from "react-router-dom"
import CartScreen from "./Screens/CartScreen"
import PaymentScreen from "./Screens/PaymentScreen"
import { useEffect } from "react"

import { useDispatch } from "react-redux"
import { loadDataIntoState } from "./Slices/AllProductSlice"

function App() {


  const dispatch = useDispatch()


  async function loadData() {

    const arrOfProductCat = ["smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration"]

    const callingData = await fetch('https://dummyjson.com/products')

    let res = await callingData.json()

    // console.log(catArr)

    // setProducts(res.products)

    // setProductCategory(arrOfProductCat)   // // // When getting data then set into state var. 

    const outPutArr = [...res.products]  // // // By using this way i can use all methods of arr.

    

    let loadObjInState = {
      allProducts :outPutArr ,
      allCaegory : arrOfProductCat,
      allHighlightProducts : outPutArr.slice(4 , 9)
    }

    dispatch(loadDataIntoState(loadObjInState))

  }



  useEffect(()=>{

    loadData()

  } , [])


  return (
    <>

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<UserDetails />} />

        <Route path="/product" element={<DetailOfSingleProduct />} />

        <Route path="/login" element={<LogInScreen />} />

        <Route path="/signin" element={<SignInScreeen />} />

        <Route path="/cart" element={ <CartScreen /> } />

        <Route path="/pay" element={ <PaymentScreen /> } />

      </Routes>

    </>
  )
}

export default App
