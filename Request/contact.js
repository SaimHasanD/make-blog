const { check } = require('express-validator');

exports.store=[
    check('image', "Invalid image"),
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim()
]

exports.update=[
    check('image', "Invalid image"),
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim()
]