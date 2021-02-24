const nodemailer = require('nodemailer');
const env = require('./environment');
const { getMaxListeners } = require('../models/users');
const ejs =require('ejs');
const path =require('path');
//Sends the email. How this communication is going to take place
let transporter = nodemailer.createTransport(env.smtp);

//template file placed in views folder
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        //relative path is the path from where this function is being called
        path.join(__dirname,'../views/mailers', relativePath),
        data,
        (err, template)=>{
            if(err){console.log('Error in rendering the template'); return;}
            mailHTML = template;
        }
    );
    return mailHTML;
}

//exporting th template and transporter
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}