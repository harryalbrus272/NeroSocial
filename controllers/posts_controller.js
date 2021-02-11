const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function (req, res) {
    try {
        let posts = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            //if we want to populate the name of the user
            posts = await post.populate('user','name').execPopulate();
            return res.status(200).json({
                data:{
                    post:posts,
                }, 
                name: req.user.name,
                message:"Post created!"
            });
        }
        req.flash('success', 'Post published');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        return req.redirect('back');
    }
}

module.exports.destroy = async function (req, res) {
    /* wihout async await
    Post.findById(req.params.id , function(err, post) {
        //.id means converting the object id into String 
        if(post.user == req.user.id) {
            post.remove();
        
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }
    });*/
    try {
        let post = await Post.findById(req.params.id);
        //.id means converting the object id into String 
        if (post.user == req.user.id) {

            await Like.deleteMany({likeable : post, onModel: 'Post'});
            await Like.deleteMany({_id : {$in: post.comments}});
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });

            }

            req.flash('success', 'Post associated comments deleted');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this post');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }

}