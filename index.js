const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 800; //default port is 80
const expressLayouts = require('express-ejs-layouts');
//calling databse in the next line
const db = require('./config/mongoose');
app.use(cookieParser());
app.use(express.static('./assets'));
//layouts are to be rendered before routes and views
app.use(expressLayouts);
//extract style and scripts from the sub pages into the layout
app.set('layout extractStyles' ,true);
app.set('layout extractScripts' ,true);
// use express router 
app.use('/', require('./routes'));
/*Next two lines tor setting up view engine*/
app.set('view engine' , 'ejs');
app.set('views', './views'); //you can also use array in views
app.listen(port, function(err) {
    if(err){
        console.log('Error', err);
        /* Second way */
        console.log(`Error in running the Server :${err}`);
    }
    //Afer $, the entered expression is evaluated by the javascript
    console.log(`Server running on port : ${port}`);
});