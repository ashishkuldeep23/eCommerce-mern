const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema(
   {
      url: {
         type: String,
      },
      createdBy: mongoose.Schema.Types.ObjectId,
   },
   { timestamps: true },
);

module.exports = mongoose.model("img-model", imgSchema);
