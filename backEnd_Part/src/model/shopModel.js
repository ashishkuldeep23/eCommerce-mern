const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         default: "",
      },
      msg: {
         type: String,
         default: "",
      },
      // category: {
      //    type: mongoose.Schema.Types.ObjectId,
      //    ref: "category",
      //    required: true,
      // },
      // brand: {
      //    type: mongoose.Schema.Types.ObjectId,
      //    ref: "brand",
      //    required: true,
      // },
      img: {
         type: String,
         default:
            "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1773050762/zsemv63x5ejoshdozn1s.png",
      },
      products: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            default: [],
         },
      ],

      createdBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user",
      },

      isDeleted: {
         type: Boolean,
         default: false,
      },

      views: {
         type: Number,
         default: 0,
      },

      likes: {
         type: Number,
         default: 0,
      },

      likedBy: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            default: [],
         },
      ],

      status: {
         type: String,
         default: "inactive",
         enum: ["active", "inactive"],
      },
   },
   { timestamps: true },
);

module.exports = mongoose.model("shop", shopSchema);
