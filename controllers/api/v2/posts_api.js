module.exports.index = function(req, res){
    return res.status(200).json({
        message:"Received post on v2",
        post: []
    });

}