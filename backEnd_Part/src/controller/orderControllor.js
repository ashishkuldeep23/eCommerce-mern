
const orderModel = require("../model/orderModel")
const userModel = require("../model/userModel")
const productModel = require("../model/productModel")


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

        // console.log(cartData)

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



        // return



        let createOrder = await orderModel.create(req.body)


        // // // now add new order in userdata ---->
        let addOrderInUserData = await userModel.findOne({ id: userId })

        addOrderInUserData.orders.push(createOrder._id)
        await addOrderInUserData.save()


        // console.log(addOrderInUserData)

        res.status(200).send({ status: true, message: "Your Order Placed", data: createOrder })


    } catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }

}




module.exports = { createNewOrder }

