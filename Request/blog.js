const { check } = require('express-validator');

exports.store=[
    check('image', "Invalid Image").not().isEmpty().trim(),
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('slug', "Invalid slug").not().isEmpty().trim()

]

exports.update=[
    check('image', "Invalid Image").not().isEmpty().trim(),
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('slug', "Invalid slug").not().isEmpty().trim()
]