const express = require('express');
//fetching the existing instance of express in above line

const router  = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.get('/actionbar', homeController.actionBar);
router.use('/users',require('./users'));
router.use('/messenger',require('./messenger'));
router.use('/channels',require('./channels'));
router.use('/posts', require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
router.use('/api', require('./api'));
module.exports = router;