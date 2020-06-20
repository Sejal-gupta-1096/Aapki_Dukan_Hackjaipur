const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminController = require("../controllers/admin_controller");


router.use("/categories_master" ,require("./categories_master"));
router.use("/product_master" , require("./product_master"));
//router.use("/contact_master" , require("./contact_master"));

 
//2)Exporting the router module
module.exports = router;