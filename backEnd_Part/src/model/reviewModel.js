
const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema( {

    productName : String,

    comment : {
        type : String ,
        required : true
    } ,
    likes : {
        type : Number ,
        required : true,
        default : 0
    },
    dislikes : {
        type : Number ,
        required : true,
        default : 0
    },
    product : {
        type : objectId ,
        ref : "product"
    },
    isDeleted : {
        type : Boolean ,
        default : false
    }

} , {timestamps : true} )



module.exports = mongoose.model( "review" , reviewSchema )
