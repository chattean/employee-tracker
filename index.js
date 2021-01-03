// requiring the need libraries  
require("console.table");                   // to format the rows nicely 
const mysql = require("mysql2/promise");    // to connect to the DB 

const connect = (() => {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "employees",
        message: "DB Connected"
    });
});

