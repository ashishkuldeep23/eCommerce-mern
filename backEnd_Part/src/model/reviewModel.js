
const mongoose = require("mongoose")
const uuid = require("uuid")
const objectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema( {

    productName : String,

    id: {
        type : String,
        unique: true,
        required : true,
        default : ()=> uuid.v4()
    } ,

    userId : {
        type : String ,
        default : "ashish" 
        // // // TODO :- yaha pr userID dena hoga jisne review post kiya hai uska
    },

    userData : {

        userName : {
            type : String ,
            required : true ,
            trim : true,
            default : "ABCD" 
        } ,

        userImg : {
            type : String ,
            required : true ,
            default : "https://cdn1.vectorstock.com/i/1000x1000/10/05/user-icon-vector-22391005.jpg"
        }

    },

    comment : {
        type : String ,
        required : true
    } ,

    stars : {
        type : Number ,
        required : true , 
        default : 5,
        min: 0,
        max: 5
    },

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
    productID : {
        type : objectId ,
        ref : "product"
    },
    isDeleted : {
        type : Boolean ,
        default : false
    } ,
    whenCreated : {
        type : String ,
        default : ()=>{
            let a = new Date()
            return a.toLocaleDateString()
        }
    }

} , {timestamps : true} )



module.exports = mongoose.model( "review" , reviewSchema )
