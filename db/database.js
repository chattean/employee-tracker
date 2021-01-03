const mysql = require("mysql2/promise");    // to connect to the DB 

const connection = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '',
    database: 'employees'
  });

//   const connect(err => {
//     if (err) throw err;
//     console.log('connected as id ' + connection.threadId);
//   });
  
 module.exports = {connect: () => connection, end: async () => (await connection).end()};