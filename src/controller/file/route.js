const express = require('express');
const router = express.Router();
const file = require('./service');

router.route('/')
    .post(file.createFile)
    .get(file.readFile)

router.route('/hashtag/rank')
    .get(file.readHashtagRank)
module.exports = router;