const mysql = require('mysql');

// Prevent error
// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
exports.connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "mywebapp" // Add database name here
});