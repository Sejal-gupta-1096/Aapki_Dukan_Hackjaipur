const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const IMAGE_PATH = path.join("/uploads/users/");

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
    } ,
    email : {
        type:String,
        required:true,
        unique:true
    } , 
    password : {
        type:String,
        required:true,
    } , 
    contact_no : {
        type : Number
    },
    query : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Query'
        }
    ] ,
    
    cart : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Cart'
        }
    ] ,
    user_img:{
        type : String,
    }

} , {
    timestamps : true
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , ".." , IMAGE_PATH));
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  userSchema.statics.uploadedImage = multer({ storage: storage }).single("user_img");
  userSchema.statics.imagePath = IMAGE_PATH;
  var upload = multer({ storage: storage });

const User = mongoose.model("User" , userSchema);

module.exports = User;