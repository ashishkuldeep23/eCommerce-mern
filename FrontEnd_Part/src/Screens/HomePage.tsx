
import NavBar from "../components/NavBar/NavBar"
import ProductLists from "../components/ProductListing/ProductLists"
import FilterSection from "../components/FilterSection/FilerSection"
import NewCrousel from "../components/Crousal/NewCrousel"
import Footer from "../components/Footer/Footer"
import { userState } from "../Slices/UserSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"




const HomePage = () => {

  // const [cartOpen, setCartOpen] = useState<boolean>(false)



  // // // Use Efftect to send on admin page (If user role is admin) ---->


  const userData = userState().userData

  const navigate = useNavigate()

  // // // If user is Admin then navigate to Admin Page -->

  useEffect(() => {

    if (userData.firstName !== "" && userData.lastName !== "") {

      if (userData.role === "admin") {
        navigate("/admin")
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

