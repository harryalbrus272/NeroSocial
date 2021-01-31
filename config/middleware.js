module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error' : req.flash('error')
    }

    //next is very important to maintain the flow of the code
    next();
}