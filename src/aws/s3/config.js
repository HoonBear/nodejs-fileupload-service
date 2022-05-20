const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require("path");                                     //file upload path module
AWS.config.loadFromPath(__dirname.substr(0, __dirname.length - 3) + "/awscredential.json");

const s3 = new AWS.S3({
    params: { Bucket: "nodefileuploadservice" }
});

const validateFileType = fileType => {
    const fileTypeNormalize = fileType.toLowerCase();
    switch (fileTypeNormalize) {
        case 'document':
        case 'image':
            break;
        default:
            throw new Error('The value of \'fileType\' is not valid.');
    }
    return fileTypeNormalize + 's';
}

exports.fileUpload = (fileType = 'document') => {
    const filePath = validateFileType(fileType);
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: `nodefileuploadservice/${filePath}/tmp`,
            key: (req, file, cb) => {
                let extension = path.extname(file.originalname);
                cb(null, Date.now().toString() + extension)
            },
            acl: 'public-read-write',
        })
    });
}

exports.tmpFileMove = (tmpImgName, fileType = 'document') => {
    const filePath = validateFileType(fileType);
    return new Promise((resolve, reject) => {
        s3.copyObject({
            Bucket: `nodefileuploadservice/${filePath}/origin`,
            CopySource: `nodefileuploadservice/${filePath}/tmp/` + tmpImgName,
            Key: tmpImgName
        }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

exports.tmpFileDelete = (tmpImgName, fileType = 'document') => {
    const filePath = validateFileType(fileType);
    return new Promise((resolve, reject) => {
        s3.deleteObject({
            Bucket: `nodefileuploadservice/${filePath}/tmp`,
            Key: tmpImgName
        }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}