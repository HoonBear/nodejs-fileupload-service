exports.createFolder = () => {
    return`
    INSERT INTO TB_FOLDER_LIST (
        USER_IDX, NAME
    ) VALUES (
        ?, ?
    )
    `
}

exports.readFile = () => {
    return`
    SELECT TB_FILE_LIST.IDX, CAST(TB_FILE_LIST.REG_DATETIME AS CHAR) AS REG_DATETIME, TB_FILE_LIST.FOLDER_IDX, TB_FILE_LIST.ORG_PATH, TB_FILE_LIST.TYPE

    FROM TB_FILE_LIST

    WHERE TB_FILE_LIST.BUSE = 1
    AND TB_FILE_LIST.USER_IDX = ?
    AND TB_FILE_LIST.FOLDER_IDX = ?

    ORDER BY REG_DATETIME DESC
    `
}

exports.createHashtag = () => {
    return`
    INSERT INTO TB_HASHTAG_LIST (
        FILE_IDX, HASHTAG
    ) VALUES (
        ?, ?
    );
    `
}

exports.readHashtagRank = () => {
    return `
    SELECT HASHTAG_LIST.HASHTAG, HASHTAG_LIST.HASHTAG_CNT, RANK() OVER (ORDER BY HASHTAG_LIST.HASHTAG DESC) AS RANKING

    FROM (
        SELECT HASHTAG, COUNT(*) HASHTAG_CNT

        FROM TB_HASHTAG_LIST

        WHERE TB_HASHTAG_LIST.BUSE = 1

        GROUP BY HASHTAG
    ) HASHTAG_LIST

    LIMIT 10
    `
}