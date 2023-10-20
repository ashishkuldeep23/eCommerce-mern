

// import React from 'react'


import NavBar from "../components/NavBar/NavBar"
import ProductLists from "../components/ProductListing/ProductLists"

import Crousal from "../components/Crousal/Crousal"


import FilterSection from "../components/FilterSection/FilerSection"




const HomePage = () => {

  // const [cartOpen, setCartOpen] = useState<boolean>(false)

  return (
    <>

      <NavBar />

      {/* <CartComponent /> */}

      <Crousal />

      <FilterSection >
        <ProductLists />
      </FilterSection>

    </>
  )
}

export default HomePage

