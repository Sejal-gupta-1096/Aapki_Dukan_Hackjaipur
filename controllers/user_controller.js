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