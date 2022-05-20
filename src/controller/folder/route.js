const express = require('express');
const router = express.Router();
const folder = require('./service');

router.route('/')
    .post(folder.createFolder)
    .get(folder.readFolder)

module.exports = router;