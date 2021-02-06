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
    },
    avatar: {
        type: String
    }
},{
   timestamps : true 
    /* When was the user created and updated */
    //mongoose update these timestamp
});

//connecting AVATAR_PATH, avatar field and the directory
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
      //current directory neighbour folder to AVATAR_PATH
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  //static methods
  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH; //making this publicly available  
  var upload = multer({ storage: storage })

//telling mongo that this is a model
const User = mongoose.model('User',userSchema);
module.exports = User;