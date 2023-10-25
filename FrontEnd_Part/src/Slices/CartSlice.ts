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

            let { id } = action.payload

            // alert(id)

            let cCartState = current(state)

            let item = cCartState.cartData.find((ele) => ele.id === id)


            let newArr = [...cCartState.cartData]

            if (item) {
                // alert("yess")
                // console.log(item)

                // // // Now find index of item 

                let index = cCartState.cartData.findIndex((ele) => ele.id === id)



                item = { ...item , quantity : item.quantity+1 }

                // console.log(index , item)

                newArr.splice( index , 1 , item )

                // console.log(newArr)

                state.cartData = newArr


                // state.cartData = []

            } else {

                // state.cartData.unshift(action.payload)

                newArr.unshift(action.payload)

                state.cartData = newArr

                // console.log(newArr)

            }



            localStorage.setItem("cardData", JSON.stringify(newArr))


        },

        removeOneItem(state, action) {

            // console.log(action)
            // alert(action.payload.id)

            let currentCartArr = current(state.cartData)

            // console.log(currentCartArr)


            let newArr = currentCartArr.filter(ele => ele.id !== action.payload.id)

            state.cartData = newArr

            localStorage.setItem("cardData", JSON.stringify(newArr))
        },


        onePlusQuan(state , action){

            const {data} = action.payload


            let currentCartArr = current(state.cartData)

            let index = currentCartArr.findIndex((ele) => ele.id === data.id)

            
            // console.log(index , data)

            let newArr = [...currentCartArr]

            let item = { ...data , quantity : data.quantity+1 }

            newArr.splice( index , 1 , item )

            state.cartData = newArr

            localStorage.setItem("cardData", JSON.stringify(newArr))

            
        },
        
        oneMinusQuan(state , action){

            const {data} = action.payload
            
            let currentCartArr = current(state.cartData)

            let index = currentCartArr.findIndex((ele) => ele.id === data.id)

            // console.log(index , data)

            let newArr = [...currentCartArr]

            let item = { ...data , quantity : data.quantity-1 }

            newArr.splice( index , 1 , item )

            state.cartData = newArr

            localStorage.setItem("cardData", JSON.stringify(newArr))

        },


    }
})



export const { addItemInCart, removeOneItem, loadCartFromLoacl , onePlusQuan , oneMinusQuan } = cartSlice.actions

export default cartSlice.reducer

