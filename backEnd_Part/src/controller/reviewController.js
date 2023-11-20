

const reviewModel = require("../model/reviewModel")
const productModel = require("../model/productModel")
const uuid = require("uuid")


async function createNewReview(req, res) {


    try {


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

        console.log("new review created")

        // findProduct.rating.totalPerson = findProduct.rating.totalPerson + 1


        // // // now update db with new review ----->
        let updateProductWithReview = await productModel.findOneAndUpdate(
            { _id: findProduct._id },
            {
                $set: { rating: { totalPerson: findProduct.rating.totalPerson + 1, avgRating: findProduct.rating.avgRating + stars } }
            },
            { new: true, upsert: true }
        )

        // console.log(updateProductWithReview)


        // // Get user data and post ------------->

        // console.log(req.tokenUserData)

        // // // User data ----------->

        req.body.userId = req.tokenUserData.userId
        req.body.userData = { userName: req.tokenUserData.userName, userImg: req.tokenUserData.userImg, userUID: req.tokenUserData.userUID }


        // // // Give name of product --->
        req.body.productName = findProduct.title
        req.body.productID = findProduct._id


        // // // Create new review with user details

        let newReview = await reviewModel.create(req.body)

        // // // Experiment to push review id in product model ------------>

        updateProductWithReview.review.push(newReview._id)

        await updateProductWithReview.save()



        return res.status(201).send({ status: true, message: "Review created successfully", data: newReview })


    } catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }


}


async function deleteReview(req, res) {

    try {


        let reviewId = req.params.reviewId

        let userUID = req.body.userUID

        // console.log(req.body)


        if (!reviewId || !uuid.validate(reviewId)) {
            return res.status(400).send({ status: false, message: "Review ID is not given or invalid." })
        }

        if (!userUID || !uuid.validate(userUID)) {
            return res.status(400).send({ status: false, message: "User ID is not given or invalid." })
        }



        const findReview = await reviewModel.findOne({ id: reviewId })

        // console.log(findReview)


        if (!findReview) {
            return res.status(400).send({ status: false, message: "No review found with this review id." })
        }


        if (findReview.isDeleted) {
            return res.status(400).send({ status: false, message: "Review is already deleted." })
        }


        let reviewStars = findReview.stars
        let productId = findReview.productID



        // // // Now reduce stars in product data ---->
        await productModel.findByIdAndUpdate(
            productId,
            { $inc: { "rating.totalPerson": -1, "rating.avgRating": -reviewStars } },
            // {$set : { "rating" :  {$inc : {"totalPerson" : -1} , $inc : {"avgRating" : -reviewStars} } } } ,
            // {$set : { $inc : {"rating.totalPerson" : -1} , $inc : {"rating.avgRating" : -reviewStars} } } ,
            // {$set : { rating : {$inc : {"totalPerson" : -1} , $inc : {"avgRating" : -reviewStars} } }} ,
            // {$set : { "rating.totalPerson" : 4 , "rating.avgRating" : 16 }} ,
            { new: true }
        )


        // console.log(productReduce)


        let userUidInReviw = findReview.userData.userUID


        // // // Authenticate user now ----->

        let userUidInToken = req.tokenUserData.userUID

        // console.log(userUidInReviw === userUidInToken)

        if (userUidInReviw !== userUidInToken) {
            return res.status(403).send({ status: false, message: "Review is not created by you, LogIn again. | 403" })
        }

        findReview.isDeleted = true

        await findReview.save()

        // console.log(findReview)

        res.status(200).send({ status: true, message: "Review deleted sucessfull."})

    } catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }




}


module.exports = { createNewReview, deleteReview }
