const express = require('express');
const router = express.Router();
const upload = require("../../lib/multer")

const passport = require('passport');


// // // Import controles -->

const { createNewProduct, findAllProducts, getCategoryAndHighlight, findOneProduct , dislikeProduct , likeProduct , searchProductByKeyowrd } = require("../controller/productControllor")
const { createNewReview, deleteReview, updateReview, likeReview, dislikeReview } = require("../controller/reviewController")
const { creteUserControllor, logInControllor, logOutControl, getUserData, updateUser , verifyMailController , forgotReqHandler ,forgotMainHandler } = require("../controller/userControllor")


const { createNewOrder, updateOrder } = require("../controller/orderControllor")


const { isAuthorized } = require("../middleware/authorization")



// // // Checking ejs only ---->


router.get("/check", (req, res) => {

  res.render("check", { check: "Ashish" })

  // res.send("fdfdsf")
});


/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: "Backend part of E-commerce  app by Ashish" });
});



// // // Product API
router.post("/createProduct", isAuthorized, createNewProduct)

router.get("/findAllProducts", isAuthorized, findAllProducts)

router.get("/getCategoryAndHighlight", isAuthorized, getCategoryAndHighlight)

router.get("/findOneProduct/:productId", isAuthorized, findOneProduct)

router.post("/likeProduct" , isAuthorized , likeProduct )

router.post("/dislikeProduct" , isAuthorized , dislikeProduct)

router.get("/searchProduct" , searchProductByKeyowrd)



// // // Review API 
router.post("/createReview", isAuthorized, createNewReview)

router.delete("/deleteReview/:reviewId", isAuthorized, deleteReview)

router.put("/updateReview", isAuthorized, updateReview)

router.post('/likeReview', isAuthorized, likeReview)

router.post('/dislikeReview', isAuthorized, dislikeReview)



// // // user API (SingUp , SinIn , SingOut)
router.post("/createUser", upload.array("file"), creteUserControllor)

router.post("/userLogin", passport.authenticate("local"), logInControllor)

router.get("/userLoginGoogle", passport.authenticate("google", { scope: ['profile'] }))

router.get("/getUserData", isAuthorized, getUserData)

router.get("/userSingout", isAuthorized, logOutControl)

router.post("/updateUser", isAuthorized, upload.array("file"), updateUser)

router.get("/verifyMail" , verifyMailController)

router.post("/forgot-req" , forgotReqHandler)

router.post("/forgot-main" , forgotMainHandler)


// router.get("/resetPasswordPage" , ( req , res)=>{

//   res.sendFile( process.cwd() + "/public/resetPass.html")

// })


router.get("/auth/google/callback", passport.authenticate("google", {
  // successRedirect: `${process.env.FRONTEND_URL}`,
  // successRedirect: `/login/success`,
  failureRedirect: "/login/failed"
}), (req, res) => {

  console.log("Success just for checking")

  if (req.user) {

    res.cookie("token", req.user.token,
      {
        expires: new Date(Date.now() + 36000000),
        path: "/",

      }
    )

    // res.status(200).send({ status: true, message: "LogIn Successfull", data: req.user })

    // res.redirect(`${process.env.FRONTEND_URL}`)

    res.render("googleAuth", { check: `${req.user.token}` })

  }
  else {
    res.status(200).send({ status: false, message: "No user found." })
  }


})


router.get("/login/failed", (req, res) => {
  // console.log(req.user)
  console.log("Failed")

  res.status(401).send({ status: false, message: "LogIn Failed" })
})


router.get("/login/success", (req, res) => {
  // console.log(req.user)

  console.log("Success just for checking")

  if (req.user) {

    res.cookie("token", req.user.token,
      {
        expires: new Date(Date.now() + 36000000),
        // httpOnly : true,
        // signed: true,
      }
    )

    // res.status(200).send({ status: true, message: "LogIn Successfull", data: req.user })


    // res.redirect(`${process.env.FRONTEND_URL}`)


    
    res.render("googleAuth", { check: `${req.user.token}` })


  }
  else {
    res.status(200).send({ status: false, message: "No user found." })
  }



})



// // // Order Api --------->

router.post("/createOrder", isAuthorized, createNewOrder)

router.put("/updateOrder", isAuthorized, updateOrder)



module.exports = router;
