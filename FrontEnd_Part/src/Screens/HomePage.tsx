
import NavBar from "../components/NavBar/NavBar"
import ProductLists from "../components/ProductListing/ProductLists"
import FilterSection from "../components/FilterSection/FilerSection"
import NewCrousel from "../components/Crousal/NewCrousel"
import Footer from "../components/Footer/Footer"
// import { userState } from "../Slices/UserSlice"
// import { useNavigate } from "react-router-dom"
// import { useEffect } from "react"




const HomePage = () => {

  // const [cartOpen, setCartOpen] = useState<boolean>(false)






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

