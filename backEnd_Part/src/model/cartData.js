const mongoose = require("mongoose");

const cartDataSchema = new mongoose.Schema({


    
}, { timestamps: true });

module.exports = mongoose.model("cartData", cartDataSchema);
