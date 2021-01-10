const express = require('express');
const app = express();
const port = 800; //default port is 80
const expressLayouts = require('express-ejs-layouts');
app.use(express.static('./assets'));
//layouts are to be rendered before routes and views
app.use(expressLayouts);
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