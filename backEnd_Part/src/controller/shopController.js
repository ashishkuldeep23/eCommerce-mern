const { uploadImageOnCloudinary } = require("../../lib/cloudinary");
const shopModel = require("../model/shopModel");

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

exports.createShopHandler = async (req, res) => {
   try {
      const userId = req.tokenUserData.id;

      if (!userId) {
         return res.status(401).send({
            status: false,
            message:
               "Please SingIn again, Something went wroung with your request.No token found.",
         });
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

      const newShop = await shopModel.create({
         //  ...req.body,
         name: body.name,
         img: shopImg,
         createdBy: userId,
         products: [],
         isDeleted: false,
      });

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
