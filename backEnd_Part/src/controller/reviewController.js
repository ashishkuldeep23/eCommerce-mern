

const reviewModel = require("../model/reviewModel")

const productModel = require("../model/productModel")

const mongoose = require("mongoose")
const objectId = mongoose.Types.ObjectId


async function createNewReview(req , res){

    console.log(req.body)

    if(Object.keys(req.body).length <= 0){
        return res.status(400).send({status : false , message : "Body can't be Empty"})
    }

    // // // Some validation --->

    const {product} = req.body 

    // console.log(mongoose.isValidObjectId(product))

    if(!product  || !mongoose.isValidObjectId(product) ){
        return res.status(400).send({status : false , message : "Bad object id or Product objectId is not given."})
    }
 


    // // // Check any product is present with this objectID or not -->

    let findProduct = await productModel.findById(product)

    if(!findProduct){
        return res.status(400).send({status : false , message : "No product found with given object id."})
    }


    req.body.productName = findProduct.title

    let newReview = await reviewModel.create(req.body)

    

    return res.status(201).send({status : true , message : "Review created successfully" , data : newReview})

}


module.exports = {createNewReview}
