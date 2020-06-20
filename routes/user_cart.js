const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user_controller");




// router.get("/view", passport.checkAuthentication ,userController.cartPage);
// router.post("/add", passport.checkAuthentication ,userController.addToCart);
// router.get("/delete",passport.checkAuthentication ,userController.deleteCartItem)
// router.get("/update",passport.checkAuthentication ,userController.updateCartItem)

//2)Exporting the router module
module.exports = router;