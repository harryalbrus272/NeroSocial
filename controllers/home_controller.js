const { populate } = require('../models/post');
const Post = require('../models/post');
const Posts = require('../models/post');
module.exports.home = function(req, res){
    //console.log(req.cookies);
    //changing cookie in the response
    //res.cookie('user_id',30);
    //function returning all the posts
    /*Post.find({}, function(err,posts){
        return res.render('home',{
            title: "NeroSocial | Home",
            //passing on all he posts
            posts: posts
        });
    });*/
    //prepopulating the database of each user for each posts
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: "NeroSocial | Home",
            //passing on all the posts
            posts: posts
        });
    });    
}
module.exports.actionBar = function(req,res){
    return res.end('<h1>Actionbar is up and Running</h1>');
}