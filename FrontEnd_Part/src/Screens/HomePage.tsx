

// import React from 'react'


import NavBar from "../components/NavBar/NavBar"
import ProductLists from "../components/ProductListing/ProductLists"


import FilterSection from "../components/FilterSection/FilerSection"

import NewCrousel from "../components/Crousal/NewCrousel"



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

    </>
  )
}

export default HomePage

