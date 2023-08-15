const mysql = require('mysql2');
require('dotenv').config();
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
