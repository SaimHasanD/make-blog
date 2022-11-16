const { check } = require('express-validator');

exports.store=[
    check('image', "Invalid image").not().isEmpty().trim(),
    check('title1', "Invalid title1").not().isEmpty().trim(),
    check('title2', "Invalid title2").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('map', "Invalid map").not().isEmpty().trim()
]

exports.update=[
    check('image', "Invalid image").not().isEmpty().trim(),
    check('title1', "Invalid title1").not().isEmpty().trim(),
    check('title2', "Invalid title2").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('map', "Invalid map").not().isEmpty().trim()
]