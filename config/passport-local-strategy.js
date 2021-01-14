const passport = require('passport');
//Capital because passport suggests so
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
//authenticate using passport
//passport should use this strategy
passport.use(new LocalStrategy({
    //unique email from Schema
    usernameField:'email'
}, //done on the basis of what is happenning inside the code
function(email, password, done){
    //find a user and establish the identity
    User.findOne({email:email}, function(err, user){
        if(err){
            console.log('Error in finding user --> passport');
            return done(err);
        }
        if(!user || user.password != password){
            console.log('Invalid Username/ Password');
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

module.exports = passport;