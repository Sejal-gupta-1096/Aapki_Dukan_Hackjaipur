//1)Getting Router Module
const express = require("express");
const router = express.Router();


router.use("/" , require("./website"));

 
//2)Exporting the router module
module.exports = router;