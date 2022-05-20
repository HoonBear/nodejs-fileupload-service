const responseCode = require('../../core/responseCode');
const responseJson = require('../../core/responseJson');
const responseError = require('../../core/responseError');
const mysqlExecutor = require('../../model/mysqlExeutor');
const mysqlStatement = require('./statement');

exports.createFolder = async(req, res, next) => {
    try{
        const { userIdx, folderName } = req.body;

        const createFolderResult = await mysqlExecutor(
            await mysqlStatement.createFolder(), [userIdx, folderName]
        );

        return res.send(responseJson.success(responseCode.OK, "success", createFolderResult))
    } catch (e) {
        console.error(e.message);
        return responseError(req, res, e.message);
    }
}

exports.readFolder = async(req, res, next) => {
    try{
        const { userIdx } = req.query;

        const readFolderResult = await mysqlExecutor(
            await mysqlStatement.readFolder(), [userIdx]
        );

        return res.send(responseJson.success(responseCode.OK, "success", readFolderResult))
    } catch (e) {
        console.error(e.message);
        return responseError(req, res, e.message);
    }
}