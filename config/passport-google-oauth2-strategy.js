const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

// tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID: '157862504071-iaq8msbfcihdis03ggrk055aeiggi7m4.apps.googleusercontent.com',
    clientSecret: 'fz8HDYktZtNluwYay8uEmZd2',
    callbackURL: "http://localhost:800/users/auth/google/callback"
},
//accestokens were .Refresh token when accessToken expires
    function (accessToken, refreshToken, profile, done) {
        //find the user
        User.findOne({email: profile.emails[0].value}).exec((err, user) => {
            if(err){
                console.log('Error in Google Strategy Pasport', err);
                return;
            }
            console.log(profile);
            if(user){
                //if found; set this user as req.user
                return done(null, user);
            } else{
                //if not found; create the user and set it as req.user
                User.create({
                    name : profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                }, function (err, users) {
                    if(err){
                        console.log('Error in Google Strategy Pasport', err);
                        return done(null, user);
                    }                    
                });

            }
            
        });
    }

));