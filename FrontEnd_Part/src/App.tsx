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

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store"
import { setModeOnLoad } from "./Slices/ThemeSlices"
import { setLogInStatus, setUserData, fetchUser } from "./Slices/UserSlice"
import UserSinInSuccessfull from "./Screens/UserSinInSuccessfull"
import Modal from "./components/Modal/Modal"

// import { fetchAllProducts , fetchAllCategoryAndHighlight } from "./Slices/AllProductSlice"



// // fn write to check only based on this ---> calling fetch user --->
export const gettingTokenInCookie = () => {


  let token = false;

  let checkInCookie = document.cookie

  let cookieInArr = checkInCookie.split("=")

  let checkTokenPresent = cookieInArr.indexOf("token")


  if (checkTokenPresent !== -1   ) {

    token = true;

  }

  return token
}





function App() {


  const dispatch = useDispatch<AppDispatch>()

  // const allHighlightsData = useSelector((state: RootState) => state.allProductWithCatReducer.allHighlightProducts)

  // const limitValue = useSelector( (state : RootState) => state.allProductWithCatReducer.onePageLimit)

  const getAllHighLights = useSelector((state: RootState) => state.allProductWithCatReducer.allHighlightProducts)





  // // // This fn will call Backend to get data ------>

  useEffect(() => {


    // console.log(gettingTokenInCookieAndLocalHost())


    if (gettingTokenInCookie()) {


      // // // Here call fetch user

      // console.log("Now call Fetch user dispatch()")

      // // // Call server to fetch user ----->
      dispatch(fetchUser())



      // // // Load user logIn status data in state variable (Redux-Toolkit)
      let logInStatus = localStorage.getItem("isUserLogIn")

      if (logInStatus) {
        // console.log(logInStatus)

        logInStatus = JSON.parse(logInStatus)

        dispatch(setLogInStatus({ isLogIn: true }))
      }


      // // // If data come by fetch request then laod user data (that present in localhost) ---->
      if (getAllHighLights.length > 0) {

        // // // Load user data ----->

        // // // Load user data in state variable (Redux-Toolkit)
        let getUserData = localStorage.getItem("userData")

        if (getUserData) {

          getUserData = JSON.parse(getUserData)
          // console.log(getUserData)

          if (getUserData && Object.keys(getUserData).length > 0) {

            // if (allHighlightsData.length > 0) {
            dispatch(setUserData({ data: getUserData }))     // // // Set user data
            // }

          }

        }

      }


    }



    // // // Now call Data from home page of useEffect now (When user successfull login then also this will call backend main reason is that ) --->

    // dispatch(fetchAllCategoryAndHighlight())
    // dispatch(fetchAllProducts({brand : "" , category : '' , price : "-1" , limit : `${limitValue}`}))  
    //  // // // Limit value is 4 set (Change in useEffect of pagination.jsx and here)



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


    // // // Just checking here ---->
    // dispatch(setChildrenModal(<>Ashish</>))

  }, [])


  return (
    <>


        <Modal />


      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<UserDetails />} />

        <Route path="/product" element={<DetailOfSingleProduct />} />

        <Route path="/login" element={<LogInScreen />} />

        <Route path="/signin" element={<SignInScreeen />} />

        <Route path="/cart" element={<CartScreen />} />

        <Route path="/pay" element={<PaymentScreen />} />

        <Route path="/goUser" element={<UserSinInSuccessfull />} />

      </Routes>


      <ToastContainer />

    </>
  )
}

export default App
