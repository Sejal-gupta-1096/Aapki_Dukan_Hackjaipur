const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user_controller");



router.post("/contact-us-form", passport.checkAuthentication ,userController.contactUs);
router.post("/login", passport.authenticate(
    'local' , 
    {
        failureRedirect : '/login-register'
    }
), userController.createSession);
router.post("/register", userController.register);
router.get("/logout", passport.checkAuthentication,userController.destroySession);
router.use("/cart" , passport.checkAuthentication ,  require("./user_cart"));

//2)Exporting the router module
module.exports = router;