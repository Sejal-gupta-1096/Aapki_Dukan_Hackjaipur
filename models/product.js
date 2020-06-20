const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const IMAGE_PATH = path.join("/uploads/products/");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    } , 
    category_name : {
        type : String
    } , 
    mrp : {
        type : Number,
        required : true
    } ,
    sp : {
        type : Number,
        required : true
    } ,
    qty : {
        type : Number,
        required : true
    } ,
    status : {
        type : Number,
    } ,
    short_description : {
        type : String
    } ,
    long_description : {
        type : String
    } ,
    meta_description : {
        type : String,
    } ,
    meta_title : {
        type : String,
    } ,
    meta_keyword : {
        type : String,
    } ,
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    product_img : {
        type : String
    }
    
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

  productSchema.statics.uploadedImage = multer({ storage: storage }).single("product_img");
  productSchema.statics.imagePath = IMAGE_PATH;
  var upload = multer({ storage: storage });
  
const Product = mongoose.model("Product" , productSchema);
module.exports = Product;