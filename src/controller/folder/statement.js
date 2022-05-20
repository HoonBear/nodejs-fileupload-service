exports.createFolder = () => {
    return`
    INSERT INTO TB_FOLDER_LIST (
        USER_IDX, NAME
    ) VALUES (
        ?, ?
    )
    `
}

exports.readFolder = () => {
    return `
    SELECT TB_FOLDER_LIST.IDX, TB_FOLDER_LIST.USER_IDX,
        CAST(TB_FOLDER_LIST.REG_DATETIME AS CHAR) AS REG_DATETIME, TB_FOLDER_LIST.NAME,
        FILE_CNT.FILE_CNT

    FROM TB_FOLDER_LIST

    INNER JOIN (
        SELECT FOLDER_IDX, COUNT(*) AS FILE_CNT
        
        FROM TB_FILE_LIST
        
        WHERE BUSE = 1
        
        GROUP BY FOLDER_IDX
    )AS FILE_CNT
    ON TB_FOLDER_LIST.IDX = FILE_CNT.FOLDER_IDX

    WHERE TB_FOLDER_LIST.USER_IDX = ?
    AND TB_FOLDER_LIST.BUSE = 1

    ORDER BY TB_FOLDER_LIST.REG_DATETIME ASC
    `
}