
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

// // // by using corrent i can use updated data ----> (see the setSingleProduct  funtion )

import { IProduct } from "../components/ProductListing/ProductLists"





export const fetchAllProducts = createAsyncThunk("fetchProducts", async () => {

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/findAllProducts`)
    let data = await response.json();
    return data
})






interface IAllProductsWithCat {
    allProducts: IProduct[],
    allCaegory: string[],
    allHighlightProducts: IProduct[],
    singleProductData: IProduct,
    isLoading: boolean,
    isError: boolean
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
            totalPerson: 0,
            avgRating: 0
        },
        "brand": '',
        "category": '',
        "thumbnail": '',
        "images": [],
        "isHighlight": false,
        "isDeleted": false,
        "review": []
    },
    isLoading: false,
    isError: false
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


        setFilterItems(state, action) {
            state.allProducts = action.payload.allProducts
        }

    },

    extraReducers: (builder) => {

        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allProducts = action.payload.allProductData
            state.allCaegory = action.payload.allCategory
            state.allHighlightProducts = action.payload.allHighlights

            // console.log(action.payload)
        })

        builder.addCase(fetchAllProducts.rejected, (state , action) => {
            state.isError = true;
            console.log(action.payload)
        })

    }

})


export const { loadDataIntoState, setSingleProductData, setFilterItems } = allProductsCatSlice.actions

export default allProductsCatSlice.reducer

