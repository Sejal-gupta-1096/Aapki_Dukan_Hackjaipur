//1) Setting up express server
const express = require("express");
const app = express();
//2)defining port no.
const port = 800;
 
const path = require("path");
//6) Installing and acquiring express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");

//9)Setting configuration for mongoose in config folder and requiring here (Connecting to database)
const db = require("./config/mongoose");

//11)Using cookies
const cookieParser = require("cookie-parser");

//12)Using passport for authentication and express session for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//13)Permanantly storing session in db
const MongoStore = require("connect-mongo")(session);

const flash = require("connect-flash");
const customMVare = require("./config/middleware");

//10)Setting middleware for decoding the post request
const bodyParser = require("body-parser");


  // parse application/json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  

//After requiring cookies we have to use this middleware for using cookies
app.use(cookieParser());

app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'assets')));

//8)Extracting links and scripts from individual pages and place them in head
app.set("layout extractStyles" ,true);
app.set("layout extractScripts" ,true);

//5)Setting up View Enjine
app.set("view engine" , "ejs");
app.set('views', [__dirname + '/views/website', __dirname + '/views/admin']);

//using express session to encrypt user data and stores in the cookie (This cookie is then stored in database)
app.use(session({
    name : "ecommerce",
    secret : "apki-dukan" , 
    saveUninitialized : false,
    resave : false , 
    cookie : {
        maxAge : (1000 * 60 * 100)
    } , 
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    } , function(error){
        console.log("Unable to store session cookie in database");
    })
}))

//initialising passport and using session
app.use(passport.initialize());
app.use(passport.session());

//setting user to locals of response
app.use(passport.setAuthenticatedUser);

 app.use(flash());
 app.use(customMVare.setFlash);


app.use("/uploads" , express.static(__dirname + "/uploads"));



//4) Acquiring Router Middleware
app.use("/",require("./routes/index"));





//3)Running ther server on defined port
app.listen(port , function(error){
    if(error){
        console.log(`Error in running the server :${error}`);
        return;
    }

    console.log(`Server is up and running on port : ${port}`);
});
