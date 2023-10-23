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

      dispatch(loadDataIntoState(loadObjInState))

    } catch (e : any ) {
      console.log(e?.message)
      alert(`${e?.message} | Try again , Open network data.`)
    }


  }


  useEffect(() => {

    loadData()

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

    </>
  )
}

export default App
