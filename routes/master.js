const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminController = require("../controllers/admin_controller");


//router.use("/categories_master" , passport.checkAuthentication ,require("./categories_master"));
//router.use("/product_master" , passport.checkAuthentication ,require("./product_master"));
//router.use("/contact_master" , passport.checkAuthentication ,require("./contact_master"));

 
//2)Exporting the router module
module.exports = router;