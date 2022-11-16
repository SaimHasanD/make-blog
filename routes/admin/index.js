var express = require('express');
var router = express.Router();
const adminController = require('../../controller/adminController')

/* GET Blog page. */
router.get('/', adminController.index);


module.exports = router;