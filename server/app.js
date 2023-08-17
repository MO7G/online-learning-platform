const express = require('express');
const cors = require('cors'); // Require the cors middleware
const dbConnection = require('./config/db'); // Adjust the path based on your file structure
const { errorHandler } = require('./middleware/errorMiddleWare')

require('dotenv').config();
const port = process.env.PORT || 5000
const app = express()





app.use(cors('http://localhost:3001'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/course', require('./routes/courseRoute'))
app.use('/api/videos', require('./routes/videoRoute'))

app.use(errorHandler);



app.listen(port, () => console.log(`Servere started on port ${port}`))
