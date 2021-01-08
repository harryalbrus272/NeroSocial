const express = require('express');
const app = express();
const port = 800; //default port is 80
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