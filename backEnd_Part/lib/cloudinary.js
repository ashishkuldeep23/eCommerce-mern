const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`
});


async function uploadImageOnCloudinary( filePath , whereUpload ){

    let result;

    if(filePath){
        result = await cloudinary.uploader.upload(filePath , { folder: `${whereUpload || "Ecommerce"}` })
    }


    // console.log(result)

    return result


}


module.exports = { uploadImageOnCloudinary }