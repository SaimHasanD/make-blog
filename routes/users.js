var express = require('express');
var router = express.Router();
var userController = require('../controller/auth/userController')

/* GET users listing. */
router.get('/login', userController.login);
// router.post('/login', userController.blog);
router.get('/register', userController.register);
// router.post('/register', userController.team);
// router.get('/logout', userController.testimonial);


 module.exports = router;
