const User = require('../models/users');
module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: "Profile page",
            profile_user: user
        });
    } catch (err) {
        console.log("Error!", err);
        return res.send("Some error");
    }
}

module.exports.update = async function (req, res) {
    /*if (req.user.id == req.params.id) {
        await User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            return res.redirect('back');
        });
    } else {
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized!');

    }*/

    try{

        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req, res, function(err){
            if(err) { console.log(' ****Multer Error!', err);}

            console.log(req.file);
            user.name = req.body.name;
            user.email =req.body.email;
            if(req.file){
                //saving the path of the uploaded file into the avatar field in the user
                user.avatar = User.avatarPath+'/'+req.file.filename;
            }
            user.save();
            return res.redirect('back');
        });

    }catch(err){
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized!');
    }
}
module.exports.otherdetails = function (req, res) {
    res.render('users', {
        title: "Other Details"
    });
}
//render the sign-up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "NeroSocial |Sign Up"
    });
}
//render the sign-in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    res.render('user_sign_in', {
        title: "NeroSocial |Sign In"
    });
}

//get the sign-up data
module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    let user = await User.findOne({email: req.body.email});
    try{
        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch(err) {
         console.log('Error in finding user in signing up'); 
         return; 
    }
        
}
//get the sign-in session data
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged In Succesfully');
    return res.redirect('/');
}
//logout on the sign-out session data
module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'Logged out');
    //now you can either pass the flash message in the locals of the file OR another way is through a middleware
    return res.redirect('/');
}