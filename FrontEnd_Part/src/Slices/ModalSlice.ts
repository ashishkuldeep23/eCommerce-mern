
import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../store";


// import type { PayloadAction } from "@reduxjs/toolkit"
// // // Above will use in action object , see the docs.


interface ModalInter{
    open : boolean ,
    children: React.ReactNode;
}



const initialState : ModalInter = { open : false , children : "" }



const modalSlice = createSlice( {
    name : "modal" , 
    initialState ,
    reducers : {


        setOpenMoadl(state , action){
            state.open = action.payload
        } ,

        setChildrenModal(state , action){
            state.children = action.payload
        }


    }
} )



export const { setOpenMoadl , setChildrenModal } = modalSlice.actions

export const modalStore = () => useSelector((state: RootState) => state.modalReducer)

export default modalSlice.reducer





