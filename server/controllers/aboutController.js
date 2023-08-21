const { query } = require('express');
const asyncHandler = require('express-async-handler')
const { db, sequelize } = require('../config/db.js')
const Course = db.Course
// @desc  Get Goals
// @route Get /api/goals
// @access Public
const getReviews = asyncHandler(async (req, res) => {
    const query = `SELECT u.user_name,u.image
FROM interaction i
JOIN user u ON i.StudentID = u.user_id
ORDER BY i.InteractionID ASC
LIMIT 6;`

    let Reviews = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
    });

    // console.log(Reviews)
    // Convert BLOB data to Base64 encoding for each course
    const finalReviews = Reviews.map(user => {
        const imageBase64 = Buffer.from(user.image).toString("base64");
        return {
            userName: user.user_name,
            userImage: imageBase64
        };
    });
    res.status(200).json(finalReviews);
});


const getFacts = asyncHandler(async (req, res) => {
    try {
        const query1 = `SELECT COUNT(courseId) as courseCount FROM courses;`;
        const query2 = `SELECT COUNT(user_id) as teacherCount FROM user WHERE role = 'teacher';`;
        const query3 = `SELECT COUNT(user_id) as studentCount FROM user WHERE role = 'student';`;

        const [courseResult, teacherResult, studentResult] = await Promise.all([
            sequelize.query(query1, { type: sequelize.QueryTypes.SELECT }),
            sequelize.query(query2, { type: sequelize.QueryTypes.SELECT }),
            sequelize.query(query3, { type: sequelize.QueryTypes.SELECT })
        ]);

        const facts = {
            numberOfCourses: courseResult[0].courseCount,
            numberOfTeachers: teacherResult[0].teacherCount,
            numberOfStudents: studentResult[0].studentCount
        };

        res.status(200).json(facts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching facts' });
    }
});


module.exports = {
    getReviews,
    getFacts
};
