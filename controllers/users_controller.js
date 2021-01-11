module.exports.profile = function(req,res){
    res.render('users',{
        title: "Profile page"
    });
}
module.exports.otherdetails = function(req,res){
    res.render('users',{
        title: "Other Details"
    });
}
//render the sign-up page
module.exports.signUp = function(req,res){
    res.render('user_sign_up',{
        title : "NeroSocial |Sign Up"
    });
}
//render the sign-in page
module.exports.signIn = function(req,res){
    res.render('user_sign_in',{
        title : "NeroSocial |Sign In"
    });
}

//get the sign-up data
module.exports.create = function(req,res){
    
}
//get the sign-in session data
module.exports.createSession = function(req,res){
    
}