

import { useEffect } from 'react'


import NavBar from "../components/NavBar/NavBar"
import ProductLists from "../components/ProductListing/ProductLists"


import FilterSection from "../components/FilterSection/FilerSection"

import NewCrousel from "../components/Crousal/NewCrousel"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { fetchAllCategoryAndHighlight, fetchAllProducts } from '../Slices/AllProductSlice'



const HomePage = () => {

  // const [cartOpen, setCartOpen] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()

  const limitValue = useSelector((state: RootState) => state.allProductWithCatReducer.onePageLimit)

  useEffect(() => {

    dispatch(fetchAllCategoryAndHighlight())
    dispatch(fetchAllProducts({ brand: "", category: '', price: "-1", limit: `${limitValue}` }))
    // // // Limit value is 4 set (Change in useEffect of pagination.jsx and here)
  }, [])


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

