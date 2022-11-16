var express = require('express');
var router = express.Router();
const contactController = require('../../controller/contactUsController')
const request = require('../../Request/contact')

/* GET contact-us page. */
router.get('/', contactController.index);

router.get('/create', contactController.create);

router.get('/:id/edit', contactController.edit);

router.delete('/:id/delete', contactController.delete);

router.get('/:id/show', contactController.show);

router.post('/store', request.store, contactController.store); 

router.put('/:id/update', contactController.update);
module.exports = router;