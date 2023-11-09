const express = require('express');
const router = express.Router();

const upload = require("../../lib/multer")



// // // Import controles -->

const { createNewProduct , findAllProducts , getCategoryAndHighlight , findOneProduct} = require("../controller/productControllor")
const { createNewReview } = require("../controller/reviewController")
const {creteUserControllor} = require("../controller/userControllor")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Backend part of E-commerce  app by Ashish" });
});



// // // Product API
router.post( "/createProduct" , createNewProduct)

router.get("/findAllProducts" , findAllProducts)


router.get("/getCategoryAndHighlight" , getCategoryAndHighlight)


router.get( "/findOneProduct/:productId" , findOneProduct )



// // // Review API 
router.post( "/createReview" , createNewReview)



// // // user API 

router.post("/createUser" , upload.array("file") , creteUserControllor)


module.exports = router;
