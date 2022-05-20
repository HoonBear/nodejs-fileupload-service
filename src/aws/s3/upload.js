const mysqlExecutor = require('../../model/mysqlExeutor');
const mysqlStatement = require('./statement');
const s3 = require('../s3/config');

exports.createFile = (params, fileType = 'image') => {
    let fileList = [];

    if (typeof params === 'string') {
        fileList = [{ name: params }];
    } else if (Array.isArray(params)) {
        params.forEach(fields => fileList.push({ name: fields }));
    } else {
        throw new Error('The type of \'params\' value is invalid.');
    }
    
    return [
        s3.fileUpload(fileType).fields(fileList),
        async (req, res, next) => {
            try {
                const userIdx = req.body.userIdx;
                const folderIdx = req.body.folderIdx;
                const uploadFileList = req.files[params];

                uploadFileList.forEach(async(file) => {
                    await mysqlExecutor(
                        await mysqlStatement.createFile(),
                        [userIdx, folderIdx, file.originalname, file.key, file.location, file.mimetype]
                    );
                    await s3.tmpFileMove(file.key, fileType)
                    await s3.tmpFileDelete(file.key, fileType)
                })
                next();
            } catch (e) {
                console.error(e)
            }
        }
    ]
}