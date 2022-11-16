var express = require('express');
var router = express.Router();
const aboutController = require('../../controller/aboutController')
const request = require('../../Request/about')

/* GET Blog page. */
router.get('/', aboutController.index);

router.get('/create', aboutController.create);

router.get('/:id/edit', aboutController.edit);

router.delete('/:id/delete', aboutController.delete);

router.get('/:id/show', aboutController.show);

router.post('/store', request.store, aboutController.store); 

router.put('/:id/update', aboutController.update);

module.exports = router;

// console.log(request.store);