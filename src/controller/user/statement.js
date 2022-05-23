exports.test = async() => {
    return`
    SELECT * FROM TB_USER_LIST;
    `
}

exports.readUserPoint = async() => {
    return`
    SELECT * FROM TB_USER_LIST WHERE IDX = ?;
    `
}

exports.updateUserPoint = () => {
    return `
        UPDATE TB_USER_LIST SET
        POINT = POINT + ?
        WHERE IDX = ?
    `
}