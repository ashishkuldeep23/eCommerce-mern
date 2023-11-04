

const reviewModel = require("../model/reviewModel")
const productModel = require("../model/productModel")
const uuid = require("uuid")


async function createNewReview(req, res) {

    // console.log(req.body)

    if (Object.keys(req.body).length <= 0) {
        return res.status(400).send({ status: false, message: "Body can't be Empty" })
    }

    // // // Some validation for string and all --->

    const { productID, stars } = req.body

    // console.log(mongoose.isValidObjectId(product))

    // console.log(productID)



    if (!productID || !uuid.validate(productID)) {
        return res.status(400).send({ status: false, message: "Bad object id or Product objectId is not given." })
    }



    // // // Check any product is present with this objectID or not -->

    let findProduct = await productModel.findOne({ id: productID }).lean()

    if (!findProduct) {
        return res.status(400).send({ status: false, message: "No product found with given object id." })
    }

    // console.log(findProduct)

    console.log("now update product")

    // findProduct.rating.totalPerson = findProduct.rating.totalPerson + 1


    // // // now update db with new review ----->
    let updateProductWithReview = await productModel.findOneAndUpdate(
        { _id: findProduct._id },
        {
            $set: { rating: { totalPerson: findProduct.rating.totalPerson+1 , avgRating: findProduct.rating.avgRating + stars } }
        },
        { new: true, upsert: true }
    )

    // console.log(updateProductWithReview)


    // // // Give name of product --->
    req.body.productName = findProduct.title
    req.body.productID = findProduct._id

    let newReview = await reviewModel.create(req.body)


    return res.status(201).send({ status: true, message: "Review created successfully", data: newReview })

}


module.exports = { createNewReview }
