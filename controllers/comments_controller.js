const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
module.exports.create = async function (req, res) {
    //first find the posts id and then add comments to it
    let post = await Post.findById(req.body.post);

    try {
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment); //automatically fetch the id and push it
            post.save();//before - only in ram . after save- it gets permanently saved
            comment = await comment.populate('user','name email').execPopulate();
            //sending mail
            //commentsMailer.newComment(comment); //commented because using kue and delayed jobs worker
            let job = queue.create('emails', comment).save((err)=>{
                if(err){
                    console.log('Error in creating a queue');
                    return;
                }
                console.log('job enqueued',job.id);    
            });

            if(req.xhr){
                /*comment = await comment.populate('user', 'name').execPopulate();*/
                return res.status(200).json({
                    data:{
                        post:comment,
                    }, 
                    name: req.user.name,
                    message:"Comment created!"
                });
            }

            res.redirect('/');
        }
    } catch (err) {
        console.log("Error!", err);
        return res.send("Some error");
    }

}

module.exports.destroy = async function (req, res) {
    try{
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {

            let postID = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postID, { $pull: { comments: req.params.id } });
            
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            
            //send the comment id which was deleted back to the views
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });

            }

            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        } else {
            req.flash('error', 'Unauthorized Access');
            return res.redirect('back');
        }
    } catch(err) {
        console.log("Error!", err);
        return res.send("Some error");
    }
    
}