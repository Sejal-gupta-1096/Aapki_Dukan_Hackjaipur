const mongoose = require("mongoose");

const path = require("path");

const cartSchema = new mongoose.Schema({

    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    } ,
    qty : {
        type : Number
    },

} , {
    timestamps : true
});


  
const Cart = mongoose.model("Cart" , cartSchema);

module.exports = Cart;