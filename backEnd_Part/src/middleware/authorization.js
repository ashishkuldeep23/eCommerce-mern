
const jwt = require('jsonwebtoken')
const userModel = require("../model/userModel")

exports.isAuthorized = async function (req, res, next) {


    try {


        // console.log({ Cookie: req.cookies })
        // console.log({ Headers: req.headers })
        // console.log(req)


        let token;


        // if (!req && !req.headers && !req.headers["token"] && req.headers['token'] === "null") {
        //     return res.status(401).send({ status: false, message: "Please SingIn again, Something went wroung with your request." })
        // }


        // token = req.headers["token"]



        if (req && req.headers && req.headers["token"]) {
            token = req.headers["token"]
        } else if (req && req.cookies && req.cookies["token"]) {
            token = req.cookies["token"]
        } else {
            return res.status(401).send({ status: false, message: "Please SingIn again, Something went wroung with your request.No token found." })
        }


        // console.log(token)


        let verifyToken;

        try {
            verifyToken = await jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)

            // console.log(verifyToken)
        } catch (err) {
            // console.log(err.message)

            if (err.message === "jwt must be provided") {
                return res.status(403).send({ status: false, message: `${err.message} | Login again please with valid email and password.` })
            }

            if (err.message === "jwt expired") {
                return res.status(403).send({ status: false, message: `${err.message} | Login again please with valid email and password.` })
            }

            return res.status(403).send({ status: false, message: `${err.message} | Login again please with valid email and password.` })
        }

        // console.log(verifyToken)


        if (Object.keys(verifyToken).length > 0) {

            let userId = verifyToken.id

            let findUser = await userModel.findOne({ id: userId })

            if (!findUser) {
                return res.status(401).send({ status: false, message: "Data in token is bad or inomplete)" })
            }


            // console.log(findUser)


            // // Set user data in req -------->

            req.tokenUserData = { token : token , id: findUser._id,  firstName : findUser.firstName , lastName : findUser.lastName , profilePic: findUser.profilePic , email : findUser.email , role : findUser.role , userId : findUser._id}


            // // // Now here you can call then next route ------>
            next()
        } else {
            return res.status(401).send({ status: false, message: "Payload is empty , LogIn again" })
        }


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}

