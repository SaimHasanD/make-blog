var express = require('express');
var router = express.Router();
var homeController = require('../controller/homeController')

/* GET home page. */
router.get('/', homeController.index);
router.get('/blog', homeController.blog);
router.get('/single-post', homeController.singlePost);
router.get('/team', homeController.team);
router.get('/testimonial', homeController.testimonial);
router.get('/contact-us', homeController.contactUs);
router.get('/about', homeController.about);



module.exports = router;
