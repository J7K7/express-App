function getOffset(currentPage = 1, listPerPage = null) {
    if (listPerPage === null) {
        return 0;
    }
    return (currentPage - 1) * listPerPage;
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

module.exports = {
    getOffset,
    emptyOrRows
}