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
    logging: false, // no logs will be printed in the terminal 
  }
);

sequelize.authenticate().then(() => {
  console.log('successful connection to mysql')
}).catch((err) => {
  console('there is some error => ', err);
})

const db = {};
db.User = require('../models/userModel')(sequelize, Sequelize);
db.Course = require('../models/courseModel')(sequelize, Sequelize);
db.Videos = require('../models/videoModel')(sequelize, Sequelize);
db.Interactions = require('../models/interactionModel')(sequelize, Sequelize);
db.Enrol = require('../models/enrolModel')(sequelize, Sequelize);


db.Enrol.sync()
  .then(() => {
    console.log('Enrol table synced');
  })
  .catch((error) => {
    console.error('Error syncing User table:', error);
  });

db.User.sync()
  .then(() => {
    console.log('User table synced');
  })
  .catch((error) => {
    console.error('Error syncing User table:', error);
  });

db.Course.sync()
  .then(() => {
    console.log('course table synced');
  })
  .catch((error) => {
    console.error('Error syncing User table:', error);
  });

db.Videos.sync()
  .then(() => {
    console.log('video table synced');
  })
  .catch((error) => {
    console.error('Error syncing User table:', error);
  });

db.Interactions.sync()
  .then(() => {
    console.log('Interaction table synced');
  })
  .catch((error) => {
    console.error('Error syncing User table:', error);
  });
module.exports = { db, sequelize }; // Export both db and sequelize









