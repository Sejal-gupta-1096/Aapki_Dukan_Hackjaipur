const express = require("express");
const router = express.Router();
const passport = require("passport");
const masterController = require("../controllers/master_controller");

router.get("/" , masterController.categoriesMaster);
router.get("/delete" , masterController.deleteCategory);
router.get("/status" , masterController.changeStatusCategory);
router.get("/updateForm" , masterController.updateFormCat);
router.post("/update" , masterController.updateCategory);
router.get("/addForm" , masterController.addFormCategory);
router.post("/add" , masterController.addCategory);

module.exports = router;