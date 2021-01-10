module.exports.home = function(req, res){
    return res.render('home',{
        title: "Home"
    });
}
module.exports.actionBar = function(req,res){
    return res.end('<h1>Actionbar is up and Running</h1>');
}