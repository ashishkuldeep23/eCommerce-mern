const { uploadImageOnCloudinary } = require("../../lib/cloudinary");
const { removeSpace } = require("../helper/helper");
const shopModel = require("../model/shopModel");
const userModel = require("../model/userModel");

exports.getShopsHandler = async (req, res) => {
   try {
      const userId = req.tokenUserData.id;

      if (!userId) {
         return res.status(401).send({
            status: false,
            message:
               "Please SingIn again, Something went wroung with your request.No token found.",
         });
      }

      const allShopsByUSer = await shopModel.find({ createdBy: userId });

      if (!allShopsByUSer || allShopsByUSer.length <= 0)
         return res
            .status(404)
            .send({ status: false, message: "No Shops found." });

      res.status(200).send({
         status: true,
         message: "All Shops fetched successfully",
         data: allShopsByUSer,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({ status: false, message: `${err}` });
   }
};

exports.getSingleShopHandler = async (req, res) => {
   try {
      // const userId = req.tokenUserData.id;

      // if (!userId) {
      //    return res.status(401).send({
      //       status: false,
      //       message:
      //          "Please SingIn again, Something went wroung with your request.No token found.",
      //    });
      // }

      const shopId = req?.params?.shopId?.trim().toLowerCase();

      console.log({ shopId });

      if (!shopId) {
         return res
            .status(400)
            .send({ status: false, message: "Shop Id can't be empty" });
      }

      // const checkShop = await shopModel.findOne({
      //    $or: [{ _id: shopId }, { name: shopId }],
      // });
      const checkShop = await shopModel
         .findOne({ name: shopId })
         .populate({
            path: "createdBy",
            select: "name email   ",
         })
         .populate({
            path: "products",
            select: "name price   ",
         });

      // console.log(checkShop);

      if (!checkShop) {
         return res
            .status(404)
            .send({ status: false, message: "Shop not found" });
      }

      // if (checkShop.createdBy.toString() !== userId.toString()) {
      //    return res
      //       .status(400)
      //       .send({ status: false, message: "Shop not found" });
      // }

      res.status(200).send({
         status: true,
         message: "Shop fetched successfully",
         data: checkShop,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({ status: false, message: `${err}` });
   }
};

exports.createShopHandler = async (req, res) => {
   try {
      const userId = req.tokenUserData.id;

      console.log({ userId });

      if (!userId) {
         return res.status(401).send({
            status: false,
            message:
               "Please SingIn again, Something went wroung with your request.No token found.",
         });
      }

      const body = req.body;

      // console.log(body);
      // console.log(1, req.file);
      // console.log(2, req.files);

      if (Object.keys(body).length <= 0) {
         return res
            .status(400)
            .send({ status: false, message: "Body can't be empty" });
      }

      if (body.name.length <= 0) {
         return res
            .status(400)
            .send({ status: false, message: "Shop name can't be empty" });
      }

      if (typeof body.name !== "string") {
         return res
            .status(400)
            .send({ status: false, message: "Invalid Shop name" });
      }

      if (body.name && body.name.length > 50) {
         return res.status(400).send({
            status: false,
            message: "Shop name can't be more than 50 character",
         });
      }

      // // // check shop already exist
      let checkShop = await shopModel.findOne({
         name: body.name.toLowerCase(),
      });

      if (checkShop) {
         return res
            .status(400)
            .send({ status: false, message: "Shop already exist" });
      }

      if (checkShop && checkShop.isDeleted === true) {
         return res
            .status(400)
            .send({ status: false, message: "Shop is deleted" });
      }

      if (checkShop && checkShop.status === "inactive") {
         return res
            .status(400)
            .send({ status: false, message: "Shop is inactive" });
      }

      const filePathIs = req?.files[0]?.path;
      let shopImg = body.shopImg || req?.files[0]?.path;

      if (filePathIs) {
         const res = await uploadImageOnCloudinary(filePathIs, "Ecommerce");

         shopImg = res.url;
      }

      const newShop = await shopModel.create({
         //  ...req.body,
         name: removeSpace(body.name.trim().toLowerCase()), //body.name.toLowerCase(),
         description: body.description.toLowerCase(),
         img: shopImg,
         createdBy: userId,
         products: [],
         isDeleted: false,
         status: "inactive",
      });

      // // // upadte shopId in user section ---->>
      await userModel.findOneAndUpdate(
         { _id: userId },
         { $push: { shops: newShop._id } },
         { new: true },
      );

      res.status(201).send({
         status: true,
         message: "Shop created successfully",
         data: newShop,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({ status: false, message: `${err}` });
   }
};

exports.updateShopHandler = async (req, res) => {
   try {
      const userId = req.tokenUserData.id;

      if (!userId) {
         return res.status(401).send({
            status: false,
            message:
               "Please SingIn again, Something went wroung with your request.No token found.",
         });
      }

      const shopId = req.params.shopId;

      if (!shopId) {
         return res
            .status(400)
            .send({ status: false, message: "Shop Id can't be empty" });
      }

      const checkShop = await shopModel.findOne({ _id: shopId });

      if (!checkShop) {
         return res
            .status(404)
            .send({ status: false, message: "Shop not found" });
      }

      if (checkShop.createdBy.toString() !== userId.toString()) {
         return res
            .status(401)
            .send({ status: false, message: "You are not authorized" });
      }

      if (checkShop.isDeleted) {
         return res
            .status(400)
            .send({ status: false, message: "Shop already deleted" });
      }

      const body = req.body;

      if (Object.keys(body).length <= 0) {
         return res
            .status(400)
            .send({ status: false, message: "Body can't be empty" });
      }

      if (body.name.length <= 0) {
         return res
            .status(400)
            .send({ status: false, message: "Shop name can't be empty" });
      }

      let shopImg = body.shopImg || req.files[0].path;

      if (shopImg) {
         const res = await uploadImageOnCloudinary(filePathIs, "Ecommerce");

         shopImg = res.url;
      }

      const updatedShop = await shopModel.findOneAndUpdate(
         { _id: shopId },
         {
            name: body.name,
            img: shopImg,
         },
         { new: true },
      );

      res.status(200).send({
         status: true,
         message: "Shop updated successfully",
         data: updatedShop,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({ status: false, message: `${err}` });
   }
};

exports.deleteShopHandler = async (req, res) => {
   try {
      const userId = req.tokenUserData.id;

      if (!userId) {
         return res.status(401).send({
            status: false,
            message:
               "Please SingIn again, Something went wroung with your request.No token found.",
         });
      }

      const shopId = req.params.shopId;

      if (!shopId) {
         return res
            .status(400)
            .send({ status: false, message: "Shop Id can't be empty" });
      }

      const checkShop = await shopModel.findOne({ _id: shopId });

      if (!checkShop) {
         return res
            .status(404)
            .send({ status: false, message: "Shop not found" });
      }

      if (checkShop.createdBy.toString() !== userId.toString()) {
         return res
            .status(401)
            .send({ status: false, message: "You are not authorized" });
      }

      if (checkShop.isDeleted) {
         return res
            .status(400)
            .send({ status: false, message: "Shop already deleted" });
      }

      const deletedShop = await shopModel.findOneAndUpdate(
         { _id: shopId },
         { isDeleted: true },
         { new: true },
      );

      res.status(200).send({
         status: true,
         message: "Shop deleted successfully",
         data: deletedShop,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({ status: false, message: `${err}` });
   }
};

// // // Some Admin Controller functions are also added here because of some dependency. I will move them to adminController file later.

exports.changeShopStatusAdmin = async (req, res) => {
   try {
      const { shopId, status, isDeleted } = req.body;

      if (!shopId) {
         return res
            .status(400)
            .send({ status: false, message: "Shop Id can't be empty" });
      }

      if (!status) {
         return res
            .status(400)
            .send({ status: false, message: "Status can't be empty" });
      }

      const checkShop = await shopModel.findOne({ _id: shopId });

      if (!checkShop) {
         return res
            .status(404)
            .send({ status: false, message: "Shop not found" });
      }

      if (checkShop.isDeleted) {
         return res
            .status(400)
            .send({ status: false, message: "Shop already deleted" });
      }

      const possibleStatus = ["active", "inactive"];

      const newStatus = possibleStatus.includes(status) ? status : "inactive";

      const updatedShop = await shopModel.findOneAndUpdate(
         { _id: shopId },
         { isActive: newStatus, isDeleted: isDeleted || false },
         { new: true },
      );

      res.status(200).send({
         status: true,
         message: "Shop status updated successfully",
         data: updatedShop,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({ status: false, message: `${err}` });
   }
};

exports.getAllShopsAdmin = async (req, res) => {
   try {
      const allShops = await shopModel.find();

      res.status(200).send({
         status: true,
         message: "All Shops fetched successfully",
         data: allShops,
      });
   } catch (err) {
      console.log(err);
      res.status(500).send({ status: false, message: `${err}` });
   }
};
