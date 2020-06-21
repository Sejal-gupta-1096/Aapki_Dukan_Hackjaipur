const Category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");
const Query = require("../models/query");
const Cart = require("../models/cart");



module.exports.contactUs = async function(request , response){
    if(request.user){
        let user = await User.findOne({email : request.body.email});
        console.log(user);
        if(user){
            let query = await Query.create({
                title : request.body.title,
                message : request.body.message,
                user : request.user
            })
            await user.query.push(query);
            user.save();
            request.flash("success" , "Your request is sent");
            response.redirect("back");
        }else{
            request.flash("error" , "Please enter valid credentials");
            return response.redirect("back");
        }
    }else{
        request.flash("information" , "Please sign up to access this functionality");
        return response.redirect("/login-register");
    }
        
}

module.exports.addToCart = async function(request , response){
    if(request.user){
        // let cartProduct = await Cart.findOne({product : request.query.product_id});
        // if(cartProduct){
        //     cartProduct.qty = request.body.qty;
        //     cartProduct.save();
        // }else{
            let user = await User.findById(request.user);

            let cart = await Cart.create({
                product : request.query.product_id, 
                qty : request.body.qty
            });

            user.cart.push(cart);
            (await user).save();
        //}
        request.flash("success" , "Item added to cart successfully");
        return response.redirect("back");

    }else{
        request.flash("information" , "Please sign up to access this functionality");
        return response.redirect("/login-register")
    }
}

module.exports.cartPage = async function(request , response){
    if(request.user){
        let category_list = await Category.find({});

        let user = await User.findById(request.user)
        .populate({
            path : "cart",
            populate : {
                path : "product",
                model : "Product"
            }
        })

        return response.render("cart_page" , {
            layout : "layout_website",
            categories_list : category_list,
            whole_user : user
        })
    }else{
        request.flash("information" , "Please sign up to access this functionality");
        return response.redirect("/login-register");
    }
}

module.exports.deleteCartItem = async function(request , response){
    if(request.user){
        await Cart.findByIdAndDelete(request.query.id);
        await User.findByIdAndUpdate(request.user , { $pull : {cart : request.query.id}})
        request.flash("success" , "Item removed from cart");
        return response.redirect("back");
    }else{
        return response.redirect("/login-register");
    }
}

module.exports.checkoutPage = async function(request , response){
    if(request.user){
        let category_list = await Category.find({});

        let user = await User.findById(request.user)
        .populate({
            path : "cart",
            populate : {
                path : "product",
                model : "Product"
            }
        })

        return response.render("checkout" , {
            layout : "layout_website",
            categories_list : category_list,
            whole_user : user
        })
    }else{
        request.flash("information" , "Please sign up to access this functionality");
        return response.redirect("/login-register");
    }
}

module.exports.placeOrder = async function(request , response){
    if(request.user){
        let category_list = await Category.find({});

        let user = await User.findById(request.user)
        .populate({
            path : "cart",
            populate : {
                path : "product",
                model : "Product"
            }
        })

        request.flash("success" , "ORDER PLACED");
        return response.redirect("back")
    }else{
        request.flash("information" , "Please sign up to access this functionality");
        return response.redirect("/login-register");
    }
}


module.exports.accountPage = async function(request , response){
    if(request.user){
        let category_list = await Category.find({});

        let user = await User.findById(request.user)
        .populate({
            path : "cart",
            populate : {
                path : "product",
                model : "Product"
            }
        })

        return response.render("account" , {
            layout : "layout_website",
            categories_list : category_list,
            whole_user : user
        })
    }else{
        request.flash("information" , "Please sign up to access this functionality");
        return response.redirect("/login-register");
    }
}

module.exports.update = async function(request , response){
    
    // Yes, it's a valid ObjectId, proceed with `findById` call.
  
let user = await User.findById(request.user._id);
User.uploadedImage(request , response , function(error){
    if(error){
        console.log("error" , error);
        return;
    }

    console.log(request.file);

    //if file is present
    if(request.file){
        
        //and upload new file (replace old file with new file)
        user.user = Category.imagePath + "/" + request.file.filename;
    }
    
    user.save();
    request.flash("success" , "Image Uploaded");
    return response.redirect("back");

});

}
module.exports.register = async function(request , response){
    try{
        console.log(request.body);
    //if user already exist then redirect else create new user
        let user = await  User.findOne({email:request.body.email}); 
    
            if(!user){
                await User.create(request.body); 
                request.flash("success" , "Account Created");
                return response.redirect("/login-register");
            }
            request.flash("information" , "You already have account registered on this mail");
            return response.redirect("back");

    }catch(error){
        console.log("Error" , error);
        return;
    }
}

module.exports.createSession = function(request , response){
    console.log(request.user);
    request.flash("success" , "Logged In Successfully");
    return response.redirect("/");
}

module.exports.destroySession = function(request , response){
    request.logOut();
    request.flash("success" , "You have signed out");
    console.log("Controllers" , request.flash);
    return response.redirect("/");
}