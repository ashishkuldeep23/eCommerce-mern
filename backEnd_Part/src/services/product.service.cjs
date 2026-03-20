// src/services/product.service.ts
// import Product from "../models/product.model";
// import User from "../models/user.model";

const productModel = require("../model/productModel");
const userModel = require("../model/userModel");

const increaseView = async (productId) => {
   // console.log("yes get called");

   await productModel.findOneAndUpdate(
      { id: productId },
      { $inc: { views: 1 } },
      // { new: true },
   );

   // console.log({ productId });
   // let a = await productModel.findById(productId);

   // console.log({ a });
};

const addToHistory = async (userId, productId) => {
   // console.log("yes get called");

   console.log({ userId, productId });

   if (!userId || !productId) return;

   let searchproduct = await productModel.findOne({ id: productId });

   // console.log({ userId, productId, searchproductId: searchproduct._id });

   if (!searchproduct) return;

   await userModel.findOneAndUpdate(
      { _id: userId },
      [
         {
            $set: {
               history: {
                  $let: {
                     vars: {
                        // Filter out the existing product entry first
                        filteredHistory: {
                           $filter: {
                              input: "$history",
                              cond: {
                                 $ne: ["$$this.product", searchproduct._id],
                              },
                           },
                        },
                     },
                     in: {
                        // Prepend the new entry and slice to keep the top 20
                        $slice: [
                           {
                              $concatArrays: [
                                 [
                                    {
                                       product: searchproduct._id,
                                       viewedAt: new Date(),
                                    },
                                 ],
                                 "$$filteredHistory",
                              ],
                           },
                           20,
                        ],
                     },
                  },
               },
            },
         },
      ],
      // { new: true },
   );

   // console.log({ a });
};

module.exports = { increaseView, addToHistory };
