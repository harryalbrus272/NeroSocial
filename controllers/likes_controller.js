const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res){
    try {//likes/toggle/?id=abcde&type=Post
        let likeable;
        let deleted = false; //boolean check if the like button is working
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        } else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if like already exists
        let existingLike = Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });
        //if a like already exist else ...
        if(existingLike){
            likeable.likes.pull((await existingLike)._id);
            likeable.save();

            existingLike.remove();
            deleted =true;
        } else{
            //else make a new  like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query._id,
                onModel: req.query.type,
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }  
        
        return res.status(200).json({
            message: 'Request Succesful',
            data:{
                deleted:deleted
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'Internal Server Error'
        });        
    }
}