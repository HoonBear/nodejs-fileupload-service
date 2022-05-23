const responseCode = require('../../core/responseCode');
const responseJson = require('../../core/responseJson');
const responseError = require('../../core/responseError');
const mysqlExecutor = require('../../model/mysqlExeutor');
const mysqlStatement = require('./statement');

exports.readUserPoint = async(userIdx) => {
    try{
        const readUserPointResult = await mysqlExecutor(
            await mysqlStatement.readUserPoint(), [userIdx]
        );

        return readUserPointResult[0].POINT
    } catch(e) {
        console.error(e)
        throw new Error(e)
    }
}

exports.updateUserPoint = async(userIdx, point) => {
    try{
        await mysqlExecutor(
            await mysqlStatement.updateUserPoint(), [point, userIdx]
        );
    } catch(e) {
        console.error(e)
        throw new Error(e)
    }
}

exports.test = async(req, res) => {
    try{
        const { userCd } = req.query;

        const test = await mysqlExecutor(
            await mysqlStatement.test(), [userCd]
        );
        return res.send(responseJson.success(responseCode.OK, "success", test))
    } catch (e) {
        console.error(e.message);
        return responseError(req, res, e.message);
    }
}