const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
console.log("First");
router.get('/profile',usersController.profile);
router.get('/otherdetails',usersController.otherdetails)
module.exports = router;