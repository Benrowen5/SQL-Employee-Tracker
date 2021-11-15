const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
    {
        // server connection details
        host: 'localhost',
        user: 'root',
        password: 'r00t',
        database: 'employees'
    },
    console.log("Connected to the employees database")
);