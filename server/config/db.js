// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Choose your database dialect
  }
);

sequelize.authenticate().then(() => {
  console.log('successful connection to mysql')
}).catch((err) => {
  console('there is some error => ', err);
})

const db = {};
db.User = require('../models/userModel')(sequelize, Sequelize);




db.User.sync()
  .then(() => {
    console.log('User table synced');
  })
  .catch((error) => {
    console.error('Error syncing User table:', error);
  });

module.exports = db;








