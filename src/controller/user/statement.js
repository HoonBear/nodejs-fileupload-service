exports.test = async() => {
    return`
    SELECT * FROM TB_USER_LIST;
    `
}

exports.updateUserPoint = () => {
    return `
        UPDATE TB_USER_LIST SET
        POINT = POINT + ?
        WHERE IDX = ?
    `
}