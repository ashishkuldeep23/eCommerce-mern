
const mongoose = require("mongoose")



var uuid = require('node-uuid');


const productSchema = new mongoose.Schema({

    id: {
        type: String,
        unique: true,
        required : true,
        default: () => uuid.v1()
    },

    title: {
        type: String,
        required: [true, "Title of product is required"],
        trim: true
    },

    description: {
        fullName: String,
        aboutProduct: String,
        highLights: [String],
        specifications: [
            {
                // key : String
                // // // {key : it's value} Ex : {Designed by : Exercise,regular and advanced pilates} , {Pack of : 1} etc.
            }
        ],


        product_Details: [
            {
                // key : String
                // //  Ex : { Ideal For :  Men, Women, Kids} , {Shape : Rectangular} , {Sales Package : 1 yoga mat and 1 carry bag}
            }
        ],

        dimensions: [
            {
                // key : String 
                // // // Ex :   {Width : 61 mm } , {Height : 183 mm} , {Thickness : 6 mm} , {Diameter : 183 mm} , {Weight : 0.7 kg }
            }
        ]

    },

    price: {
        type: Number,
        required: true
    },

    type: [
        {
            // typeName: [String, String],
            // // // [key , value] ex : ["color" , "white"]
            // typeStock: Number,
            // typeVerity: [String, String]
            // // // [key , value] ex : ["RAM-ROM" , "4-64"]
        }
    ],

    discountPercentage: Number,

    brand: String,

    review : {
        type : [mongoose.Schema.Types.ObjectId] ,
        ref : "review"
    },

    rating: {
        totalPerson: Number,
        avgRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        }
    },
    

    category: String,
    thumbnail: String,
    images: {
        type: Array,
    },
    isHighlight : {
        type : Boolean ,
        default : false
    },
    isDeleted : {
        type : Boolean ,
        default : false
    }

},
    { timestamps: true }
)



module.exports = mongoose.model('product', productSchema)

