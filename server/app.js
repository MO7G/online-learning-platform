const express = require('express');
const cors = require('cors'); // Require the cors middleware
const dbConnection = require('./config/db'); // Adjust the path based on your file structure

require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to match your React app's URL
  credentials: true // Allow credentials
}));


app.get('/', (req, res) => {
  const statusData = {
    message: 'one asdf slash only',
    timestamp: new Date(),
  };

  res.json(statusData);
});


app.get('/status', (req, res) => {
  const statusData = {
    message: 'I love being with you',
    timestamp: new Date(),
  };

  res.json(statusData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 