const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    //first find the posts id and then add comments to it
    Post.findById(req.body.post, function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post : req.body.post,
                user : req.user._id
            },function(err, comment){
                //handle error
                post.comments.push(comment); //automatically fetch the id and push it
                post.save();//before - only in ram . after save- it gets permanently saved
                res.redirect('/');
            });
        }
    });

}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, (err, comment) => {
        if(comment.user == req.user.id){
            let postID = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postID, { $pull: {comments: req.params.id}}, function (err, post){
                return res.redirect('back');
            });
        }
    });
}