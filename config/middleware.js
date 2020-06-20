module.exports.setFlash = function(request , response , next){
    response.locals.flash = {
        "success" : request.flash("success"),
        "error" : request.flash("error"),
        "information" : request.flash("information")
    }
    console.log("Middleware" , response.locals.flash)
    next();
}