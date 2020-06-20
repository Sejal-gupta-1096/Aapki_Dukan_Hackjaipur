const express = require("express");
const router = express.Router();
const passport = require("passport");
const masterController = require("../controllers/master_controller");




router.get("/" , masterController.productMaster);
router.get("/delete" , masterController.deleteProduct);
router.get("/status" , masterController.changeStatusProduct);
router.get("/addForm" , masterController.addFormProduct);
router.post("/add" , masterController.addProduct);
router.get("/updateForm" , masterController.updateForm);
router.post("/update" , masterController.updateProduct);

module.exports = router;