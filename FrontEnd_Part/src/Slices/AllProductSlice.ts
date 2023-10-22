
import { createSlice } from "@reduxjs/toolkit"


import { IProduct } from "../components/ProductListing/ProductLists"



interface IAllProductsWithCat{

    allProducts : IProduct[],
    allCaegory : string[] ,
    allHighlightProducts : IProduct[]
}



const initialState : IAllProductsWithCat = {
    allProducts : [] ,
    allCaegory : [] ,
    allHighlightProducts : []
} 



const allProductsCatSlice = createSlice( {

    name : "allPrductsCat" ,
    initialState ,
    reducers : {


        loadDataIntoState(state , action){
            state.allProducts = action.payload.allProducts
            state.allCaegory = action.payload.allCaegory
            state.allHighlightProducts = action.payload.allHighlightProducts
        }

    }

} )


export const {loadDataIntoState} = allProductsCatSlice.actions 

export default allProductsCatSlice.reducer

