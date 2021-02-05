const Comment = require('../models/comment');
const Post = require('../models/post');

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
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });

            }

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch(err) {
        console.log("Error!", err);
        return res.send("Some error");
    }
    
}