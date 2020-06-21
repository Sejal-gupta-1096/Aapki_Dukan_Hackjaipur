const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user_controller");




router.get("/", userController.accountPage);
router.get("/update", userController.update);

//2)Exporting the router module
module.exports = router;