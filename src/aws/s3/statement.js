exports.createFile = () => {
    return `
    INSERT INTO TB_FILE_LIST (
        USER_IDX, FOLDER_IDX, ORG_FILE_NM, UPLOAD_FILE_NM, ORG_PATH, TYPE
    ) VALUES (
        ?, ?, ?, ?, ?, ?
    );
    `
}