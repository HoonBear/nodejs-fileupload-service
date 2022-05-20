const responseCode = require('../../core/responseCode');
const responseJson = require('../../core/responseJson');
const responseError = require('../../core/responseError');
const mysqlExecutor = require('../../model/mysqlExeutor');
const mysqlStatement = require('./statement');
const s3 = require('../../aws/s3/upload')

exports.createFile = [
    s3.createFile('uploadImage', 'image'),
    async(req, res, next) => {
        try{
            return res.send(responseJson.success(responseCode.OK, "success", []))
        } catch (e) {
            console.error(e.message);
            return responseError(req, res, e.message);
        }
    }
]

exports.readFile = async(req, res, next) => {
    try{
        const { userIdx, folderIdx } = req.query;

        const readFileResult = await mysqlExecutor(
            await mysqlStatement.readFile(),
            [ userIdx, folderIdx]
        );

        return res.send(responseJson.success(responseCode.OK, "success", readFileResult))
    } catch (e) {
        console.error(e.message);
        return responseError(req, res, e.message);
    }
}