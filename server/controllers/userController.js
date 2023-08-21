const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const { db, sequelize } = require('../config/db.js')
const User = db.User

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


    const user = await User.create({
        user_name: name,
        gmail: email,
        pass: password,
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

    console.log("from the login here ");
    const user = await User.findOne({
        where: {
            gmail: email
        }
    });

    if (user && password === user.pass) {
        // Convert BLOB data to Base64 encoding
        const imageBase64 = Buffer.from(user.image).toString("base64");

        res.status(201).json({
            _id: user.user_id,
            name: user.user_name,
            img: imageBase64,
            role: user.role,
            token: generateJwt(user.user_id, user.role)
        });
    } else if (user) {
        // User exists but password is incorrect
        res.status(400);
        throw new Error("Invalid Credentials");
    } else {
        // User does not exist
        res.status(400);
        throw new Error("User not found");
    }
});


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


const numOfUsers = asyncHandler(async (req, res) => {
    const studentCount = await User.count({
        where: {
            role: 'student'
        }
    });
    res.status(200).json({ studentCount });
});


const generateJwt = ((id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
})


const getTeacherProfile = asyncHandler(async (req, res) => {
    const teacherId = req.params.teacherId;

    const query = `
        SELECT
            u.image,
            u.user_name,
            COUNT(DISTINCT c.courseId) AS num_courses,
            SUM(v.likes_counter) AS total_likes,
            COUNT(i.InteractionID) AS total_comments
        FROM user u
        LEFT JOIN courses c ON u.user_id = c.TeacherID
        LEFT JOIN videos v ON c.courseId = v.courseIdFk
        LEFT JOIN interaction i ON v.videoId = i.videoid
        WHERE u.user_id = :teacherId AND u.role = 'teacher'
        GROUP BY u.user_id
    `;

    try {
        const teacherProfile = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { teacherId: teacherId }
        });

        teacherProfile.forEach(profile => {
            const userImage = Buffer.from(profile.image).toString("base64");
            profile.image = userImage;
        });

        res.status(200).json(teacherProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching teacher profile' });
    }
});

const getTeacherCourses = asyncHandler(async (req, res) => {
    const teacherId = req.params.teacherId;

    const query = `
        SELECT
            c.courseId,
            c.courseName,
            c.courseImage,
            c.createdAt,
            c.numberofVideos
        FROM user u
        JOIN courses c ON u.user_id = c.TeacherID
        WHERE u.role = 'teacher' AND u.user_id = :teacherId
    `;

    try {
        const teacherCourses = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { teacherId: teacherId }
        });

        teacherCourses.forEach(course => {
            const courseImage = Buffer.from(course.courseImage).toString("base64");
            course.courseImage = courseImage;
        });

        res.status(200).json(teacherCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching teacher courses' });
    }
});



module.exports = {
    register,
    login,
    profile,
    general,
    numOfUsers,
    getTeacherProfile,
    getTeacherCourses
};
