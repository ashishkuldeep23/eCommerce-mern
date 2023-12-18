
const uuid = require("uuid")
const orderModel = require("../model/orderModel")
const userModel = require("../model/userModel")
const productModel = require("../model/productModel")

const { transport, sendMailWithNodemailerFormate, makeHtmlForOrders } = require("../../lib/nodemailer")

// // create new order 
// // Reduce stocks in profuct section --
// // // 3 things we should do :- 1st) validation , 2nd) Reduce Stocks , 3rd) add orderID in user data.

async function createNewOrder(req, res) {

    try {

        // console.log(req.body)

        const { fullName, phone, address, paymentMethod, whenCreated, totalPrice, totalItems, cartData, userId } = req.body


        let allRequiredField = fullName && phone && address && paymentMethod && whenCreated && totalPrice && totalItems && cartData && userId


        // // //  Validation --->
        if (!allRequiredField) {
            // console.log(allRequiredField)
            return res.status(400).send({ status: false, message: `Mandatory feild is not given. | ${allRequiredField}` })
        }


        // // // Add more validation if needed ---->


        // // // Reduce stocks --->


        if (!cartData || cartData.length === 0) {
            return res.status(400).send({ status: false, message: `Card data not provided` })
        }


        // // // Get user here (This user data i'll use below to save order data) ------> 
        let userData = await userModel.findOne({ id: userId })


        // // // TODO :- here you can do if user is enable emailing then only send email (create on feild and check that feild (and also i have an unscribe APi for user.)

        // // // Now sending mail is placed above from calling DB -->
        // // // This is how responce object look like (That i'm going to send on successfull request)--->
        let responceObject = { status: true, message: "Your Order Placed.", data: [] }

        // // // Now send a mail to use for succesfull ordring items ---->

        let mailOptions = sendMailWithNodemailerFormate(userData.email, "Thank you for shopping with us. Check your order details.", makeHtmlForOrders(req.body , "unsubcribe_URL"))

        await transport.sendMail(mailOptions, function (err, info) {

            if (err) {
                console.log(err)
                return res.status(400).send({ status: false, message: `${JSON.stringify(err)} AND reachout to developer.` })
            } else {
                console.log(info.response)
                // return res.status(200).send({ status: true, message: 'Message sent successfully , Thankyou for sending email , Admin will respond you soon.' })

                responceObject.message = `${responceObject.message} AND  email sent successfully.`
            }

        })


        // console.log(cartData)

        // // // Here reducing stocks from actual data we have ---->
        // // // Do this for every card items --->
        cartData.map(async (data, i) => {

            // // // Find Actual item --->
            let findActualProduct = await productModel.findOne({ id: data.id })
            // console.log(findActualProduct)

            // // // Check type is arr or not --->
            if (findActualProduct.type.length > 0) {

                // // // This arr will hold new type arr --->
                let newTypeArr = []


                findActualProduct.type.map(async (type, i) => {


                    if (type.typeId === data.type.typeId) {

                        // console.log("In Loop" , i)
                        // console.log(type)
                        // console.log(type.typeStock , "-" , data.quantity)

                        let reduceStock = type.typeStock - data.quantity

                        // // // Make type obj, do't do spread (That will give err)
                        type = { typeName: type.typeName, typeVerity: type.typeVerity, typeId: type.typeId, typeStock: reduceStock, typePrice: data.type.typePrice }
                    }



                    newTypeArr.push(type)

                })


                // console.log(newTypeArr)


                findActualProduct.type = newTypeArr

                await findActualProduct.save()
            }

        })


        let createOrder = await orderModel.create(req.body)

        // // // Here saving order data inside user data --->
        userData.orders.push(createOrder._id)
        await userData.save()


        // // // Now add actaual data inside responce obj -->
        responceObject.data = createOrder

        res.status(200).send(responceObject)

    } catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }

}



// // // Upadte Order data 
// // // Like : Status of order, 

// // // This fn is used to update order only (like recioved and delete order only ---> )
async function updateOrder(req, res) {

    try {

        const { whatUpdate, orderId } = req.body

        if (!whatUpdate) return res.status(400).send({ status: false, message: "Metion what you want to update." })

        if (!orderId || !uuid.validate(orderId)) return res.status(400).send({ status: false, message: "OrderId is not given or invalid orderId." })

        // console.log(whatUpdate , orderId)

        const findOrder = await orderModel.findOne({ id: orderId })

        if (!findOrder) return res.status(400).send({ status: false, message: "No order data found with given ID." })

        // console.log(findOrder)


        if (whatUpdate === "status") {
            findOrder.status = "Received"
            await findOrder.save()
        }

        res.status(200).send({ status: true, message: "Order updated" })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }

}



module.exports = { createNewOrder, updateOrder }

