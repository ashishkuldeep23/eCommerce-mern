import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"

// import { IProduct } from "../components/ProductListing/ProductLists"
// import { SingleTypeObject } from "../components/ProductListing/ProductLists";
// import { gettingTokenInCookieAndLocalHost } from "../App";
import { CardDataInter, CartInter } from "../Type/type";
import { gettingTokenInCookieAndLocalHost } from "../Helper/Token";
import { useSelector } from "react-redux";
import { RootState } from "../store";
// import { gettingTokenInCookieAndLocalHost } from "../Helper/Token";


const initialState: CartInter = {
    cartData: [],
    totalPrice: 0
    // totalCartvalue : 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {


        // // // // Not using this fn for now (I have written an extra reducer for that -----> )

        // loadCartFromLoacal(state, action) {
        //     state.cartData = action.payload.data
        // },

        setToTalPrice(state, action) {
            state.totalPrice = action.payload
        },

        addItemInCart(state, action: PayloadAction<CardDataInter>) {
            // alert("Adding into cart")
            const cartItem = action.payload
            let { id, verity } = action.payload

            // const index = state.cartData.findIndex(c => c.id === id && c.verity.name === verity?.name && c.verity.verity[0].label === verity.verity[0].label)
            const index = state.cartData.findIndex(c => id === c.id && verity?.name === c.verity.name && verity.verity[0].data[0].name === c.verity.verity[0].data[0].name)

            // console.log(product, product?.verity)
            let currentCartArr = current(state).cartData

            console.log(index)

            // console.log(currentCartArr[index])


            if (index === -1) {
                state.cartData.unshift(cartItem)
            } else {

                // console.log(currentCartArr[index].quantity)
                state.cartData.splice(index, 1, { ...cartItem, quantity: currentCartArr[index].quantity + 1 })

                // // // also currentState Arr ------------>>
                // currentCartArr.splice(index, 1, { ...cartItem, quantity: currentCartArr[index].quantity + 1 })
            }

            // localStorage.setItem("cardData", JSON.stringify(currentCartArr))

        },

        removeOneItem(state, action: PayloadAction<CardDataInter>) {

            // const cartItem = action.payload
            let { id, verity } = action.payload

            // const index = state.cartData.findIndex(c => c.id === id && c.verity.name === verity?.name && c.verity.verity[0].label === verity.verity[0].label)
            const index = state.cartData.findIndex(c => id === c.id && verity?.name === c.verity.name && verity.verity[0].data[0].name === c.verity.verity[0].data[0].name)

            // console.log(product, product?.verity)
            let currentCartArr = current(state).cartData

            // console.log(currentCartArr)

            // console.log(index)

            if (index !== -1) {
                // console.log(currentCartArr[index].quantity)

                state.cartData.splice(index, 1)

                if (currentCartArr.length === 1) {
                    localStorage.removeItem("cardData")
                }
            }

            // state.cartData = state.cartData.filter(c => c.id !== id && c.verity.name !== verity?.name && c.verity.verity[0].label !== verity.verity[0].label)

            // console.log(product, product?.verity)
            // if (index === -1) {
            //     state.cartData.splice(0, 0, cartItem)
            // } else {
            //     // console.log(currentCartArr[index].quantity)
            //     state.cartData.splice(index, 1, { ...cartItem, quantity: currentCartArr[index].quantity + 1 })
            // }
            // let currentCartArr = current(state).cartData
            // localStorage.setItem("cardData", JSON.stringify(currentCartArr))

        },

        onePlusQuan(state, action: PayloadAction<CardDataInter>) {

            const cartItem = action.payload
            let { id, verity } = action.payload

            const index = state.cartData.findIndex(c => id === c.id && verity?.name === c.verity.name && verity.verity[0].data[0].name === c.verity.verity[0].data[0].name)

            // console.log(index)


            // console.log(product, product?.verity)
            let currentCartArr = current(state).cartData

            if (index !== -1) {
                // state.cartData.splice(0, 0, cartItem)

                // console.log(120, currentCartArr[index].quantity)

                state.cartData.splice(index, 1, { ...cartItem, quantity: currentCartArr[index].quantity + 1 })


                // // // also currentState Arr ------------>>
                // currentCartArr.splice(index, 1, { ...cartItem, quantity: currentCartArr[index].quantity + 1 })
            }

            // localStorage.setItem("cardData", JSON.stringify(currentCartArr))


        },

        oneMinusQuan(state, action: PayloadAction<CardDataInter>) {

            const cartItem = action.payload
            let { id, verity } = action.payload

            const index = state.cartData.findIndex(c => id === c.id && verity?.name === c.verity.name && verity.verity[0].data[0].name === c.verity.verity[0].data[0].name)


            // console.log(index)


            // console.log(product, product?.verity)
            let currentCartArr = current(state).cartData

            if (index !== -1) {
                // state.cartData.splice(0, 0, cartItem)

                // console.log(currentCartArr[index].quantity)

                state.cartData.splice(index, 1, { ...cartItem, quantity: currentCartArr[index].quantity - 1 })

                // // // also currentState Arr ------------>>
                // currentCartArr.splice(index, 1, { ...cartItem, quantity: currentCartArr[index].quantity - 1 })

            }

            // localStorage.setItem("cardData", JSON.stringify(currentCartArr))
        },

        setClearCartData(state) {
            state.cartData = []
            state.totalPrice = 0
            localStorage.removeItem("cardData")
        }

    },


    extraReducers: (builder) => {



        builder
            // // // set card data after getting data from backend (Load cart here) --->
            .addCase("fetchAllProducts/fulfilled", (state) => {
                // console.log("From Cart")

                // // // Set cart in store from localstorage --->

                let getCartLocal = localStorage.getItem("cardData")
                // if (getCartLocal) {
                if (gettingTokenInCookieAndLocalHost() && getCartLocal) {
                    state.cartData = JSON.parse(getCartLocal)
                }

            })

    }


})

export const { addItemInCart, removeOneItem, onePlusQuan, oneMinusQuan, setToTalPrice, setClearCartData } = cartSlice.actions

export default cartSlice.reducer

export const cartState = () => useSelector((state: RootState) => state.CartReducer)
