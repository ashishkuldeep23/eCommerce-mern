
const jwt = require('jsonwebtoken')
const userModel = require("../model/userModel")

exports.isAuthorized = async function (req, res, next) {


    try {


        let token = null;

        if (req && req.cookies) {
            token = req.cookies["token"]
            // console.log(token)
        } else {
            return res.status(401).send({ status: false, message: "Something went wroung with your request." })
        }


        let verifyToken;


        try {
            verifyToken = await jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)

            // console.log(verifyToken)
        } catch (err) {
            // console.log(err.message)

            if (err.message === "jwt must be provided") {
                return res.status(403).send({ status: false, message: ` Login Please with valid email and password | ${err.message}` })
            }

            return res.status(403).send({ status: false, message: err.message })
        }




        if (Object.keys(verifyToken).length > 0) {

            // console.log(verifyToken)

            let userId = verifyToken.id

            let findUser = await userModel.findOne({ id: userId })

            if (!findUser) {
                return res.status(401).send({ status: false, message: "Data in token is bad or inomplete)" })
            }

            // // // Now here you can call then next route ------>
            next()
        } else {
            return res.status(401).send({ status: false, message: "Payload is empty , LogIn again" })
        }





    } catch (err) {

        return res.status(500).send({ status: false, message: err.message })
    }

    // res.status(400).send({status : false , message : "LogIn Required , LogIn First"})
    // console.log("OKOK")
    // next()
}
