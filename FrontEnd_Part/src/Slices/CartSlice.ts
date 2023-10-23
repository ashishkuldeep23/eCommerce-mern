import { createSlice, current } from "@reduxjs/toolkit"


import { IProduct } from "../components/ProductListing/ProductLists"



// // // This is how card data look like
interface CardDataInter extends IProduct {

    quantity: number;
    verity: {}

}


interface CartInter {
    cartData: CardDataInter[]
}



const initialState: CartInter = {
    cartData: []
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        loadCartFromLoacl(state, action) {
            state.cartData = action.payload.data
        },

        addItemInCart(state, action) {
            // alert("Adding into cart")

            let {id} = action.payload

            // alert(id)

            let cCartState = current(state)

            let item = cCartState.cartData.find( (ele)=> ele.id === id )

            if(item){
               alert("yess")
            }


            state.cartData.push(action.payload)

        },

        removeOneItem(state, action) {

            // console.log(action)
            alert(action.payload.id)

            let currentCartArr = current(state.cartData)

            console.log(currentCartArr)


            let newArr = currentCartArr.filter( ele => ele.id !== action.payload.id )

            state.cartData = newArr



        },


    }
})



export const { addItemInCart, removeOneItem, loadCartFromLoacl } = cartSlice.actions

export default cartSlice.reducer

