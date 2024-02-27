

const reviewModel = require("../model/reviewModel")
const productModel = require("../model/productModel")
const userModel = require("../model/userModel")
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


        // // // getting data to send frontend ---->

        // // // Find product with updated data and send to frontend --->

        let findUpdatedProduct = await productModel.findOne({ id: productID })
            .select('-updatedAt -createdAt -__v ')
            .populate({
                path: "review",
                match: { isDeleted: false },
                select: "-updatedAt -createdAt -__v  -userId -productID -isDeleted -_id",
                populate: {
                    path: 'userId',
                    select: "id firstName lastName profilePic -_id"
                }

            })


        // console.log(findUpdatedProduct)


        return res.status(201).send({ status: true, message: "Review created successfully", data: findUpdatedProduct.review })


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
            return res.status(404).send({ status: false, message: "No review found with this review id." })
        }


        if (findReview.isDeleted) {
            return res.status(404).send({ status: false, message: "Review is already deleted." })
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


        // console.log(req.tokenUserData)


        let userUidInReviw = findReview.userData.userUID

        // // // Authenticate user now ----->

        let userUidInToken = req.tokenUserData.userUID

        // console.log(userUidInReviw , userUidInToken)
        // console.log(userUidInReviw === userUidInToken)

        if (userUidInReviw !== userUidInToken) {
            return res.status(403).send({ status: false, message: "Review is not created by you, LogIn again. | 403" })
        }

        findReview.isDeleted = true

        await findReview.save()

        // console.log(findReview)



        // // // getting data to send frontend ---->

        // // // Find product with updated data and send to frontend --->

        let findUpdatedProduct = await productModel.findById(productId)
            .select('-updatedAt -createdAt -__v ')
            .populate({
                path: "review",
                match: { isDeleted: false },
                select: "-updatedAt -createdAt -__v  -userId -productID -isDeleted -_id",
                populate: {
                    path: 'userId',
                    select: "id firstName lastName profilePic -_id"
                }

            })


        // console.log(findUpdatedProduct)


        res.status(200).send({ status: true, message: "Review deleted sucessfull.", data: findUpdatedProduct.review })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }




}


async function updateReview(req, res) {

    try {


        if (Object.keys(req.body).length <= 0) {
            return res.status(400).send({ status: false, message: "Body can't be Empty" })
        }

        // console.log(req.body)

        const { reviewId, stars, comment } = req.body

        if (!reviewId || !uuid.validate(reviewId)) {
            return res.status(400).send({ status: false, message: "Bad object id or Product objectId is not given." })
        }

        let findReview = await reviewModel.findOne({ id: reviewId })

        if (!findReview) {
            return res.status(404).send({ status: false, message: "No Review found with given object id." })
        }

        if (findReview.isDeleted) {
            return res.status(404).send({ status: false, message: "Review is already deleted." })
        }

        // console.log(findReview)

        let previousStarts = findReview.stars

        findReview.comment = comment

        findReview.stars = stars

        let productIDInReview = findReview.productID

        // // // Authenticate user now ----->

        let userUidInReviw = findReview.userData.userUID

        let userUidInToken = req.tokenUserData.userUID

        // console.log(userUidInReviw === userUidInToken)

        if (userUidInReviw !== userUidInToken) {
            return res.status(403).send({ status: false, message: "Review is not created by you, LogIn again. | 403" })
        }

        let findProductAndUpadte = await productModel.findOne({ _id: productIDInReview, isDeleted: false })

        let starDiff = stars - previousStarts

        // console.log(findProductAndUpadte)

        // console.log(previousStarts , stars , starDiff)


        findProductAndUpadte.rating.avgRating = findProductAndUpadte.rating.avgRating + starDiff

        await findReview.save()

        await findProductAndUpadte.save()


        // // // getting data to send frontend ---->

        // // // Find product with updated data and send to frontend --->

        let findUpdatedProduct = await productModel.findById(productIDInReview)
            .select('-updatedAt -createdAt -__v ')
            .populate({
                path: "review",
                match: { isDeleted: false },
                select: "-updatedAt -createdAt -__v  -userId -productID -isDeleted -_id",
                populate: {
                    path: 'userId',
                    select: "id firstName lastName profilePic -_id"
                }

            })


        // console.log(findUpdatedProduct)



        res.status(200).send({ status: true, message: "Review updated." , data : findUpdatedProduct.review })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }



}


async function likeReview(req, res) {

    try {

        let { reviewId, isLiking, userId } = req.body

        // console.log(req.body)

        // // Validatintion ---->



        if (!reviewId || !uuid.validate(reviewId)) {
            return res.status(400).send({ status: false, message: "Bad object id or Product objectId is not given." })
        }

        let findReview = await reviewModel.findOne({ id: reviewId })
            .select("-updatedAt -createdAt -__v   -productID -isDeleted")
            .populate({
                path: "userId",
                select: "id firstName lastName profilePic -_id"
            })

        if (!findReview) {
            return res.status(404).send({ status: false, message: "No Review found with given object id." })
        }

        if (findReview.isDeleted) {
            return res.status(404).send({ status: false, message: "Review is already deleted." })
        }


        // // // InCreaseing ----->

        if (isLiking) {
            findReview.likes = findReview.likes + 1

            if (findReview.dislikedUserIds.includes(userId)) {


                let index = findReview.dislikedUserIds.findIndex((ids) => ids === userId)

                // console.log(index)

                findReview.dislikedUserIds.splice(index, 1)

                findReview.dislikes = findReview.dislikes - 1


            }


            if (!findReview.likedUserIds.includes(userId)) {
                findReview.likedUserIds.push(userId)
            }



        } else {
            findReview.likes = findReview.likes - 1

            if (findReview.likedUserIds.includes(userId)) {

                let index = findReview.likedUserIds.findIndex((ids) => ids === userId)

                // console.log(index)

                findReview.likedUserIds.splice(index, 1)
            }
        }



        await findReview.save()

        res.status(200).send({ status: true, message: "Like Done", data: findReview })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }


}


async function dislikeReview(req, res) {
    try {

        let { reviewId, isDisliking, userId } = req.body

        // console.log(req.body)

        // // Validatintion ---->

        if (!reviewId || !uuid.validate(reviewId)) {
            return res.status(400).send({ status: false, message: "Bad object id or Product objectId is not given." })
        }

        let findReview = await reviewModel.findOne({ id: reviewId })
            .select("-updatedAt -createdAt -__v   -productID -isDeleted")
            .populate({
                path: "userId",
                select: "id firstName lastName profilePic -_id"
            })


        if (!findReview) {
            return res.status(404).send({ status: false, message: "No Review found with given object id." })
        }

        if (findReview.isDeleted) {
            return res.status(404).send({ status: false, message: "Review is already deleted." })
        }


        // // // InCreaseing ----->

        if (isDisliking) {
            findReview.dislikes = findReview.dislikes + 1



            if (findReview.likedUserIds.includes(userId)) {

                let index = findReview.likedUserIds.findIndex((ids) => ids === userId)

                // console.log(index)

                findReview.likedUserIds.splice(index, 1)

                findReview.likes = findReview.likes - 1
            }




            if (!findReview.dislikedUserIds.includes(userId)) {

                findReview.dislikedUserIds.push(userId)
            }





        } else {
            findReview.dislikes = findReview.dislikes - 1

            if (findReview.dislikedUserIds.includes(userId)) {

                let index = findReview.dislikedUserIds.findIndex((ids) => ids === userId)

                // console.log(index)

                findReview.dislikedUserIds.splice(index, 1)
            }
        }



        await findReview.save()

        res.status(200).send({ status: true, message: "Dislike Done", data: findReview })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }

}



module.exports = { createNewReview, deleteReview, updateReview, likeReview, dislikeReview }
