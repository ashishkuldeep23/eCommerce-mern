const bcrypt = require("bcrypt")
const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const { transport, sendMailWithNodemailerFormate, makeHtmlMailForVerifyEmail } = require("../../lib/nodemailer")
const { uploadImageOnCloudinary } = require("../../lib/cloudinary")


//------------------------*** Improtant Regex ***----------------//
// const validateName = (/^[a-zA-Z ]+([\s][a-zA-Z ]+)*$/);
const validateName = (/[a-zA-Z][a-zA-Z0-9-_ .]{3,25}/)
const validateEmail = (/^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/);
const validatePassword = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
// const validatePhone = (/^(\+\d{1,3}[- ]?)?\d{10}$/)
const pinCodeRegex = (/^\d{4}$|^\d{6}$/)



async function creteUserControllor(req, res) {

    try {

        // console.log(process.env.CLOUDINARY_CLOUD_NAME)
        // console.log(process.env.CLOUDINARY_API_KEY)
        // console.log(process.env.CLOUDINARY_API_SECRET)

        // console.log(req.body)


        // let body = JSON.parse(req.body)

        let { firstName, lastName, email, password, address } = req.body

        // console.log(req.body)


        // // // Validation here ------>

        if (Object.keys(req.body).length <= 0) return res.status(400).send({ status: false, message: "Body can't be empty." })

        if (!firstName || !lastName || !email || !password) return res.status(400).send({ status: false, message: "Imp field missing." })


        if (!validateName.test(firstName)) return res.status(400).send({ status: false, message: `${firstName} : This First Name is invalid` })

        if (!validateName.test(lastName)) return res.status(400).send({ status: false, message: `${lastName} : This Last Name is invalid` })


        if (!validateEmail.test(email)) {
            return res.status(400).send({ status: false, message: `${email} : This email is invalid` })
        }

        if (!validatePassword.test(password)) {
            return res.status(400).send({ status: false, message: `${password} : This password is invalid` })
        }



        if (address) {
            let { pincode, street, city, country } = address

            if (street && !validateName.test(street)) return res.status(400).send({ status: false, message: "Street name should be string only." });
            if (city && !validateName.test(city)) return res.status(400).send({ status: false, message: "City name should be string only." });
            if (country && !validateName.test(country)) return res.status(400).send({ status: false, message: "City name should be string only." });
            if (pincode && !pinCodeRegex.test(pincode)) return res.status(400).send({ status: false, message: "Given Pincode is invalid , ex-->123456 , in 4 to 6 digit" });
        }



        // // // Check already present with this email or not ---->

        let findByEmailForUnique = await userModel.findOne({ email: email })

        if (findByEmailForUnique) return res.status(400).send({ status: false, message: "Email is already present in Data-base" });


        // // // Set opt here ------->


        // // // Now here (create some tokens like :- 1st : verifyEmailToken , 2nd is resetPasswordToken , and save these tokens in User DB ) ----->

        const verifyMailToken = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, { expiresIn: '10d' });

        const resetPassToken = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY);


        // console.log(verifyMailToken , resetPassToken)



        // // // // Upload File -------->

        // const file = req.files;

        // console.log(file)


        let pathUrl = "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1700368567/ej31ylpxtamndu3trqtk.png"

        if (req.files.length > 0) {

            let filePathIs = req.files[0].path

            // let result = await cloudinary.uploader.upload(filePathIs)

            let result = await uploadImageOnCloudinary(filePathIs, "users_Imgs_Ecom")

            // console.log(result)
            pathUrl = result.url

        }



        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)


        // console.log(hashPassword)


        // // // Yaha pr spread pahle krege.(Agar bad me kr rhe hai to ye purana wala upadate ho jayega)


        const createNewUser = await userModel.create({
            ...req.body,
            resetPasswordToken: resetPassToken,
            verifyMailToken: verifyMailToken,
            password: hashPassword,
            profilePic: pathUrl,
            allImages: [pathUrl],

        })


        // console.log(createNewUser)


        let data = {
            id: createNewUser.id,
            name: `${createNewUser.firstName} ${createNewUser.lastName}`,
            firstName: createNewUser.firstName,
            lastName: createNewUser.lastName,
            email: createNewUser.email,
            profilePic: createNewUser.profilePic,
            role: createNewUser.email,
        }


        // // // Now send a mail to verify email (if user is verified then he/she will able to change their password. )


        let responceObject = { status: true, data: data, message: "New user created successful" }

        let mailOptions = sendMailWithNodemailerFormate(createNewUser.email, "Thank you for creating new account.", makeHtmlMailForVerifyEmail(`${process.env.BACKEND_URL}/verifyMail?token=${createNewUser.verifyMailToken}&email=${createNewUser.email}`))

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


        res.status(201).send(responceObject)

    } catch (err) {

        console.log(err.message)
        res.status(500).send({ status: false, message: "Server Error" })
    }
}


async function logInControllor(req, res) {
    try {
        console.log("New user login")

        // console.log(req.cookies)

        res.cookie("token", req.user.token,
            {
                expires: new Date(Date.now() + 36000000),
                // httpOnly : true,
                // signed: true,
            }
        )

        res.status(200).send({ status: true, data: req.user, message: `Login Successfull` })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: `Error by server (${err.message})` })
    }

}


function logOutControl(req, res) {


    res
        .status(200)
        .cookie('token', null, {
            expires: new Date(Date.now()),
            // httpOnly: true,
        })
        .send({ status: true, message: "SingOut Done ✅" })

}


// // // This is an auth protected route And Get request --->
async function getUserData(req, res) {

    // console.log(req.tokenUserData)

    const id = req.tokenUserData.userId
    let findUser = await userModel.findById(id).populate({ path: "orders", select: "-_id -createdAt -updatedAt -__v", sort: "1" })

    // console.log(findUser)

    if (!findUser) {
        return res.status(400).send({ status: false, message: 'No data found by userID in token check code agian.' })
    }

    // // // Hold user order
    let userOrders = []


    if (findUser.orders && findUser.orders.length > 0) {
        userOrders = findUser.orders.reverse()
    }

    let sendUserData = {
        // name: `${findUser.firstName} ${findUser.lastName}`,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        address: findUser.address,
        email: findUser.email,
        profilePic: findUser.profilePic,
        role: findUser.role,
        id: findUser.id,
        allImages: findUser.allImages || [],
        orders: userOrders || []
    }


    res.status(200).send({ status: true, data: sendUserData, message: "User Fetch successful" })
}


// // // Upadte user logic here ------>
// // // User can upadte these feilds are :- address (add new) , upadte name , upadte profile pic --->
// // // whatUpadte key is important ---> Based on it's value i'll update values---->
// // // Only name is not done --->


async function updateUser(req, res) {

    try {

        // console.log(req.body)
        // console.log(req.files)

        const { whatUpadte, ...resBody } = req.body;

        if (!whatUpadte) {
            return res.status(400).send({ status: false, message: "What upadte not given check Api Controller" })
        }


        // // // Some feature will use user when he/she is verified with mail ---->

        const isEmailVerified = req.isEmailVerified

        const proUserFeatures = ["updateUserName", "userImg", 'makeProfilePic']

        if (!isEmailVerified && proUserFeatures.includes(whatUpadte)) {
            return res.status(400).send({ status: false, message: " Email not Verified. You are not able to use this feature, Because your mail is not verified. First verify your mail id." })
        }


        const id = req.tokenUserData.userId
        // let findUser = await userModel.findById(id)

        let upadtedUser;

        if (whatUpadte === "address") {

            upadtedUser = await userModel.findByIdAndUpdate(
                id,
                { $push: { address: resBody } },
                { new: true }
            )

        }
        else if (whatUpadte === "deleteAddress") {

            let findUserData = await userModel.findById(id)

            const addressId = resBody.addressId

            // // // FindIndex with addressID --->
            let index = findUserData.address.findIndex(address => address.id === addressId)

            // console.log(index)

            // // // Delete address here --->
            findUserData.address.splice(index, 1)

            // // // Now save the updated data -->
            await findUserData.save()

            // console.log(findUserData)

            upadtedUser = findUserData

        }
        else if (whatUpadte === "upadteAddress") {

            let findUserData = await userModel.findById(id)

            const { addressId, ...resOfResBody } = resBody
            // console.log(resOfResBody)

            let index = findUserData.address.findIndex(address => address.id === addressId)

            findUserData.address.splice(index, 1, resOfResBody)


            // // // Now save the updated data -->
            await findUserData.save()

            // console.log(findUserData)

            upadtedUser = findUserData

        }
        else if (whatUpadte === "userImg") {

            // console.log(req.body)
            // console.log(req.files)

            // // // User will able to send only image ---->


            let pathUrl = "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1700368567/ej31ylpxtamndu3trqtk.png"

            if (req.files.length > 0) {

                let filePathIs = req.files[0].path

                // let result = await cloudinary.uploader.upload(filePathIs)
                let result = await uploadImageOnCloudinary(filePathIs, "users_Imgs_Ecom")

                // console.log(" log from user controller ",result)

                pathUrl = result.url

            }


            let findUserData = await userModel.findByIdAndUpdate(
                id,
                {
                    $set: { profilePic: pathUrl },
                    $push: { allImages: pathUrl }
                },
                { new: true, upsert: true }
            )



            // console.log(findUserData)

            upadtedUser = findUserData

        }
        else if (whatUpadte === 'makeProfilePic') {

            const { pathUrl } = resBody

            let findUserData = await userModel.findByIdAndUpdate(
                id,
                {
                    $set: { profilePic: pathUrl },
                },
                { new: true, upsert: true }
            )

            // console.log(findUserData)

            upadtedUser = findUserData

        }
        else if (whatUpadte === "updateUserName") {
            const { firstName, lastName } = resBody

            let findUserData = await userModel.findByIdAndUpdate(
                id,
                {

                    $set: { firstName: firstName, lastName: lastName },
                },
                { new: true, upsert: true }
            )


            upadtedUser = findUserData


        }


        // console.log(upadtedUser)

        res.status(200).send({ status: true, message: `${whatUpadte} of ${upadtedUser.firstName} gets Update`, data: upadtedUser })

    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: `Error by server (${err.message})` })
    }

}


// // // verifyMailController  -------> 
async function verifyMailController(req, res) {

    try {

        // console.log(req.query)

        const { token, email } = req.query

        if (!token || !email) return res.status(400).send({ status: false, message: "Email and token not given in Query." })

        // // Verify token here ---->
        let verifyToken;

        try {
            verifyToken = await jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)
            // console.log(verifyToken)
        } catch (err) {

            if (err.message === "jwt expired") {
                return res.status(403).send({ status: false, message: `${err.message}` })
            }

            return res.status(403).send({ status: false, message: `Go to profile and verify your mail again | ${err.message}` })
        }


        let findUser = await userModel.findOne({ email: email, verifyMailToken: token })

        if (!findUser) {
            return res.status(400).send({ status: false, message: "No such user found with this Mail id" })
        }

        // res.send("bye bye")

        findUser.isEmailVerified = true
        findUser.verifyMailToken = "null"

        await findUser.save()

        // res.send(`${process.env.FRONTEND_URL}`)
        // //  If everyThing is good send user to front-end

        res.redirect(`${process.env.FRONTEND_URL}`)

    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: `Error by server (${err.message})` })
    }

}


async function checkUserPesentWithMail(email) {


    try {

        if (!email) return false

        if (!validateEmail.test(email)) return false

        // console.log("reached")

        let checkingUser = await userModel.findOne({ email: email }).select("-_id -password -verifyMailToken -resetPasswordToken -__v -createdAt -updatedAt")

        // console.log(checkingUser)

        if (!checkingUser) return false
        else return checkingUser

    } catch (err) {
        console.log(err.message)
        return { status: false, message: `Error by server (${err.message})` }
    }


}

// // // Make a request for forget pass and send email to user --->
async function forgotReqHandler(req, res) {

    try {

        // console.log(req.body)

        const { email } = req.body

        if (!email) return res.status(400).send({ status: false, message: "Please provide email of user." })


        let userFoundWithMail = await checkUserPesentWithMail(email)

        // console.log(userFoundWithMail)

        if (!userFoundWithMail) return res.status(404).send({ status: false, message: "No user found with this mail-id" })


        const resetPassToken = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, { expiresIn: '1H' });

        // console.log(resetPassToken)


        await userModel.findOneAndUpdate(
            { email: userFoundWithMail.email },
            { $set: { resetPasswordToken: resetPassToken } },
            { new: true, upsert: true }

        )


        //  console.log(resetToeknInUserData)

        // console.log("send mail now --->")


        // let findAtInEmail = email.indexOf("@")
        // let emailUserId = email.slice(0, findAtInEmail)
        // let emailDomain = email.slice(findAtInEmail + 1)


        // let url = `${process.env.FRONTEND_URL}/forgot-pass-main/${resetPassToken}/${emailDomain}/${emailUserId}`

        let url = `${process.env.FRONTEND_URL}/forgot-pass-main/${email}/${resetPassToken}`

        let html = ` <p><a href='${url}'>Click here</a> to forgot password. OR URL :- ${url} incase btn is not working.</p>`


        let mailOptions = sendMailWithNodemailerFormate(
            email,
            "Forgot password, click on given link please.",
            html
        )

        await transport.sendMail(mailOptions, function (err, info) {

            if (err) {
                console.log(err)
                return res.status(400).send({ status: false, message: `${JSON.stringify(err)} AND reachout to developer.` })
            } else {
                console.log(info.response)
                // return res.status(200).send({ status: true, message: 'Message sent successfully , Thankyou for sending email , Admin will respond you soon.' })

                // responceObject.message = `${responceObject.message} AND  email sent successfully.`
            }

        })


        res.status(200).send({ status: true, message: "Mail sended sucessfull, check you mail inbox now." })

    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: `Error by server (${err.message})` })
    }

}


async function forgotMainHandler(req, res) {

    try {

        const { email, token, password } = req.body

        if (!email || !token || !password) return res.status(400).send({ status: false, message: "Imp. feilds not given." })


        // // Verify token here ---->
        let verifyToken;

        try {
            verifyToken = await jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)
            // console.log(verifyToken)
        } catch (err) {

            if (err.message === "jwt expired") {
                return res.status(403).send({ status: false, message: `Your token is expired now, generate forget token again.` })
            }

            return res.status(403).send({ status: false, message: `Invalid token check your mail agian | ${err.message}` })
        }



        let getUser = await userModel.findOne({ email: email, resetPasswordToken: token })

        if (!getUser) return res.status(404).send({ status: false, message: "User not found, check your mail box or again generate forget token again." })


        // // Now compare new pass with old pass

        let passCompare = await bcrypt.compare(password, getUser.password)

        // console.log(passCompare)
        if (passCompare) {
            return res.status(400).send({ status: false, message: "Give different password please.(given new password found same as old password)" })
        }


        // // // Now save new pass here ------>

        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(password, salt)


        getUser.password = hashPassword
        getUser.resetPasswordToken = "null"

        await getUser.save()


        res.status(200).send({ status: true, message: "New password saved successfull.", data: getUser.email })

        // console.log("done -------->")

    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: `Error by server (${err.message})` })
    }

}


async function userWithEmail(req, res) {

    const email = req.params.email

    if (!email) return res.status(400).send({ status: false, message: "Give email with request please. Or Given email is not correct." })

    let checkUser = await checkUserPesentWithMail(email)

    if (!checkUser) return res.status(400).send({ status: false, message: "Not user found with given email." })

    return res.status(200).send({ status: true, message: "Data found with given email." })

}



async function bugReportHandler(req, res) {

    try {

        // console.log(req.body)

        const { email, bugComment } = req.body

        if (!email || !bugComment) return res.status(400).send({ status: false, message: "Imp. feilds not given." })

        if (!validateEmail.test(email)) return res.status(400).send({ status: false, message: "Email in not valid." })


        // // // Here i need to send two mails 1. for user who report from me , 2. me to me with bug


        // 1st to user with bug report details and thank you ----->

        let html = ` <p>${bugComment}</p>`


        let mailOptions = sendMailWithNodemailerFormate(
            email,
            "Thank you for reporting new bug.",
            html
        )

        await transport.sendMail(mailOptions, function (err, info) {

            if (err) {
                console.log(err)
                return res.status(400).send({ status: false, message: `${JSON.stringify(err)} AND reachout to developer.` })
            } else {
                console.log(info.response)
                // return res.status(200).send({ status: true, message: 'Message sent successfully , Thankyou for sending email , Admin will respond you soon.' })

                // responceObject.message = `${responceObject.message} AND  email sent successfully.`
            }

        })


        // // // 2nd : now send bug to developer ---->

        let htmlToDev = ` <p>${bugComment}</p>`


        let mailOptionsToDev = sendMailWithNodemailerFormate(
            process.env.ADMIN_EMAIL,
            "New bug reported.(Read comment :- )",
            htmlToDev
        )

        await transport.sendMail(mailOptionsToDev, function (err, info) {

            if (err) {
                console.log(err)
                return res.status(400).send({ status: false, message: `${JSON.stringify(err)} AND reachout to developer.` })
            } else {
                console.log(info.response)
                // return res.status(200).send({ status: true, message: 'Message sent successfully , Thankyou for sending email , Admin will respond you soon.' })

                // responceObject.message = `${responceObject.message} AND  email sent successfully.`
            }

        })


        res.status(200).send({ status: true, message: "Mail sended sucessfull, check you mail inbox now." })




    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: `Error by server (${err.message})` })
    }

}



function userDataByTokenHandler(req, res) {

    try {

        let userData = req.tokenUserData

        res.status(200).send({ status: true, data: userData })

    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: `Error by server (${err.message})` })
    }
}



module.exports = { creteUserControllor, logInControllor, logOutControl, getUserData, updateUser, verifyMailController, forgotReqHandler, forgotMainHandler, userWithEmail, bugReportHandler, userDataByTokenHandler }
