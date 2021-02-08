const User = require('../../../models/users');
const jwt = require('jsonwebtoken');;



module.exports.createSession = async function(req, res){
    try {
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return red.status(422).json({
                message:"Invalid username or password"
            });
        }
        return res.status(200).json({
            message:' Sign n successful, here is your token. Please keep it safe!',
            data:{
                token: jwt.sign(user.toJSON(), 'NeroSocial', {expiresIn: '10000'}),
            }
        });        
    } catch (error) {
        return res.status(500).json({
            message : "Internal Serval Error"
        });        
    }
    
}