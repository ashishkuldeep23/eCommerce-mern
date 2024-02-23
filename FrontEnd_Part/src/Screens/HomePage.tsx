
import NavBar from "../components/NavBar/NavBar"
import ProductLists from "../components/ProductListing/ProductLists"
import FilterSection from "../components/FilterSection/FilerSection"
import NewCrousel from "../components/Crousal/NewCrousel"
import Footer from "../components/Footer/Footer"
import { useEffect } from "react"
import { userState } from "../Slices/UserSlice"
import { useNavigate } from "react-router-dom"
// import { userState } from "../Slices/UserSlice"
// import { useNavigate } from "react-router-dom"
// import { useEffect } from "react"



// // // Taking a variable technique work well (so i'm not going touch) ----------->
let firstTimeAdminNavi = false



const HomePage = () => {

  // const [cartOpen, setCartOpen] = useState<boolean>(false)



  // // // Navigate to Admin page if user is admin ----->

  const { userData } = userState()

  const navigate = useNavigate()

  useEffect(() => {

    if (userData.role === "admin") {
      // alert("ok")

      if (!firstTimeAdminNavi) {

        // // Now navigate ---->

        navigate("/admin")

        setTimeout(() => {

          // console.log(true)

          firstTimeAdminNavi = true

        }, 100)

      }

    }

  }, [userData])




  return (
    <>

      <NavBar />

      {/* <CartComponent /> */}

      <NewCrousel />

      <FilterSection >
        <ProductLists />
      </FilterSection>


      <Footer />

    </>
  )
}

export default HomePage

