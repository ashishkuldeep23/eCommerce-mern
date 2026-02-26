const { uploadArrOfImgOnCloud } = require("../../lib/cloudinary");
const imgUrlModel = require("../model/imgUrlModel");

exports.generateImgUrl = async (req, res) => {
   try {
      const allFiles = req.files;

      //   console.log(allFiles);

      if (allFiles.length > 0) {
         let result = await uploadArrOfImgOnCloud(
            allFiles,
            "product_Imgs_Ecom",
         );

         //  console.log(result);
         // // // TODO: Here we will store in get url ------------->>

         if (result.length > 0) {
            // recivedBodyData.images = result;

            await imgUrlModel.insertMany(
               result.map((e) => ({
                  url: e,
                  createdBy: req.tokenUserData._id,
               })),
            );

            res.status(200).send({
               status: true,
               message: `Imgs uplaoded successfully.`,
               uploadedUrls: result,
            });
         }
      }
   } catch (error) {
      console.log(error?.message);
      res.status(500).send({
         status: false,
         message: `Server Error (${error?.message})`,
      });
   }
};

exports.getAllImgUrls = async (req, res) => {
   try {
      let findUrls = await imgUrlModel.find();
      res.status(200).send({
         status: true,
         message: `Imgs fetched.`,
         data: findUrls?.map((e) => e.url),
      });
   } catch (error) {
      console.log(error?.message);
      res.status(500).send({
         status: false,
         message: `Server Error (${error?.message})`,
      });
   }
};
