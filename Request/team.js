const { check } = require('express-validator');

exports.store=[
    check('image', "Invalid image").not().isEmpty().trim(),
    check('name', "Invalid name").not().isEmpty().trim(),
    check('designation', "Invalid designation").not().isEmpty().trim(),
]

exports.update=[
    check('image', "Invalid image").not().isEmpty().trim(),
    check('name', "Invalid name").not().isEmpty().trim(),
    check('designation', "Invalid designation").not().isEmpty().trim(),
]