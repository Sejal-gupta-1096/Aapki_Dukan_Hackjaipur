const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminController = require("../controllers/admin_controller");



router.get("/login" , adminController.loginPage);
router.post("/create-session" , passport.authenticate(
    'local' , 
    {
        failureRedirect : '/admin/login'
    }
), adminController.createSession);

router.get("/logout", adminController.destroySession);
router.use("/master" , passport.checkAuthentication ,require("./master"));
//2)Exporting the router module
module.exports = router;