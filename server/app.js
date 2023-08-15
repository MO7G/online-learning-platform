const express = require('express');
const cors = require('cors'); // Require the cors middleware
const dbConnection = require('./config/db'); // Adjust the path based on your file structure
const { errorHandler } = require('./middleware/errorMiddleWare')
require('dotenv').config();
const port = process.env.PORT || 5000
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use(errorHandler);




app.listen(port, () => console.log(`Servere started on port ${port}`))
