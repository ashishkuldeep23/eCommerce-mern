
const orderModel = require("../model/orderModel")


// // create new order 
// // Reduce stocks in profuct section --

async function createNewOrder(req , res){

    try{

        console.log(req.body)

        let createOrder = await orderModel.create(req.body)

        res.status(200).send({status : true , message : "Your Order Placed" , data : createOrder})


    }catch(err){
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }

}




module.exports = {createNewOrder }

