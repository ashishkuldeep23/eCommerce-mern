
import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit"

// // // by using corrent i can use updated data ----> (see the setSingleProduct  funtion )

import { IProduct } from "../components/ProductListing/ProductLists"

import { toast } from "react-toastify"
import { gettingTokenInCookieAndLocalHost } from "../App"




type SearchObj = {
    brand?: string,
    category?: string,
    price?: string,
    page?: string,
    limit?: string,
}


export const fetchAllProducts = createAsyncThunk("fetchAllProducts", async ({ brand = '', category = '', price = '1', page = "1", limit = "10" }: SearchObj) => {

    // console.log(brand , category)


    let url = `${import.meta.env.VITE_BACKEND_URL}/findAllProducts`


    if (brand && brand !== '') {
        url = url + `?brand=${brand}`
    }


    if (category && category !== "") {
        if (brand) {
            url = url + `&category=${category}`
        } else {
            url = url + `?category=${category}`
        }
    }



    if (!brand && !category) {
        url = url + `?sort_by_price=${price}&page=${page}&limit=${limit}`
    } else {
        url = url + `&sort_by_price=${price}&page=${page}&limit=${limit}`
    }

    // console.log(url)



    let getUserToken = localStorage.getItem("userToken");

    if (getUserToken) {
        getUserToken = JSON.parse(getUserToken)
    } else {
        getUserToken = null
    }


    let option: RequestInit = {
        credentials: 'include',

        headers: {
            "token": `${gettingTokenInCookieAndLocalHost()}`,
            //     Accept : "application/json" ,
            //     "Access-Control-Allow-Credentials" : true
        }

    }

    const response = await fetch(url, option)
    let data = await response.json();
    return data
})




export const fetchAllCategoryAndHighlight = createAsyncThunk("getCategoryAndHighlight", async () => {

    // console.log(gettingTokenInCookieAndLocalHost())


    let getUserToken = localStorage.getItem("userToken");

    if (getUserToken) {
        getUserToken = JSON.parse(getUserToken)
    } else {
        getUserToken = null
    }


    let option: RequestInit = {
        credentials: 'include',

        headers: {
            "token": `${gettingTokenInCookieAndLocalHost()}`
        }

    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getCategoryAndHighlight`, option)
    let data = await response.json();
    return data
})




type productId = {
    productId: string | number
}

export const fetchOneProductByID = createAsyncThunk("fetchSingleProduct/:id", async ({ productId }: productId) => {

    // console.log(productId)

    let getUserToken = localStorage.getItem("userToken");

    if (getUserToken) {
        getUserToken = JSON.parse(getUserToken)
    } else {
        getUserToken = null
    }


    let option: RequestInit = {
        credentials: 'include',

        headers: {
            "token": `${gettingTokenInCookieAndLocalHost()}`
        }

    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/findOneProduct/${productId}`, option)
    let data = await response.json();
    return data
})




type PropForLikeAndDislike = {
    productId: string | number;
    userId: string;
    isLiking?: boolean;
    isDisliking?: boolean
}


export const likeProduct = createAsyncThunk("product/like", async ({ productId, userId, isLiking }: PropForLikeAndDislike) => {
    let option: RequestInit = {
        credentials: 'include',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
        body: JSON.stringify({ productId, userId, isLiking })

    }



    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/likeProduct`, option)
    let data = await response.json();
    return data
})


export const dislikeProduct = createAsyncThunk("product/dislike", async ({ productId, userId, isDisliking }: PropForLikeAndDislike) => {
    let option: RequestInit = {
        credentials: 'include',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
        body: JSON.stringify({ productId, userId, isDisliking })

    }



    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/dislikeProduct`, option)
    let data = await response.json();
    return data
})




interface IAllProductsWithCat {
    allProducts: IProduct[],
    allCaegory: string[],
    filterAllBrands: string[],
    filterAllCateory: string[],
    allHighlightProducts: IProduct[],
    totalProducts: number,
    searchByQuery: boolean,
    sortByPrice: string,
    onePageLimit: number,
    singleProductId: string | number,
    singleProductData: IProduct,
    simmilarProductWithOnePro: IProduct[],
    searchBrandAndCate: {
        brand: string,
        category: string
    }
    isLoading: boolean,
    isError: boolean
}


const initialState: IAllProductsWithCat = {
    allProducts: [],
    allCaegory: [],
    filterAllBrands: [],
    filterAllCateory: [],
    allHighlightProducts: [],
    totalProducts: 0,
    searchByQuery: false,
    sortByPrice: "-1",
    onePageLimit: 4,
    singleProductId: "",
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
        "type": [],
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
        "review": [],
        "likes": 0,
        "dislikes": 0,
        "likedUserIds": [],
        "dislikedUserIds": [],
    },

    simmilarProductWithOnePro: [],
    searchBrandAndCate: {
        brand: "",
        category: ""
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
        },


        setSortByPriceChange(state, action) {
            state.sortByPrice = action.payload.newPrice
        },


        setSearchBrandAndCate(state, action) {
            // console.log(action.payload)
            // state.searchBrandAndCate = action.payload.brand || ""
            // state.searchBrandAndCate = action.payload.category || ''


            state.searchBrandAndCate = { brand: action.payload.brand || "", category: action.payload.category || '' }
        }

    },


    extraReducers: (builder) => {
        builder

            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
                state.allCaegory = [];
            })

            .addCase(fetchAllProducts.fulfilled, (state, action) => {

                if (action.payload.totaldata === 0) {
                    toast.error(`Data Not Found for your query | 404`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }

                state.isLoading = false;
                state.allProducts = action.payload.allProductData
                state.allCaegory = action.payload.allCategory
                state.searchByQuery = false


                if (action.payload.searchByQuery) {
                    state.totalProducts = action.payload.allProductData.length
                    state.searchByQuery = true
                }

                // state.allHighlightProducts = action.payload.allHighlights

                // console.log(action.payload)
            })

            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isError = true;

                console.log(action.error)

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





            .addCase(fetchAllCategoryAndHighlight.pending, () => {

                // console.log(action.payload)

                console.log("Getting Data from Backend. Now pending")
            })


            .addCase(fetchAllCategoryAndHighlight.fulfilled, (state, action) => {

                // console.log(action.payload)

                if (action.payload.status) {


                    state.allHighlightProducts = action.payload.allHighlights
                    state.filterAllBrands = action.payload.allBrands
                    state.filterAllCateory = action.payload.allCategory
                    state.totalProducts = action.payload.totalProducts

                } else {

                    // // // Some error part

                    // console.log(action)

                    // // // jwt expired remove token in localStorage -->
                    if (action.payload.message === "jwt expired") {
                        localStorage.removeItem("userToken")
                        return
                    }


                    toast.error(`${action.payload.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }

            })


            .addCase(fetchAllCategoryAndHighlight.rejected, (state, action) => {


                // console.log(action)

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


            

            .addCase(likeProduct.pending, (state) => {
                // console.log("Getting Data from Backend. Now pending")
                state.isLoading = true
            })

            .addCase(likeProduct.fulfilled, (state, action) => {


                if (action.payload.status === false) {

                    state.isError = true
                    toast.error(`${action.payload.message} | 400`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                } else {

                    toast.success(`${action.payload.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })

                    // // reload loaction ----->
                    // location.reload()
                    state.singleProductData = action.payload.data

                }

                state.isLoading = false

                // console.log(action.payload)
            })

            .addCase(likeProduct.rejected, (state, action) => {
                state.isLoading = false
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




            .addCase(dislikeProduct.pending, (state) => {
                // console.log("Getting Data from Backend. Now pending")
                state.isLoading = true
            })

            .addCase(dislikeProduct.fulfilled, (state, action) => {


                if (action.payload.status === false) {

                    state.isError = true
                    toast.error(`${action.payload.message} | 400`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                } else {

                    toast.success(`${action.payload.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })

                    // // reload loaction ----->
                    // location.reload()
                    state.singleProductData = action.payload.data

                }

                state.isLoading = false

                // console.log(action.payload)
            })

            .addCase(dislikeProduct.rejected, (state, action) => {
                state.isLoading = false
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




            // // // review events --->
            // // //  type of action should given if you are catching any other async action
            // // Like review fullfill -->
            .addCase("review/like/fulfilled", (state, action: PayloadAction<any, never>) => {
                // console.log(action.payload.data)

                let updatedreview = action.payload.data

                let updatedState = current(state)

                if (updatedState.singleProductData.review) {


                    let copyArrOfCurrentReviewArr = [...updatedState.singleProductData.review]


                    let index = copyArrOfCurrentReviewArr?.findIndex(ele => ele.id === updatedreview.id)

                    // console.log(index)


                    if (index !== undefined) {

                        copyArrOfCurrentReviewArr?.splice(index, 1, { ...updatedreview })

                        state.singleProductData.review = copyArrOfCurrentReviewArr
                    }

                }


                // console.log("done")


            })


            // // Dislike review Fullfill -->
            .addCase("review/dislike/fulfilled", (state, action: PayloadAction<any, never>) => {

                // console.log(action.payload.data)

                let updatedreview = action.payload.data

                let updatedState = current(state)


                if (updatedState.singleProductData.review) {
                    let copyArrOfCurrentReviewArr = [...updatedState.singleProductData.review]


                    let index = copyArrOfCurrentReviewArr?.findIndex(ele => ele.id === updatedreview.id)

                    // console.log(index)


                    if (index !== undefined) {

                        copyArrOfCurrentReviewArr?.splice(index, 1, { ...updatedreview })

                        state.singleProductData.review = copyArrOfCurrentReviewArr
                    }
                }



                // console.log("dislike done")

            })


            // // Create review fullfill -->
            .addCase("review/newReview/fulfilled", (state, action: PayloadAction<any, never>) => {

                // console.log(action.payload.data)

                // // // set all new array of data --->
                state.singleProductData.review = [...action.payload.data].reverse()

            })


            // // delete review fullfill -->
            .addCase("review/deleteReview/fulfilled", (state, action: PayloadAction<any, never>) => {

                // console.log(action.payload.data)

                // // // set all new array of data --->
                state.singleProductData.review = [...action.payload.data].reverse()

            })


            // /// // update review fullfill -->
            .addCase("review/update/fulfilled", (state, action: PayloadAction<any, never>) => {

                // console.log(action.payload.data)

                // // // set all new array of data --->
                state.singleProductData.review = [...action.payload.data].reverse()

            })


        // // //Extra reducers for review done --->


    }

})


export const { loadDataIntoState, setSingleProductData, setFilterItems, setSortByPriceChange, setSearchBrandAndCate } = allProductsCatSlice.actions

export default allProductsCatSlice.reducer

