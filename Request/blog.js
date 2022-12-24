const { check } = require('express-validator');

exports.store=[
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('slug', "Invalid slug"),
    check('image', "Invalid Image")
]

exports.update=[
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('slug', "Invalid slug"),
    check('image', "Invalid Image")
]