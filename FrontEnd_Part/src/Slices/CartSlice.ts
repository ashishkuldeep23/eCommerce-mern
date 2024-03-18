import { createSlice, current } from "@reduxjs/toolkit"

import { IProduct } from "../components/ProductListing/ProductLists"

import { SingleTypeObject } from "../components/ProductListing/ProductLists";
import { gettingTokenInCookieAndLocalHost } from "../App";


// // // This is how card data look like
export interface CardDataInter extends IProduct {

    quantity: number;
    verity: SingleTypeObject;

}


interface CartInter {
    cartData: CardDataInter[],
    totalPrice: number;
}



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

        addItemInCart(state, action) {
            // alert("Adding into cart")

            let { id, verity } = action.payload

            // alert(id)
            // console.log(action.payload)

            // console.log(verity)
            let cCartState = current(state)




            let item = null


            // console.log(cCartState.cartData)
            // console.log(cCartState.cartData.length)


            for (let i = 0; i < cCartState.cartData.length; i++) {

                // console.log(cCartState.cartData[i].verity)

                let ele = cCartState.cartData[i]

                if (ele.verity.typeId === verity.typeId) {

                    // console.log(cCartState.cartData[i])

                    item = cCartState.cartData[i]
                    break

                }

            }


            let newArr = [...cCartState.cartData]

            if (item) {

                let index = cCartState.cartData.findIndex((ele) => ele.id === id && ele.verity.typeId === verity.typeId)


                // console.log("same dedected")

                let newItemObject = { ...item, quantity: item.quantity + 1 }

                // console.log(index , item)

                newArr.splice(index, 1, newItemObject)

                // console.log(newArr)

                state.cartData = newArr




            } else {

                // state.cartData.unshift(action.payload)

                newArr.unshift(action.payload)

                state.cartData = newArr

            }



            localStorage.setItem("cardData", JSON.stringify(newArr))

        },

        removeOneItem(state, action) {

            // console.log(action)
            // alert(action.payload.id)

            let { verity } = action.payload

            // console.log(action.payload)

            let currentCartArr = current(state.cartData)

            // console.log(currentCartArr)


            let newArr = currentCartArr.filter(ele => ele.verity.typeId !== verity.typeId)

            state.cartData = newArr

            localStorage.setItem("cardData", JSON.stringify(newArr))
        },

        onePlusQuan(state, action) {

            const { verity } = action.payload


            let currentCartArr = current(state.cartData)

            let index = currentCartArr.findIndex((ele) => ele.verity.typeId === verity.typeId)


            // console.log(index , data)

            let newArr = [...currentCartArr]

            let item = { ...action.payload, quantity: action.payload.quantity + 1 }

            newArr.splice(index, 1, item)

            state.cartData = newArr

            localStorage.setItem("cardData", JSON.stringify(newArr))


        },

        oneMinusQuan(state, action) {

            const { verity } = action.payload

            let currentCartArr = current(state.cartData)

            let index = currentCartArr.findIndex((ele) => ele.verity.typeId === verity.typeId)

            // console.log(index , data)

            let newArr = [...currentCartArr]

            let item = { ...action.payload, quantity: action.payload.quantity - 1 }

            newArr.splice(index, 1, item)

            state.cartData = newArr

            localStorage.setItem("cardData", JSON.stringify(newArr))

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

                if (gettingTokenInCookieAndLocalHost() && getCartLocal) {
                    state.cartData = JSON.parse(getCartLocal)
                }

            })

    }


})



export const { addItemInCart, removeOneItem, onePlusQuan, oneMinusQuan, setToTalPrice, setClearCartData } = cartSlice.actions

export default cartSlice.reducer

