// src/services/product.service.ts
// import Product from "../models/product.model";
// import User from "../models/user.model";

const productModel = require("../model/productModel");
const userModel = require("../model/userModel");

const increaseView = async (productId) => {
   console.log("yes get called");

   await productModel.updateOne({ _id: productId }, { $inc: { views: 1 } });
};

const addToHistory = async (userId, productId) => {
   if (!userId) return;

   await userModel.updateOne(
      { _id: userId },
      {
         $pull: { history: { product: productId } },
         $push: {
            history: {
               $each: [{ product: productId, viewedAt: new Date() }],
               $position: 0,
               $slice: 20,
            },
         },
      },
   );
};

module.exports = { increaseView, addToHistory };
