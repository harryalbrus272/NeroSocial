const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req, res){
    let posts = await Post.find({})
        .sort('-createdAt')    
        .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
    return res.status(200).json({
        message: "List of post",
        posts: posts
    });
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
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            
            /*if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });

            }*/

            //req.flash('success', 'Post associated comments deleted');
            return res.status(200).json(
                {
                    message: "Post and associated comments deleted successfuly!"
                }
            );
        } else {
            return res.status(200).json({
                message: "You cannot delete the post"
            });
        }
    } catch (err) {
        
        return res.status(500).json({
            message : "Internal Serval Error"
        });
    }

}
