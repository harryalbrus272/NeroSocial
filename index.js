const express = require('express');
const app = express();
const port = 8000; //default port is 80
app.listen(port, err => {
    if(err){
        console.log('Error', err);
        /* Second way */
        console.log(`Error in running the Server :${err}`);
    }
    //Afer $, the entered expression is evaluated by the javascript
    console.log(`Server running on port : ${port}`);
});