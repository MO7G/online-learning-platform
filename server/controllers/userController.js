const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const { User } = require('../config/db')

// @desc  Get Goals
// @route Get /api/goals
// @access Public
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const imageBuffer = req.file.buffer; // Image buffer
    console.log(req.body);
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    const userExist = await User.findOne({
        where: {
            gmail: email,
        },
    });

    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.hash(password, 10);

    const user = await User.create({
        user_name: name,
        gmail: email,
        pass: salt,
        role: "student",
        image: imageBuffer, // Store the image buffer as BLOB data
    })


    // Convert BLOB data to Base64 encoding
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");

    if (user) {
        res.status(201).json({
            _id: user.user_id,
            name: user.user_name,
            role: user.role,
            img: imageBase64,
            token: generateJwt(user.user_id, user.role)
        })
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
});




// @desc  Post Goals
// @route Post /api/goals
// @access Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    const user = await User.findOne({
        where: {
            gmail: email
        }
    })
    // Convert BLOB data to Base64 encoding
    const imageBase64 = Buffer.from(user.image).toString("base64");
    if (user && (await bcrypt.compare(password, user.pass))) {
        res.status(201).json({
            _id: user.user_id,
            name: user.user_name,
            img: imageBase64,
            role: user.role,
            token: generateJwt(user.user_id, user.role)
        })
    } else {
        res.status(400);
        throw new Error("invalid Credentials");
    }

})


// @desc  Put Goals
// @route Put /api/goals/:id
// @access private
const profile = asyncHandler(async (req, res) => {
    const userData = await User.findOne({
        where: {
            user_id: req.user
        }
    })
    res.status(200).json({ message: `your id is ${userData.gmail}` });
})


const general = asyncHandler(async (req, res) => {
    const userData = await User.findOne({
        where: {
            user_id: req.user
        }
    })
    res.status(200).json({ message: `you are in my beloved` });
})

const generateJwt = ((id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
})



module.exports = {
    register,
    login,
    profile,
    general
};
