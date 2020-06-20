const Category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");
const Query = require("../models/query");
const Cart = require("../models/cart");


module.exports.home = async function(request , response){
    let category_list = await Category.find({});
    
    let product_list = await Product.find({}).sort("-createdAt" );
    return response.render("home",{
        layout : "layout_website" , 
        categories_list : category_list,
        product_list : product_list
    });
}

module.exports.category = async function(request , response){
    
    let category = await (await Category.findById(request.query.id).populate("products")).execPopulate();
    let category_list = await Category.find({});
    console.log(category);
    return response.render("category" , 
    {
        layout : "layout_website",
        categories_list : category_list,
        category : category
    });
}

module.exports.productDetails = async function(request , response){

    let product = await Product.findById(request.query.id);
    let category_list = await Category.find({});
    let category = await Category.findOne({name : product.category_name});
    console.log(product);
    return response.render("product_details.ejs" , {
        layout:"layout_website",
        categories_list : category_list,
        product : product,
        category : category
    });
}

module.exports.contactUsPage = async function(request , response){
    let category_list = await Category.find({});
    return response.render("contact_us.ejs" , {
        layout:"layout_website",
        categories_list : category_list,
    });
}





module.exports.logInRegister = async function(request , response){
    let category_list = await Category.find({});
    return response.render("login_register.ejs" , {
        layout:"layout_website",
        categories_list : category_list,
    });
}

