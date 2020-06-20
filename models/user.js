const mongoose = require("mongoose");

const path = require("path");

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
    ] 

} , {
    timestamps : true
});


  
const User = mongoose.model("User" , userSchema);

module.exports = User;