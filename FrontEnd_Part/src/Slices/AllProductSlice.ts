
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

// // // by using corrent i can use updated data ----> (see the setSingleProduct  funtion )

import { IProduct } from "../components/ProductListing/ProductLists"

import { toast } from "react-toastify"



export const fetchAllProducts = createAsyncThunk("fetchProducts", async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/findAllProducts`)
    let data = await response.json();
    return data
})


type productId = {
    productId: string | number
}

export const fetchOneProductByID = createAsyncThunk("fetchSingleProduct/:id", async ({ productId }: productId) => {

    // console.log(productId)

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/findOneProduct/${productId}`)
    let data = await response.json();
    return data
})





interface IAllProductsWithCat {
    allProducts: IProduct[],
    allCaegory: string[],
    allHighlightProducts: IProduct[],
    singleProductId : string | number ,
    singleProductData: IProduct,
    simmilarProductWithOnePro : IProduct[] ,
    isLoading: boolean,
    isError: boolean
}



const initialState: IAllProductsWithCat = {
    allProducts: [],
    allCaegory: [],
    allHighlightProducts: [],
    singleProductId : "" ,
    singleProductData: {
        "id": 0,
        "title": "",
        "description": {
            fullName: "",
            aboutProduct: "",
            highLights: [],
            specifications: [{}],
            product_Details: [{}],
            dimensions: [{}]
        },
        "price": 0,
        "discountPercentage": 0,
        type: [],
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

    simmilarProductWithOnePro : [],

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


        setSingleOProductId(state , action){

            // console.log(action.payload)

            state.singleProductId = action.payload.id

            localStorage.setItem( "singleProductId" , JSON.stringify(action.payload.id) )

        },


        setFilterItems(state, action) {
            state.allProducts = action.payload.allProducts
        },


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

        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.isError = true;

            // console.log(action.error.message)

            toast.error(`${action.error.message} | Check your Network | Refresh the page`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })



            .addCase(fetchOneProductByID.pending, () => {
                console.log("Getting Data from Backend. Now pending")
            })

            .addCase(fetchOneProductByID.fulfilled, (state, action) => {
             
                // console.log(action.payload)

                state.singleProductData = action.payload.data
                state.simmilarProductWithOnePro = action.payload.simmilarProductExceptThis
            })

            .addCase(fetchOneProductByID.rejected, (state, action) => {

                state.isError = true
                toast.error(`${action.error.message} | Check your Network | Refresh the page`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })


    }

})


export const { loadDataIntoState, setSingleProductData, setFilterItems , setSingleOProductId} = allProductsCatSlice.actions

export default allProductsCatSlice.reducer

