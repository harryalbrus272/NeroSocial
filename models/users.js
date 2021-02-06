const mongoose =require('mongoose');
const multer = require('multer');

const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email: {
        /* Mongoose will throw an error if email is not unique in the databse*/
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    } ,
    name: {
        type : String,
        required : true
    }
},{
   timestamps : true 
    /* When was the user created and updated */
    //mongoose update these timestamp
});
//telling mongo that this is a model
const User = mongoose.model('User',userSchema);
module.exports = User;