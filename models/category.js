const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const IMAGE_PATH = path.join("/uploads/categories/");

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    } , 
    category_img : {
        type : String,
    } , 
    status : {
        type : Number
    },
    products :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        }
    ],
    
} , {
    timeStamps : true
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , ".." , IMAGE_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  categorySchema.statics.uploadedImage = multer({ storage: storage }).single("category_img");
  categorySchema.statics.imagePath = IMAGE_PATH;
  var upload = multer({ storage: storage });

const Category = mongoose.model("Category" , categorySchema);
module.exports = Category;