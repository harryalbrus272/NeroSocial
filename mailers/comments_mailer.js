const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs');
    //sendMail is predefined function with parametere
    nodeMailer.transporter.sendMail({
        from: 'shashwatksingh.27@gmail.com',
        to: comment.user.email,
        subject: "New Comment Pulished",
        html: htmlString
    }, (error,info) => {
        if(error){
            console.log('Error in sending the mail', error);
            return;
        }
        console.log('Message sent' , info);
        return;
    });
}