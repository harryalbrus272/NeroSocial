module.exports.home = function(req, res){
    console.log(req.cookies);
    //changing cookie in the response
    res.cookie('user_id',30);
    return res.render('home',{
        title: "Home"
    });
}
module.exports.actionBar = function(req,res){
    return res.end('<h1>Actionbar is up and Running</h1>');
}