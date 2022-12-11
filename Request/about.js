const { check } = require('express-validator');

exports.store=[
    check('image', "Invalid image"),
    check('title', "Invalid title1").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('map', "Invalid map")
]

exports.update=[
    check('image', "Invalid image"),
    check('title', "Invalid title1").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('map', "Invalid map")
]