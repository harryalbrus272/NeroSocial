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
app.use(express.urlencoded());
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
app.use(session({
    name: 'NeroSocial',
    //change the secret key before deployment in production
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge: (1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
// use express router 
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