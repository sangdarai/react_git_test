const mysql = require('mysql');
const db = mysql.createConnection({
    host : '180.67.126.84',
    user : 'root',
    password : 'leesj9249@',
    port : 3306,
    database: "mydb"
});

module.exports = db;


