const mongoose = require("mongoose");

const uuid = require("uuid");
const objectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
   {
      id: {
         type: String,
         unique: true,
         required: true,
         default: () => uuid.v4(),
      },

      // // // not default values (These vlaue should given during the creation of new product) -->

      title: {
         type: String,
         required: [true, "Title of product is required"],
         trim: true,
      },

      // brand: String,
      // category: String,

      description: {
         fullName: String,

         aboutProduct: String,

         highLights: [String],
         // // highlights is an array with some strings
         //Samsung product
         // Multi-tasking
         // Budget friendly

         specifications: [
            {
               // key : String
               // // // {key : it's value} Ex : {Designed by : Exercise,regular and advanced pilates} , {Pack of : 1} etc.
            },
         ],

         product_Details: [
            {
               // key : String
               // //  Ex : { Ideal For :  Men, Women, Kids} , {Shape : Rectangular} , {Sales Package : 1 yoga mat and 1 carry bag}
            },
         ],

         dimensions: [
            {
               // key : String
               // // // Ex :   {Width : 61 mm } , {Height : 183 mm} , {Thickness : 6 mm} , {Diameter : 183 mm} , {Weight : 0.7 kg }
            },
         ],
      },

      price: {
         type: Number,
         required: true,
      },

      discountPercentage: {
         type: Number,
         default: 0,
      },

      // type: [
      //     {
      //         _id: false,
      //         typeName: [String, String],
      //         // // [key , value] ex : ["color" , "white"]
      //         typeVerity: [String, String],
      //         // // [key , value] ex : ["RAM-ROM" , "4-64"]
      //         typeStock: { type: Number, default: 0 },
      //         typePrice: { type: Number, default: 0 },
      //         typeId: {
      //             type: String,
      //             default: () => uuid.v4()
      //         }

      //     }
      // ],

      type: [
         {
            // id: String, // internal key only
            // name: String,
            // imgs: [String],
            // verity: [
            //    {
            //       id: String, // internal key only
            //       name: String,
            //       imgs: [String],
            //       verity: [
            //          {
            //             id: String, // internal key only
            //             name: String,
            //             price: Number,
            //             stock: Number,
            //          },
            //       ],
            //    },
            // ],
         },
      ],

      createdBy: {
         type: objectId,
         ref: "user",
      },

      caretory: {
         type: objectId,
         ref: "category",
      },

      categoryName: String,

      brand: {
         type: objectId,
         ref: "brand",
      },

      brandName: String,

      thumbnail: {
         type: String,
         default:
            "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1773050762/zsemv63x5ejoshdozn1s.png",
      },

      images: {
         type: Array,
         default: [
            "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1773050762/zsemv63x5ejoshdozn1s.png",
         ],
      },

      // // // Default values here ----->

      review: {
         type: [objectId],
         ref: "review",
      },

      rating: {
         totalPerson: {
            type: Number,
            default: 0,
         },
         avgRating: {
            type: Number,
            default: 0,
         },
      },

      isHighlight: {
         type: Boolean,
         default: false,
      },

      likes: {
         type: Number,
         required: true,
         default: 0,
      },
      dislikes: {
         type: Number,
         required: true,
         default: 0,
      },

      likedUserIds: {
         type: [String],
         default: [],
      },

      dislikedUserIds: {
         type: [String],
         default: [],
      },

      isDeleted: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true },
);

module.exports = mongoose.model("product", productSchema);
