const express = require('express');
const router = express.Router();

const userRoute = require('./controller/user/route');
const folderRoute = require('./controller/folder/route');
const fileRoute = require('./controller/file/route');

router.use('/user', userRoute);
router.use('/folder', folderRoute);
router.use('/file', fileRoute);

module.exports = router;