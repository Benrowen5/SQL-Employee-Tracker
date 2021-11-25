const mysql = require('mysql2');
require('dotenv').config();

// connect to mysql database
const db = mysql.createConnection(
    {
        // server connection details
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    },
    console.log("Connected to the employees database")
);

module.exports = db;