const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user_controller");




router.get("/",userController.checkoutPage);
//router.post("/add",userController.addToCart);
//router.get("/delete",userController.deleteCartItem)
//router.get("/update",userController.updateCartItem)
//router.use("/checkout",require("./checkout"))

//2)Exporting the router module
module.exports = router;