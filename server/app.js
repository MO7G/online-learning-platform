const express = require('express');
const dbConnection = require('./config/db'); // Adjust the path based on your file structure

require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 