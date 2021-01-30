const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');
console.log("First");
router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);
router.get('/otherdetails',usersController.otherdetails);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
//use passport as a middleware to authenticate 
router.post('/create-session', passport.authenticate(
        'local', 
        {failureRedirect : '/users/sign-in'},
),usersController.createSession );
router.get('/sign-out',usersController.destroySession);
module.exports = router;