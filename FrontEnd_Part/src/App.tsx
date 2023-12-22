import HomePage from "./Screens/HomePage"
import DetailOfSingleProduct from "./Screens/DetailOfSingleProduct"
import LogInScreen from "./Screens/LogInScreen"
import SignInScreeen from "./Screens/SignInScreen"
import UserDetails from "./Screens/UserDetails"
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

import LogInProtected from "./components/Protected/LogInProtected"
import { fetchAllCategoryAndHighlight, fetchAllProducts } from "./Slices/AllProductSlice"
import OrdersScreen from "./Screens/MyOrdersScreen"
import StripeMainPage from "./Screens/StripeMainPage"
import OrderConfirm from "./components/OrderConfirm/OrderConfirm"

import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import { CategorySearchPage } from "./Screens/CategorySearchPage"
import ForgotPassMainScreen from "./Screens/ForgotPassMainScreen"
import { ForgotPassReqScreen } from "./Screens/ForgotPassReqScreen"

// import { fetchAllProducts , fetchAllCategoryAndHighlight } from "./Slices/AllProductSlice"


// // fn write to check only based on this ---> calling fetch user ---> in LocalHost also -->
export const gettingTokenInCookieAndLocalHost = () => {


  let token = false;


  // let checkInCookie = document.cookie
  // let cookieInArr = checkInCookie.split("=")
  // let checkTokenPresent = cookieInArr.indexOf("token")
  // if (checkTokenPresent !== -1) {
  //   token = true;
  // }



  let checkTokenInLoaclHost = localStorage.getItem("userToken")

  if (checkTokenInLoaclHost) {

    token = JSON.parse(checkTokenInLoaclHost)

  }


  return token
}



// // // Now using createBrowserRouter instead of BrowserRouter component ---> ( let's see what happen in production mode)

const router = createBrowserRouter([

  { path: "/", element: (<LogInProtected> <HomePage /> </LogInProtected>) },

  { path: "/about", element: (<LogInProtected> <UserDetails /> </LogInProtected>) },

  { path: "/orders", element: (<LogInProtected> <OrdersScreen /> </LogInProtected>) },

  // { path: "/product", element: (<LogInProtected> <DetailOfSingleProduct /> </LogInProtected>) },

  // { path: "/product/:id", element: (<DetailOfSingleProduct /> ) },
  { path: "/product/:id", element: (<LogInProtected> <DetailOfSingleProduct /> </LogInProtected>) },

  { path: "/login", element: <LogInScreen /> },

  { path: "/signin", element: <SignInScreeen /> },
  
  { path: "/forgot-pass-req", element: <ForgotPassReqScreen /> },
  
  { path: "/forgot-pass-main/:email/:token", element: <ForgotPassMainScreen /> },
  
  { path: "/catPage", element: <CategorySearchPage /> },

  { path: "/cart", element: (<LogInProtected> <CartScreen /> </LogInProtected>) },

  { path: "/pay", element: (<LogInProtected> <PaymentScreen /> </LogInProtected>) },

  { path: "/stripePay", element: (<LogInProtected>  <StripeMainPage /> </LogInProtected>) },

  { path: "/order-confirm", element: (<LogInProtected>  <OrderConfirm /> </LogInProtected>) },

  // // // So this route i'll use fater gogal logIn , plan atleast -->
  { path: "/goUser", element: <UserSinInSuccessfull /> },


  // // // Page not found --->
  {
    path: '*',
    // // // here write custome comp. for page not found --->
    element:
      <>
        <div
          style={{ height: "99vh" }}
          className=" flex flex-col justify-center items-center "
        >
          <h1 className=" text-center text-3xl text-red-500">Page not Found, Go to Home please.</h1>
          <Link to="/"><button className="border my-3 rounded text-white bg-green-500 px-2">GoTo Home 🏠</button></Link>
        </div>
      </>,
  },


])



function App() {


  const dispatch = useDispatch<AppDispatch>()

  // const allHighlightsData = useSelector((state: RootState) => state.allProductWithCatReducer.allHighlightProducts)

  // const limitValue = useSelector( (state : RootState) => state.allProductWithCatReducer.onePageLimit)

  const getAllHighLights = useSelector((state: RootState) => state.allProductWithCatReducer.allHighlightProducts)

  const limitValue = useSelector((state: RootState) => state.allProductWithCatReducer.onePageLimit)


  // // // This fn will call Backend to get data ------>

  useEffect(() => {


    // console.log(gettingTokenInCookieAndLocalHost())


    // // // If token is present in localHost then only do ---->
    if (gettingTokenInCookieAndLocalHost()) {


      // // // Now call Data from home page of useEffect now (When user successfull login then also this will call backend main reason is that ) --->

      dispatch(fetchAllCategoryAndHighlight())
      dispatch(fetchAllProducts({ brand: "", category: '', price: "-1", limit: `${limitValue}` }))
      //  // // // Limit value is 4 set (Change in useEffect of pagination.jsx and here)



      // // // Here call fetch user

      // console.log("Now call Fetch user dispatch()")

      // // // Call server to fetch user ----->
      dispatch(fetchUser())



      // // // Load user logIn status data in state variable (Redux-Toolkit)
      let logInStatus = localStorage.getItem("isUserLogIn")

      if (logInStatus) {
        // console.log(logInStatus)

        // logInStatus = JSON.parse(logInStatus)

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

      {/* Above from routes will avilable for all pages ---> */}
      <Modal />

      {/* Privous code present here for routing ---> */}

      <RouterProvider router={router} />

      <ToastContainer />

    </>
  )
}

export default App
