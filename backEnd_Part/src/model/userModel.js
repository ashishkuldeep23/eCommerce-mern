
const mongoose = require("mongoose")
const uuid = require("uuid")


const userSchema = new mongoose.Schema( {

    id : { type : String , default : () => uuid.v4() },
 
    firstName: { type : String , required : true , trim : true },

    lastName: {type : String ,required : true ,trim : true  },

    // // arr of obj
    address: [{
        _id : false ,
        city: { type : String , trim : true} ,
        street: { type : String , trim : true},
        country: { type : String , trim : true},
        pincode: { type : String , trim : true}
    }],

    email: { type: String, required: true, trim : true ,  unique: true },

    password: { type:String, required : true ,  trim : true  , default : "null"},

    profilePic : {type : String , default : "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1700368567/ej31ylpxtamndu3trqtk.png" } ,

    role : { type : String , default : "user" } ,

    whenCreted : {type  : String , default : ()=> Date.now()} ,

    isEmailVerified : {type : Boolean , default : false} ,

    orders : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "order"
    } ,


} , {timestamps : true} )



module.exports = mongoose.model( "user" , userSchema )
