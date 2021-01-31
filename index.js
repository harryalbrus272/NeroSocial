const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 800; //default port is 80
const expressLayouts = require('express-ejs-layouts');
//calling databse in the next line
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//mongo-store to put prevent the sign-out on every server restart
const MongoStore = require('connect-mongo')(session); //session information in database
//importing sass to use it in the project
const sassMiddleware = require('node-sass-middleware');
// these saas files must be compiled before making any request to the server

const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
   src: './assets/scss',
   dest: './assets/css',
   //messages when server is starting
   debug: true,
   //messages in single or multiple lines . compressed is the other option
   outputStyle : 'extended',
   //where should it look for the css files
   prefix:'/css'
}));

app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(express.static('./assets'));
//layouts are to be rendered before routes and views
app.use(expressLayouts);
//extract style and scripts from the sub pages into the layout
app.set('layout extractStyles' ,true);
app.set('layout extractScripts' ,true);
/*Next two lines tor setting up view engine*/
app.set('view engine' , 'ejs');
app.set('views', './views'); //you can also use array in views
//mongo store is used to store the session cookie in the DB
app.use(session({
    name: 'NeroSocial',
    //change the secret key before deployment in production
    secret : 'blahsomething',
    saveUninitialized : false, //not logged-in, then set session cookie to false
    resave : false, //do not want save it again and again. If it is there, then the cookie is not touched
    cookie : {
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )

}));
app.use(passport.initialize());
app.use(passport.session());
//check if session cookie is there or not
app.use(passport.setAuthenticatedUser);
// use express router 

app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./routes'));
app.listen(port, function(err) {
    if(err){
        console.log('Error', err);
        /* Second way */
        console.log(`Error in running the Server :${err}`);
    }
    //Afer $, the entered expression is evaluated by the javascript
    console.log(`Server running on port : ${port}`);
});