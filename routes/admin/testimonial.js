var express = require('express');
var router = express.Router();
const testimonialController = require('../../controller/testimonialController')
const request = require('../../Request/testimonial')

/* GET Testimonial page. */
router.get('/', testimonialController.index);

router.get('/create', testimonialController.create);

router.get('/:id/edit', testimonialController.edit);

router.post('/:id/delete', testimonialController.delete);

router.get('/:id/show', testimonialController.show);

router.post('/store', request.store, testimonialController.store); 

router.post('/:id/update', testimonialController.update);

module.exports = router;