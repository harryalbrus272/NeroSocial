const passport = require('passport');
//Capital because passport suggests so
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
//authenticate using passport
//passport should use this strategy
passport.use(new LocalStrategy({
    //unique email from Schema
    usernameField:'email',
    passReqToCallback: true
}, //done on the basis of what is happenning inside the code
function(req, email, password, done){
    //find a user and establish the identity
    User.findOne({email:email}, function(err, user){
        if(err){
            req.flash('error',err);
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error','Invalid Username/Password');
            return done(null, false);
            //false because authentication has not been done
        }
        return done(null,user);
    });
    
}
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user ,done) => {
    done(null,user.id);
});
//deserializing the user from the key in the cookies
passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user){
        if(err){
            console.log('Error!');
            return done(err);
        }

        return done(null ,user);
    });
});

//check if the user is authenticated
//using this function to check authentication as a middleware
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in  then pass on the request
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        
        // req.user containes the current signed in user from the session cookie and we are sending this to the locals for the views
        res.locals.user= req.user; 
    }
    next();
}
module.exports = passport;