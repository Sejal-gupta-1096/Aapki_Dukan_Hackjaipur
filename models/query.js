const mongoose = require("mongoose");
const path = require("path");

const querySchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    } , 
    message : {
        type : String,
    } , 
    user :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    
} , {
    timeStamps : true
})


const Query = mongoose.model("Query" , querySchema);
module.exports = Query;