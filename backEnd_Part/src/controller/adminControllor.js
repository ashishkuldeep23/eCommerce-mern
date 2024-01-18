
const uuid = require("uuid")

const { uploadArrOfImgOnCloud } = require('../../lib/cloudinary')

// // // required models ---->

const productModel = require("../model/productModel")
// const reviewModel = require("../model/reviewModel")


async function createNewProduct(req, res) {

    try {

        // // // Lot of work not done now (USE this api as admin api ) ------->


        // console.log({ ...req.body })
        // console.log("files are ---->", req.files)

        // // // Check body (body can't be empty)

        if (Object.keys(req.body).length <= 0) {
            return res.status(400).send({ status: false, message: "Body can't be empty" })
        }


        // // // Incomming keys -->
        let { whenCreted, imageInputBy, thumbnailIndex, type, description, category, discountPercentage, price, brand, title } = req.body


        if (!whenCreted || !imageInputBy || !thumbnailIndex || !type || !description || !category || !discountPercentage || !price || !brand || !title) {
            return res.status(400).send({ status: false, message: "All feilds are not given." })
        }



        // // // Validation ---> 


        // // // taking care of image (URL and Actual Images) ----->


        let recivedBodyData = {}

        for (let key of Object.keys(req.body)) {

            // console.log(key)

            recivedBodyData[key] = JSON.parse(req.body[key])

        }



        // console.log(recivedBodyData)


        // const images = []



        if (recivedBodyData.imageInputBy === "by_image") {

            const allFiles = req.files

            if (allFiles.length > 0) {


                // for (let i = 0; i < allFiles.length; i++) {

                //     console.log(allFiles[i])

                //     let filePathIs = allFiles[i].path

                //     let result = await uploadImageOnCloudinary(filePathIs, "product_Imgs_Ecom")

                //     console.log(result)
                //     images.push(result)

                // }



                let result = await uploadArrOfImgOnCloud(allFiles, "product_Imgs_Ecom")


                if (result.length > 0) {
                    recivedBodyData.images = result
                }


            }

        }

        // console.log("Thumbnail --------->" ,recivedBodyData.images[0])

        recivedBodyData.thumbnail = recivedBodyData.images[thumbnailIndex]

        // console.log({createdData : recivedBodyData})

        let newProduct = await productModel.create(recivedBodyData)
        // 
        // console.log(newProduct)

        res.status(201).send({ status: true, message: "Product created successfully.", data: newProduct })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }
}


async function getAllProductsAdmin(req, res) {

    try {

        let everyProducts = await productModel.find().select("-_id -__v -updatedAt -createdAt")

        // console.log(everyProducts)

        if (everyProducts.length <= 0) {
            return res.status(404).send({ status: false, message: "No product found" })
        }


        return res.status(200).send({ status: true, message: "All products fetched for admin", data: everyProducts })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }
}



async function updateProdct(req, res) {
    try {


        const { whatUpadte, productId, ...resBody } = req.body;

        if (!whatUpadte) {
            return res.status(400).send({ status: false, message: "What upadte not given check Api Controller" })
        }

        if (!productId) return res.status(400).send({ status: false, message: "Please provide productId in body." })


        let getProduct = await productModel.findOne({ id: productId })
        if (!getProduct) {
            return res.status(404).send({ status: false, message: "Product not found with given id." })
        }

        let updatedData;


        if (whatUpadte === "highlight") {

            let { isHighlight } = resBody

            if( isHighlight === undefined  || isHighlight === ""){
                return  res.status(404).send({ status: false, message: "Please provide isHighlight value." })
            }

            isHighlight = JSON.parse(isHighlight)

            if (isHighlight) {
                getProduct.isHighlight = true
            } else {
                getProduct.isHighlight = false
            }

        }
        else if (whatUpadte === "makeDelete") {
            let { isDeleted } = resBody

            // console.log(isDeleted)

            if( isDeleted === undefined  || isDeleted === ""){
                return  res.status(404).send({ status: false, message: "Please provide isHighlight value." })
            }

            isDeleted = JSON.parse(isDeleted)

            if(isDeleted){
                getProduct.isDeleted = true
            }else{
                getProduct.isDeleted = false
            }


        }
        else if(whatUpadte === "next"){

        }

        updatedData = await getProduct.save()

        // console.log("By updated", updatedData)

        res.status(200).send({ status: true, message: "Product update succesfull", data: updatedData })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }
}



module.exports = { createNewProduct, getAllProductsAdmin, updateProdct }
