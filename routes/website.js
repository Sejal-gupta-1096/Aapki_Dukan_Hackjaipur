const express = require("express");
const router = express.Router();
const passport = require("passport");
const websiteController = require("../controllers/website_controller");



router.get("/", websiteController.home);
router.get("/category", websiteController.category);
router.get("/product-details", websiteController.productDetails);
router.get("/contact-us", websiteController.contactUsPage);
router.get("/login-register", websiteController.logInRegister);
router.get("/about-us", websiteController.aboutUs);
router.use("/user" , passport.checkAuthentication ,require("./user"))
 
//2)Exporting the router module
module.exports = router;