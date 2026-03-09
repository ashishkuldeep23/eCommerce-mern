const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
   {
      name: {
         type: String,
      },
      
      img: {
         type: String,
         default : 'https://res.cloudinary.com/dlvq8n2ca/image/upload/v1773050762/zsemv63x5ejoshdozn1s.png'
      },

      products: [mongoose.Schema.Types.ObjectId],
   },
   { timestamps: true },
);

module.exports = mongoose.model("category", categorySchema);
