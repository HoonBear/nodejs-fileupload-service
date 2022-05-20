const express = require('express');
const router = express.Router();
const file = require('./service');

router.route('/')
    .post(file.createFile)
    .get(file.readFile)

module.exports = router;