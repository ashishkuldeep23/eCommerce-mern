const mongoose = require("mongoose")
const uuid = require("uuid")




// paymentMethod: string,
// cartData: CardDataInter[],
// whenCreated: string,
// totalItems: number,
// totalPrice: string,



const orderSchema = new mongoose.Schema({
    id: { type: String, default: () => uuid.v4() },

    fullName: { type: String, required: true, trim: true },

    phone : {type : String , required : true , trim : true} ,

    address : {
        _id: false,
        city: { type: String, trim: true },
        street: { type: String, trim: true },
        country: { type: String, trim: true },
        pincode: { type: String, trim: true }
    } ,

    paymentMethod : { type: String, required: true, trim: true },

    whenCreated : { type: String, required: true, trim: true },

    totalPrice : { type: String, required: true, trim: true },

    totalItems : { type: Number, required: true, trim: true },

    cartData : { type: Array, required: true },

    userId : {type : String , required : true} ,

    status : {type : String , required : true , default : "Pending"} ,

} , {timestamps : true})



module.exports = mongoose.model("order" , orderSchema)