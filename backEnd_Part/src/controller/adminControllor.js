
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

        if (thumbnailIndex === "-1") {
            recivedBodyData.thumbnail = recivedBodyData.images[0]
        } else {
            recivedBodyData.thumbnail = recivedBodyData.images[thumbnailIndex]
        }

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

        // console.log(productId)
        // console.log(getProduct)


        // // // This var should store mongoose object inside It (after proceessing ) ---->
        let updatedData;


        if (whatUpadte === "highlight") {

            let { isHighlight } = resBody

            if (isHighlight === undefined || isHighlight === "") {
                return res.status(404).send({ status: false, message: "Please provide isHighlight value." })
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

            if (isDeleted === undefined || isDeleted === "") {
                return res.status(404).send({ status: false, message: "Please provide isHighlight value." })
            }

            isDeleted = JSON.parse(isDeleted)

            if (isDeleted) {
                getProduct.isDeleted = true
            } else {
                getProduct.isDeleted = false
            }


        }
        else if (whatUpadte === "allUpdate") {


            // console.log("Updating product now , Can be complicated")

            if (Object.keys(resBody).length <= 0) {
                return res.status(400).send({ status: false, message: "Body can't be empty" })
            }


            let { whenCreted, imageInputBy, thumbnailIndex, type, description, category, discountPercentage, price, brand, title } = resBody


            // console.log(whenCreted, imageInputBy, thumbnailIndex, type, description, category, discountPercentage, price, brand, title)


            if (!whenCreted || !imageInputBy || !thumbnailIndex || !type || !description || !category || !discountPercentage || !price || !brand || !title) {
                return res.status(400).send({ status: false, message: "All feilds are not given." })
            }


            let recivedBodyData = {}

            for (let key of Object.keys(resBody)) {
                // console.log(key)
                recivedBodyData[key] = JSON.parse(resBody[key])
            }

            // console.log(recivedBodyData)


            if (recivedBodyData.imageInputBy === "by_image") {

                const allFiles = req.files

                if (allFiles.length > 0) {

                    let result = await uploadArrOfImgOnCloud(allFiles, "product_Imgs_Ecom")

                    if (result.length > 0) {
                        recivedBodyData.images = result
                    }


                }

            }

            // console.log("Thumbnail --------->" ,recivedBodyData.images[0])

            // console.log(thumbnailIndex)

            if (!thumbnailIndex || thumbnailIndex === "-1") {
                // console.log("Yes")
                recivedBodyData.thumbnail = recivedBodyData.images[0]
            } else {
                recivedBodyData.thumbnail = recivedBodyData.images[thumbnailIndex]
            }



            // updatedData = await productModel.findOne({ id : productId })


            // console.log(  "Got this for update ---------------> " , getProduct )

            // // // Now update fields mainually one by one --->


            // console.log(recivedBodyData)


            // // Basic info upadte --->
            getProduct.title = recivedBodyData.title
            getProduct.brand = recivedBodyData.brand
            getProduct.price = recivedBodyData.price
            getProduct.discountPercentage = recivedBodyData.discountPercentage
            getProduct.category = recivedBodyData.category


            // // // Discription update ---->

            let { specifications, product_Details, highLights, dimensions, aboutProduct, fullName } = recivedBodyData.description

            if (!specifications || !product_Details || !highLights || !dimensions || !aboutProduct || !fullName) return res.status(400).send({ status: false, message: "Try again, Description all keys are not coming." })

            getProduct.description.specifications = specifications
            getProduct.description.product_Details = product_Details
            getProduct.description.highLights = highLights
            getProduct.description.dimensions = dimensions
            getProduct.description.aboutProduct = aboutProduct
            getProduct.description.fullName = fullName

            // // // type or options update ---->
            getProduct.type = [...recivedBodyData.type]

            // // // Images and ThumbNail upadte ---->
            getProduct.images = recivedBodyData.images
            getProduct.thumbnail = recivedBodyData.thumbnail

        }
        else if (whatUpadte === "next") {

        }

        updatedData = await getProduct.save()

        // console.log("By updated", updatedData)

        res.status(200).send({ status: true, message: `${updatedData.title}, updated succesfully.`, data: updatedData })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }
}



let orderModel = require("./../model/orderModel")

async function getAllOrdersAdmin(req, res) {
    try {


        // // // .sort({createdAt : "-1"}) 


        // // -1 === Latest 
        // // 1 === Oldest


        let sortBy = {
            createdAt: "-1"
        }

        const sort = req.query.sort

        if (sort && sort === '1') {
            sortBy.createdAt = '1'
        }


        let getAllOrders = await orderModel.find().sort(sortBy).select({
            "_id" : false,
            'createdAt': false,
            'updatedAt': false,
            '__v': false,
            'cartData.review': false,
            'cartData.dislikedUserIds': false,
            'cartData.likedUserIds': false,
            'cartData.likes': false,
            'cartData.dislikes': false,
            'cartData.__v': false,
        })

        // console.log(getAllOrders)

        if (getAllOrders.length <= 0) {
            return res.status(404).send({ status: false, message: "No order found for now." })
        }

        // console.log(getAllOrders[0].cartData[0].category)
        // console.log(getAllOrders[0].cartData[0].brand)


        // // // Do this of frontEnd ----->


        // console.log(sortByCategoryObj)
        // console.log(sortByBrandObj)


        

        res.status(200).send({
            status: true,
            message: "Getting all orders for admin.",
            dataLen: getAllOrders.length,
            data: getAllOrders,
            sortBy : sortBy.createdAt,
        })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }
}


module.exports = { createNewProduct, getAllProductsAdmin, updateProdct, getAllOrdersAdmin }
