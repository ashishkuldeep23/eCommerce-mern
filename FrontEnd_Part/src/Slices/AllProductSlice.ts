
import { createSlice, current } from "@reduxjs/toolkit"

// // // by using corrent i can use updated data ----> (see the setSingleProduct  funtion )

import { IProduct } from "../components/ProductListing/ProductLists"



interface IAllProductsWithCat {

    allProducts: IProduct[],
    allCaegory: string[],
    allHighlightProducts: IProduct[],
    singleProductData: IProduct
}



const initialState: IAllProductsWithCat = {
    allProducts: [],
    allCaegory: [],
    allHighlightProducts: [],
    singleProductData: {

        "id": 0,
        "title": "",
        "description": "",
        "price": 0,
        "discountPercentage": 0,
        "rating": {
            totalPerson : 0,
            avgRating : 0
        },
        "brand": '',
        "category": '',
        "thumbnail": '',
        "images": [],
        "isHighlight" : false,
        "isDeleted" : false, 
        "review" : []
    }
}



const allProductsCatSlice = createSlice({

    name: "allPrductsCat",
    initialState,
    reducers: {


        loadDataIntoState(state, action) {
            state.allProducts = action.payload.allProducts
            state.allCaegory = action.payload.allCaegory
            state.allHighlightProducts = action.payload.allHighlightProducts
            // state.singleProductData = action.payload.allProducts[1]
        },

        setSingleProductData(state, action) {

            let getUpdatedData = current(state)

            const allProductsArr = [...getUpdatedData.allProducts]

            const getSingleItem = allProductsArr.filter((item) => {

                if (item.id === action.payload.id) {
                    return item
                }

            })

            // console.log(getSingleItem[0])

            state.singleProductData = getSingleItem[0]
        },


        setFilterItems(state , action){
            state.allProducts = action.payload.allProducts
        }

    }

})


export const { loadDataIntoState, setSingleProductData , setFilterItems } = allProductsCatSlice.actions

export default allProductsCatSlice.reducer

