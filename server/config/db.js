const mysql = require('mysql');

const dbConfig = {
  host: 'root',
  user: 'asdf',
  password: 'your-password',
  database: 'your-database',
};

const dbConnection = mysql.createConnection(dbConfig);
dbConnection.connect((err) => {

  if (err) { 
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the database');
  }
});
 
module.exports = dbConnection;
 