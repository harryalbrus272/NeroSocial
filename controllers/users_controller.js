module.exports.profile = function(req,res){
    res.render('users',{
        title: "Profile page"
    });
}
module.exports.otherdetails = function(req,res){
    res.render('users',{
        title: "Other Details"
    });
}