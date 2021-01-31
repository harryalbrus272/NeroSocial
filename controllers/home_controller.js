const { populate } = require('../models/post');
const Post = require('../models/post');
const Posts = require('../models/post');
const User = require('../models/users');
module.exports.home = async function (req, res) {
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
    /* This is creating a "calback hell" with things that are cluttered up so much 
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate: {
            path : 'user'
        }

    })
    .exec(function(err,posts){
        if(err){
            console.log("Error occured",err);
        }
        User.find({}, (err,users)=>{
            return res.render('home',{
                title: "NeroSocial | Home",
                //passing on all the posts
                posts: posts,
                all_users : users
            });
        });
       
    });*/
    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        let users = await User.find({});
        return res.render('home', {
            title: "NeroSocial | Home",
            //passing on all the posts
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log("Error!", err);
    }
}
/*
Three ways to do employ promises
Post.find({}).populate('comments).then(function());
let posts= Post.find({}).populate('comments').exec();
Async - await are best way to keep promises
*/
module.exports.actionBar = function (req, res) {
    return res.end('<h1>Actionbar is up and Running</h1>');
}