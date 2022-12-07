var express = require('express');
var router = express.Router();
const blogController = require('../../controller/blogController')
const request = require('../../Request/blog')

/* GET Blog page. */
router.get('/', blogController.index);

router.get('/create', blogController.create);

router.get('/:id/edit', blogController.edit);

router.post('/:id/delete', blogController.delete);

router.get('/:id/show', blogController.show);

router.post('/store', request.store, blogController.store); 

router.post('/:id/update', blogController.update);

module.exports = router;

// console.log(request.store);