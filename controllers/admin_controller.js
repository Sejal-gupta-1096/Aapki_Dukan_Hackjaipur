const Category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");
const Query = require("../models/query");


module.exports.loginPage = function(request , response){
    return response.render("login" , {layout : 'layout_login'});
}

module.exports.createSession = function(request , response){
    console.log(request.user);
    request.flash("success" , "Logged In Successfully");
    //console.log(request.flash);
    return response.redirect("/admin/master/categories_master");
}

module.exports.destroySession = function(request , response){
    request.logOut();
    request.flash("success" , "You have signed out");
    //console.log(request.flash);
    return response.redirect("/admin/login");
}