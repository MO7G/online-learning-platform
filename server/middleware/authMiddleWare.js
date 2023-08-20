const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { User } = require('../config/db');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded.id;
            next();
        } catch (error) {
            console.log(error);
            // token here is expired
            res.status(401).json({ message: 'Not authorized dude' }); // Send a JSON response
            // Or you can use res.sendStatus(401); to send only the status code
        }
    } else {
        return res.status(403).json({ message: 'Not authorized, no token' }); // Send a JSON response
        // Or you can use res.sendStatus(403); to send only the status code
    }
});

module.exports = {
    protect
};
