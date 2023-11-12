const express = require('express');
const router = express.Router();
const upload = require("../../lib/multer")

const passport = require('passport');


// // // Import controles -->

const { createNewProduct, findAllProducts, getCategoryAndHighlight, findOneProduct } = require("../controller/productControllor")
const { createNewReview } = require("../controller/reviewController")
const { creteUserControllor , logInControllor , logOutControl} = require("../controller/userControllor")


const {isAuthorized} = require("../middleware/authorization")

/* GET home page. */
router.get('/', isAuthorized , function (req, res, next) {
  res.render('index', { title: "Backend part of E-commerce  app by Ashish" });
});



// // // Product API
router.post("/createProduct", isAuthorized ,  createNewProduct)

router.get("/findAllProducts", isAuthorized , findAllProducts)


router.get("/getCategoryAndHighlight", isAuthorized ,  getCategoryAndHighlight)


router.get("/findOneProduct/:productId", isAuthorized ,  findOneProduct)



// // // Review API 
router.post("/createReview", isAuthorized , createNewReview)



// // // user API (SingUp , SinIn , SingOut)
router.post("/createUser", upload.array("file"), creteUserControllor)

router.post("/userLogin", passport.authenticate("local") , logInControllor)

router.get("/userSingout" , logOutControl)




module.exports = router;
