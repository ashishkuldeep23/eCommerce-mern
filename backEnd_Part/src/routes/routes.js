const express = require('express');
const router = express.Router();
const upload = require("../../lib/multer")

const passport = require('passport');


// // // Import controles -->

const { findAllProducts, getCategoryAndHighlight, findOneProduct, dislikeProduct, likeProduct, searchProductByKeyowrd } = require("../controller/productControllor")

const { createNewReview, deleteReview, updateReview, likeReview, dislikeReview } = require("../controller/reviewController")

const { creteUserControllor, logInControllor, logOutControl, getUserData, updateUser, verifyMailController, forgotReqHandler, forgotMainHandler, userWithEmail, bugReportHandler, userDataByTokenHandler } = require("../controller/userControllor")

const { createNewOrder, updateOrder } = require("../controller/orderControllor")

const { createNewProduct , getAllProductsAdmin , updateProdct , getAllOrdersAdmin} = require("../controller/adminControllor")


const { isAuthorized , isUserAdmin } = require("../middleware/authorization")



// // // Checking ejs only ---->


router.get("/check", (req, res) => {

  res.render("check", { check: "Ashish" })

  // res.send("fdfdsf")
});


/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: "Backend part of E-commerce  app by Ashish" });
});





// // // Admin API's ----------->
router.post("/createProduct", isAuthorized , isUserAdmin , upload.array("file"), createNewProduct)

router.get("/getAllProductsAdmin" , isAuthorized , isUserAdmin , getAllProductsAdmin)

router.post("/updatePoduct" ,  isAuthorized , isUserAdmin , upload.array("file") , updateProdct)

router.get("/getAllOrdersAdmin" , isAuthorized , isUserAdmin , getAllOrdersAdmin)



/// // // General Api's
router.get("/findAllProducts", isAuthorized, findAllProducts)

router.get("/getCategoryAndHighlight", isAuthorized, getCategoryAndHighlight)

router.get("/findOneProduct/:productId", isAuthorized, findOneProduct)

router.get("/searchProduct", searchProductByKeyowrd)




router.post("/likeProduct", isAuthorized, likeProduct)

router.post("/dislikeProduct", isAuthorized, dislikeProduct)




// // // Review API 
router.post("/createReview", isAuthorized, createNewReview)

router.delete("/deleteReview/:reviewId", isAuthorized, deleteReview)

router.put("/updateReview", isAuthorized, updateReview)

router.post('/likeReview', isAuthorized, likeReview)

router.post('/dislikeReview', isAuthorized, dislikeReview)



// // // user API (SingUp , SinIn , SingOut)
router.post("/createUser", upload.array("file"), creteUserControllor)

router.post("/userLogin", passport.authenticate("local"), logInControllor)

router.get("/getUserData", isAuthorized, getUserData)

router.get("/userSingout", isAuthorized, logOutControl)

router.post("/updateUser", isAuthorized, upload.array("file"), updateUser)

router.get("/verifyMail", verifyMailController)

router.post("/forgot-req", forgotReqHandler)

router.post("/forgot-main", forgotMainHandler)

router.get("/checkUserWithEmail/:email", userWithEmail)

router.post("/bugReport", bugReportHandler)

// // // Below api used to get data with given token
router.get("/userDataByToken", isAuthorized, userDataByTokenHandler)




// // // Routes for login by Google ----->
// // // Scope should given which scope of data you want to get like :- email and profile --->
router.get("/userLoginGoogle", passport.authenticate("google", { scope: ['email', 'profile'] }))

router.get("/auth/google/callback", passport.authenticate("google", {
  // successRedirect: `${process.env.FRONTEND_URL}`,
  // successRedirect: `/login/success`,
  failureRedirect: "/login/failed"
}), (req, res) => {

  console.log("User logined by Google.")

  if (req.user) {

    // console.log(req.user)

    res.cookie("token", req.user.token,
      {
        expires: new Date(Date.now() + 36000000),
        path: "/",

      }
    )

    // res.status(200).send({ status: true, message: "LogIn Successfull", data: req.user })

    // res.redirect(`${process.env.FRONTEND_URL}`)

    // res.render("googleAuth", { check: `${req.user.token}` })

    /*
      // // // TODO :  1) ---> redirect to user on google auth page from frontend with token as path params 
      2) ---> Grave the token value in page and get user data with given token by useEffect and then if eveything is good then only show the home page of frontend.
      Hope everything will good and accordingly.
    */

    let url = `${process.env.FRONTEND_URL}/user-login/${req.user.token}/newuser`

    res.redirect(url)

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

  // // // Not useing other success url 
  // // // Working in same route (see the (/auth/google/callback) route ) -------->

  // console.log(req.user)

  // console.log("Success just for checking")

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



    // res.render("googleAuth", { check: `${req.user.token}` })

    /*
      // // // TODO :  1) ---> redirect to user on google auth page from frontend with token as path params 
      2) ---> Grave the token value in page and get user data with given token by useEffect and then if eveything is good then only show the home page of frontend.
      Hope everything will good and accordingly.
    */

    let url = `${process.env.FRONTEND_URL}/google-user/${req.user.token}/newuser`

    res.redirect(url)

  }
  else {
    res.status(200).send({ status: false, message: "No user found." })
  }



})



// // // Order Api --------->
router.post("/createOrder", isAuthorized, createNewOrder)

router.put("/updateOrder", isAuthorized, updateOrder)



module.exports = router;
