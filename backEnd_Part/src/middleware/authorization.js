
const jwt = require('jsonwebtoken')
const userModel = require("../model/userModel")

exports.isAuthorized = async function (req, res, next) {


    try {

        let token;


        if (!req && !req.headers && !req.headers["token"] && req.headers['token'] === "null") {
            return res.status(401).send({ status: false, message: "Please SingIn again, Something went wroung with your request." })
        }


        token = req.headers["token"]
        // console.log(token)

        let verifyToken;

        try {
            verifyToken = await jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)

            // console.log(verifyToken)
        } catch (err) {
            console.log(err.message)

            if (err.message === "jwt must be provided") {
                return res.status(403).send({ status: false, message: ` Login Please with valid email and password | ${err.message}` })
            }

            return res.status(403).send({ status: false, message: ` Login Please with valid email and password | ${err.message}` })
        }


        if (Object.keys(verifyToken).length > 0) {

            let userId = verifyToken.id

            let findUser = await userModel.findOne({ id: userId })

            if (!findUser) {
                return res.status(401).send({ status: false, message: "Data in token is bad or inomplete)" })
            }


            // // Set user data in req -------->
            
            req.tokenUserData = {userId : findUser._id , userName : findUser.firstName , userImg : findUser.profilePic   }


            // // // Now here you can call then next route ------>
            next()
        } else {
            return res.status(401).send({ status: false, message: "Payload is empty , LogIn again" })
        }


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}

