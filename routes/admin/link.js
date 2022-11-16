var express = require('express');
var router = express.Router();
const teamController = require('../../controller/linkController')

/* GET Link page. */
router.get('/', teamController.index);

router.get('/create', teamController.create);

router.get('/:id/edit', teamController.edit);

router.delete('/:id/delete', teamController.delete);

router.get('/:id/show', teamController.show);

router.post('/store', teamController.store); 

router.put('/:id/update', teamController.update);

module.exports = router;