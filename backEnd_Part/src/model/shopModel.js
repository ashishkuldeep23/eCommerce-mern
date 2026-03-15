const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      img: {
         type: String,
         default:
            "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1773050762/zsemv63x5ejoshdozn1s.png",
      },
      products: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
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
         },
      ],

      status: {
         type: String,
         default: "active",
         enum: ["active", "inactive"],
      },
   },
   { timestamps: true },
);

module.exports = mongoose.model("shop", shopSchema);
