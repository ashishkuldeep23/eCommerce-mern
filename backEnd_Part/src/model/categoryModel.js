const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
   {
      name: {
         type: String,
      },
      
      img: {
         type: String,
      },

      products: [mongoose.Schema.Types.ObjectId],
   },
   { timestamps: true },
);

module.exports = mongoose.model("category", categorySchema);
