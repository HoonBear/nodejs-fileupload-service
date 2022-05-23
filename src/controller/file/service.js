const user = require('../user/service');
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
            const userPoint = await user.readUserPoint(req.body.userIdx)
            const requirePoint = req.files["uploadImage"].length * 100;
            
            if(userPoint < requirePoint) throw new Error(0)
            else await user.updateUserPoint(req.body.userIdx, -requirePoint)
            //const { hashtagList } = req.body;

            const hashtagList = [
                ["사과","바나나","귤"],
                [],
                ["벤츠","비엠"]
            ]

            const insertIdList = res.locals.insertIdList;

            const insertIdListResult = insertIdList.map(async(id, index) => {
                if(hashtagList[index] != []){
                    const createHashtagResult = hashtagList[index].map(async(hashtag) => {
                        await mysqlExecutor(
                            await mysqlStatement.createHashtag(), [id, hashtag]
                        )
                    })
                    await Promise.all (createHashtagResult)
                }
            })

            await Promise.all(insertIdListResult)

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

exports.readHashtagRank = async(req, res, next) => {
    try{
        const readHashtagRankResult = await mysqlExecutor(
            await mysqlStatement.readHashtagRank(), []
        );

        return res.send(responseJson.success(responseCode.OK, "success", readHashtagRankResult))
    } catch (e) {
        console.error(e.message);
        return responseError(req, res, e.message);
    }
}