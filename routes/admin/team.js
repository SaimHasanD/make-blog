var express = require('express');
var router = express.Router();
const teamController = require('../../controller/teamController')
const request = require('../../Request/team')

/* GET Team page. */
router.get('/', teamController.index);

router.get('/create', teamController.create);

router.get('/:id/edit', teamController.edit);

router.post('/:id/delete', teamController.delete);

router.get('/:id/show', teamController.show);

router.post('/store', request.store, teamController.store); 

router.post('/:id/update', teamController.update);

module.exports = router;