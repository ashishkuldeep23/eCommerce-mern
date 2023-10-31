var express = require('express');
var router = express.Router();


// // // Import controles -->

const { createNewProduct , findAllProducts , findOneProduct} = require("../controller/productControllor")
const { createNewReview } = require("../controller/reviewController")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Backend part of E-commerce  app by Ashish" });
});




router.post( "/createProduct" , createNewProduct)

router.get("/findAllProducts" , findAllProducts)

router.get( "/findOneProduct/:productId" , findOneProduct )


router.post( "/createReview" , createNewReview)




module.exports = router;
