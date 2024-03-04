
import { PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { toast } from "sonner";
import { gettingTokenInCookieAndLocalHost } from "../App";
import { IProduct } from "../components/ProductListing/ProductLists";
import { NewProductInput } from "../components/AdminComps/CreateProduct";
import { OrderData } from "../components/Payment/PaymentComp";
import { CardDataInter } from "./CartSlice";


// import type { PayloadAction } from "@reduxjs/toolkit"
// // // Above will use in action object , see the docs.



export const createNewProduct = createAsyncThunk('admin/createNewProduct', async (formData: FormData) => {

    const option = {
        method: 'POST',
        body: formData,
        headers: {
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/createProduct`, option)
    let data = await response.json();
    return data

})


export const getAllProductAdmin = createAsyncThunk("admin/getAllProducts", async () => {

    const option = {
        method: 'GET',
        headers: {
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
    }


    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getAllProductsAdmin`, option)
    let data = await response.json();
    return data
})


export const updateProductAdmin = createAsyncThunk("admin/updateProduct", async (formData: FormData) => {
    const option = {
        method: 'POST',
        headers: {
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
        body: formData
    }


    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updatePoduct`, option)
    let data = await response.json();
    return data
})




export const getAllOrdersAdmin = createAsyncThunk("admin/getAllOrders", async (sort?: string) => {
    const option: RequestInit = {
        credentials: 'include',
        headers: {
            "token": `${gettingTokenInCookieAndLocalHost()}`,
        },
    }

    // // // Only -1 and 1 is accepted by Mongoose thatswhy only two values.
    let sortBy = sort === "1" ? "1" : '-1'

    // console.log(sortBy)

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getAllOrdersAdmin?sort=${sortBy}`, option)
    let data = await response.json();
    return data

})



export interface AdminAllOrders extends OrderData {
    id: string
}



export type GroupedByProductAndSold = {
    [key: string]: number
}


export type GroupedByData = {
    [key: string]: CardDataInter[]
}



type AdminData = {
    isLoading: boolean;
    isError: boolean;
    isFullfilled: boolean;
    errMsg: string;
    allProduct: IProduct[],
    allOrders: AdminAllOrders[],
    searchAllOrders: {
        sortBy: "1" | "-1"
    },
    groupedByCategoryObj: GroupedByData,
    groupedByBrandObj: GroupedByData,
    groupedByProductAndSold: GroupedByProductAndSold,
    updatingProduct: boolean,
    newProduct: NewProductInput

}


const initialState: AdminData = {
    isLoading: false,
    isError: false,
    isFullfilled: false,
    errMsg: "",
    allProduct: [],
    allOrders: [],
    searchAllOrders: {
        sortBy: "-1"
    },
    groupedByCategoryObj: {},
    groupedByBrandObj: {},
    groupedByProductAndSold: {},
    updatingProduct: false,
    newProduct: {
        type: [],
        thumbnailIndex: -1,
        imageInputBy: "",
        whenCreted: "",

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
    }

}


const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {

        setUpdatingProduct(state, action) {

            // console.log(action.payload)

            state.updatingProduct = action.payload as boolean
        },

        setProductData(state, action) {
            // console.log(action.payload)

            let comingData = action.payload as NewProductInput

            state.newProduct = comingData

        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewProduct.pending, (state) => {
                state.isLoading = true
                state.isFullfilled = false
            })

            .addCase(createNewProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isFullfilled = true

                // console.log(action.payload)
                // alert("Ok now")


                if (action.payload.status === false) {

                    state.isError = true
                    toast.error(`${action.payload.message} | 400`)
                } else {

                    // // // True case written here ------->

                    toast.success(`${action.payload.message}`)

                    // // // Add data in State variables -->

                }


            })

            .addCase(createNewProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.errMsg = action?.error?.message!
                toast.error(`${action.error.message}`);
            })



            .addCase(getAllProductAdmin.pending, (state) => {
                state.isLoading = true
                state.isFullfilled = false
            })

            .addCase(getAllProductAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isFullfilled = true

                // console.log(action.payload)
                // alert("Ok now")


                if (action.payload.status === false) {

                    state.isError = true
                    toast.error(`${action.payload.message} | 400`)
                } else {
                    // console.log(action.payload.data)
                    state.allProduct = action.payload.data
                }
            })

            .addCase(getAllProductAdmin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.errMsg = action?.error?.message!
                toast.error(`${action.error.message}`);
            })



            .addCase(updateProductAdmin.pending, (state) => {
                state.isLoading = true
                state.isFullfilled = false
            })

            .addCase(updateProductAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isFullfilled = true

                // console.log(action.payload)
                // alert("Ok now")


                if (action.payload.status === false) {

                    state.isError = true
                    toast.error(`${action.payload.message} | 400`)
                } else {
                    // console.log(action.payload.data)

                    let productId = action.payload.data.id

                    let updatedProductData = action.payload.data as IProduct

                    // // // Update that data only 

                    // console.log(productId , updatedProductData)

                    let cureentAllData = current(state.allProduct)


                    let findOldDataIndex = cureentAllData.findIndex(ele => ele.id === productId)

                    // console.log(findOldDataIndex)


                    // let newAllDataArr = [...cureentAllData].splice(findOldDataIndex , 0 , updatedProductData  )
                    let newAllDataArr = [...cureentAllData]

                    newAllDataArr.splice(findOldDataIndex, 1, updatedProductData)
                    // let newAllDataArr = c.push( updatedProductData  )

                    // console.log(newAllDataArr)

                    // // now set the new arr --->
                    state.allProduct = newAllDataArr

                    // // // update updating value
                    state.updatingProduct = false


                    toast.success(`${action.payload.message}`)

                    // state.allProduct = action.payload.data
                }
            })

            .addCase(updateProductAdmin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.errMsg = action?.error?.message!
                toast.error(`${action.error.message}`);
            })



            .addCase(getAllOrdersAdmin.pending, (state) => {
                state.isLoading = true
                state.isFullfilled = false
            })

            .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isFullfilled = true

                // console.log(action.payload)
                // alert("Ok now")


                if (action.payload.status === false) {

                    state.isError = true
                    toast.error(`${action.payload.message} | 400`)
                } else {
                    // console.log(action.payload.sortBy)

                    state.allOrders = action.payload.data

                    state.searchAllOrders.sortBy = action.payload.sortBy

                    // // // Some Proccessing you can do here --------->


                    let getAllOrders = action.payload.data as AdminAllOrders[]



                    let groupedByCategoryObj: GroupedByData = {}
                    let groupedByBrandObj: GroupedByData = {}

                    let groupedByProductAndSold: GroupedByProductAndSold = {}


                    for (let order of getAllOrders) {

                        for (let item of order.cartData) {

                            // console.log(item.review)

                            // // // Grouping category ------->
                            if (!groupedByCategoryObj[item.category]) {
                                // console.log("dasdaasdfsaf" , item)
                                groupedByCategoryObj[item.category] = [item]
                            }
                            else {
                                groupedByCategoryObj[item.category].push(item)
                            }


                            // // // Grouping brand -------->
                            if (!groupedByBrandObj[item.brand]) {
                                // console.log("dasdaasdfsaf" , item)
                                groupedByBrandObj[item.brand] = [item]
                            }
                            else {
                                groupedByBrandObj[item.brand].push(item)
                            }

                            // // // grouping by poduct name and sold ---->

                            // console.log(item.quantity)


                            if (!groupedByProductAndSold[item.title]) {

                                groupedByProductAndSold[item.title] = item.quantity

                            }
                            else {

                                groupedByProductAndSold[item.title] += item.quantity

                            }


                        }

                    }



                    // console.log(groupedByBrandObj)
                    // console.log(groupedByBrandObj)
                    // console.log(groupedByProductAndSold)


                    state.groupedByCategoryObj = groupedByCategoryObj
                    state.groupedByBrandObj = groupedByBrandObj
                    state.groupedByProductAndSold = groupedByProductAndSold

                }
            })

            .addCase(getAllOrdersAdmin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.errMsg = action?.error?.message!
                toast.error(`${action.error.message}`);
            })



            // // // Extra reducer to get updated order data ------>
            .addCase("order/updateOrder/fulfilled", (state, action: PayloadAction<any, never>) => {

                // console.log(action.payload.data)
                if (action.payload.status) {

                    let updatedOrderData = action.payload.data as AdminAllOrders

                    let orderId = updatedOrderData.id



                    let currentAllOrderData = current(state.allOrders)


                    let findIndexOfUpdatedOrder = currentAllOrderData.findIndex(ele => ele.id === orderId)



                    let newAllOrderArr = [...currentAllOrderData]

                    newAllOrderArr.splice(findIndexOfUpdatedOrder, 1, updatedOrderData)


                    state.allOrders = newAllOrderArr

                }

            })



    }
})



export const { setUpdatingProduct, setProductData } = adminSlice.actions

export const adminDataState = () => useSelector((state: RootState) => state.adminReducer)

export default adminSlice.reducer





