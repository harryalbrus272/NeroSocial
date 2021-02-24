const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const env = require('./environment');
//extract jwt from the header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

let opts = {
    //bearer token 
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret

}

//fetching out the id from the payloa
passport.use(new JWTStrategy(opts, (jwtPayLoad, done)=>{
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){ console.log("Error in finding user using JWT ", err); return;}

        if(user){
            return done(null,user);
        } else{
            return done(null, false);
        }
    });
}));

module.exports= passport;
