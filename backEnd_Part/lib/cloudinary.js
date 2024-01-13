const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`
});


async function uploadImageOnCloudinary(filePath, whereUpload) {

    let result;

    if (filePath) {
        result = await cloudinary.uploader.upload(filePath, { folder: `${whereUpload || "Ecommerce"}` })
    }


    // console.log(result)

    return result
}



async function uploadArrOfImgOnCloud(arrOfImgs, whereUpload) {


    // console.log(arrOfImgs , whereUpload)


    // // // File is comming from multer comming in arr---->

    let resultArr = []


    if (arrOfImgs.length > 0) {

        for (let i = 0; i < arrOfImgs.length; i++) {

            const filePath = arrOfImgs[i].path

            let result = await cloudinary.uploader.upload(filePath, { folder: `${whereUpload || "Ecommerce"}` })

            // console.log(result)

            resultArr.push(result.url)

        }

    }


    return resultArr
}



module.exports = { uploadImageOnCloudinary , uploadArrOfImgOnCloud}