module.exports.profile = function(req,res){
    console.log("second");
    res.end('<h1>User Profile</h1>');
}
module.exports.otherdetails = function(req,res){
    res.end('<h1>Other Details</h1>');
}