const config = {
    db: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "mydb",
        waitForConnections: true,
        connectTimeout: 60000,
        queueLimit: 0,
    },
    listPerPage: null,
};

module.exports = config;
