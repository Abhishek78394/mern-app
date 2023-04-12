const express = require("express");
const { homepage, signup, signin, signout, product_create,getAllProducts, getAllUSer, delete_User, delete_product, update_user, update_product, getOneUser } = require("../controllers/indexController");
const router = express.Router();


// router.route("/").get(homepage);
router.get("/", homepage);

// // post /signup - create user
router.post("/signup", signup);

// // post /signin - login user
router.post("/signin", signin);

// // get /signout - logout user
router.get("/signout", signout);

// // get /signout - logout user
router.get("/getUser", getAllUSer);

// //  delete user 
router.get("/delete_user", delete_User);
router.get("/update_user", getOneUser );

// //  update user 
router.post("/update_user", update_user);

// // post /insert - details
router.post("/insert", product_create);

// // gt / collect-data
router.get("/getdata",getAllProducts) 

// //  update user 
router.post("/update_product", update_product);

// // gt / collect-data
router.get("/delete_product",delete_product) 

module.exports = router;