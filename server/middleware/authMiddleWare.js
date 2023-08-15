const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const { User } = require('../config/db')

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.id
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = {
    protect
};
