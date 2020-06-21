const Category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");
const Query = require("../models/query");

module.exports.categoriesMaster = async function(request , response){;
    let list = await Category.find({});

    return response.render("categories_master" , 
    {layout: 'layout_admin',
    categories_list : list});
}

module.exports.deleteCategory = async function(request , response){

    let category = await Category.findById(request.query.id);
    await Product.deleteMany({category_name : category.name});
    category.remove();

    request.flash("success" , "Ctegory Created");
    return response.redirect("back");
}

module.exports.changeStatusCategory = async function(request , response){

    let category = await Category.findByIdAndUpdate(request.query.id);
    let status = false;

    if(category.status == 1){
        category.status = 0;
        status = false;
    }else{
        category.status = 1;
        status = true;
    }
    category.save();

    if(request.xhr){
        return response.status(200).json({
            status : status , 
            message : "Request Successful"
        });
    }

    request.flash("success" , "Status Updated");
    return response.redirect("back");
}

module.exports.updateFormCat = async function(request , response){
    let category = await Category.findById(request.query.id);
    
    response.render("update_category" , {layout : "layout_admin" , category : category});
}

module.exports.updateCategory = async function(request , response){
    
        // Yes, it's a valid ObjectId, proceed with `findById` call.
      
    let category = await Category.findById(request.query.id);
    
    Category.uploadedImage(request , response , function(error){
        if(error){
            console.log("error" , error);
            return;
        }

        console.log(request.file);

        //if file is present
        if(request.file){
            
            //and upload new file (replace old file with new file)
            category.category_img = Category.imagePath + "/" + request.file.filename;
        }
        
        category.save();
        request.flash("success" , "Image Uploaded");
        return response.redirect("/admin/master/categories_master");
    
});
    
}

module.exports.addFormCategory = function(request , response){;
    return response.render("add_category_form" , {layout : "layout_admin"});
}

module.exports.addCategory = async function(request , response){;
    
    let category = await Category.findOne({name:request.body.name});

    if(!category){
       await Category.create({
           name : request.body.name,
           status : 1 
        });
        request.flash("success" , "Category Created");
       return response.redirect("/admin/master/categories_master");
    }

    request.flash("information" , "Category is already present");
    return response.redirect("back");
}



module.exports.productMaster = async function(request , response){;
    let list = await Product.find({});

    return response.render("product_master" , 
    {layout: 'layout_admin',
    product_list : list});
}

module.exports.deleteProduct = async function(request , response){
    let product = await Product.findById(request.query.id);
    console.log(product);
    let categoryId = await Category.findOne({name : product.category_name})
    product.remove();
    await Category.findByIdAndUpdate(categoryId._id , { $pull : {products : request.query.id}});
    
    request.flash("success" , "Product Deleted");
    return response.redirect("back");
}


module.exports.changeStatusProduct = async function(request , response){

    let product = await Product.findByIdAndUpdate(request.query.id);
    let status = false;

    if(product.status == 1){
        product.status = 0;
        status = false;
    }else{
        product.status = 1;
        status = true;
    }
    product.save();

    if(request.xhr){
        return response.status(200).json({
            status : status , 
            message : "Request Successful"
        });
    }

    request.flash("success" , "Status Updated");
    return response.redirect("back");
}



module.exports.addFormProduct = async function(request , response){
    let list = await Category.find({});
    return response.render("add_product_form" , 
    {
        layout : "layout_admin",
        categories_list : list
    });
}

module.exports.addProduct = async function(request , response){
  

    
    let product = await Product.findOne({name:request.body.name});

    if(!product){
        product = await Product.create({
           name : request.body.name,
           category_name : request.body.category_name,
           mrp : request.body.mrp,
           sp : request.body.sp,
           qty : request.body.qty,
           short_description : request.body.short_description,
           long_description : request.body.long_description,
           meta_description : request.body.meta_description,
           meta_title : request.body.meta_title,
           status : 1
         });
        
         let category = await Category.findOne({name : product.category_name});
         category.products.push(product);
         (await category).save();

         request.flash("success" , "Product Created");
       return response.redirect("/admin/master/product_master");
    }

    request.flash("information" , "Product is already present");
    return response.redirect("back");

}

module.exports.updateForm = async function(request , response){
    let product = await Product.findById(request.query.id);
    
    response.render("update_product" , {layout : "layout_admin" , product : product});
}

module.exports.updateProduct = async function(request , response){

    console.log(request.query.id);
    if (request.query.id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
      
    let product = await Product.findById(request.query.id);
    
    console.log(product);
    Product.uploadedImage(request , response , function(error){
        if(error){
            console.log("error");
            return;
        }

        console.log(request.file);

        //if file is present
        if(request.file){
            
            //and upload new file (replace old file with new file)
            product.product_img = Product.imagePath + "/" + request.file.filename;
        }
        
        product.save();
        request.flash("success" , "Image Uploaded");
        return response.redirect("/admin/master/product_master/");
    
});
    }else{console.log("InvalidId")};
}


module.exports.contactUsMaster = async function(request , response){

    
    let users_list = await User.find({});
    return response.render("contact_master" , 
    {
        layout : 'layout_admin',
        users_list : users_list
    });

}

module.exports.viewQuery = async function(request , response){

    let user = await User.findById(request.query.id);
    user = await user.populate("query").execPopulate();
    console.log(user);
   return response.render("query" , {
       layout : "layout_admin",
       user : user
   });
}

module.exports.deleteQuery = async function(request , response){

    let query = await Query.findById(request.query.id);
    let user = await User.findById(query.user);
    user = await User.findByIdAndUpdate(user , { $pull : {query : request.query.id}});
    query.remove();
    request.flash("success" , "Query Resolved");
    return response.redirect("back");
}
