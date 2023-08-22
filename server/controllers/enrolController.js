const { query } = require('express');
const asyncHandler = require('express-async-handler')
const { db, sequelize } = require('../config/db.js')
const Enrollment = db.Enrol
// @desc  Get Goals
// @route Get /api/goals
// @access Public
const insertEnrol = asyncHandler(async (req, res) => {
    const { courseId, userId } = req.body;

    try {
        const enrollment = await Enrollment.create({
            CourseID: courseId,
            StudentID: userId,
            EnrollmentDate: new Date(),
        });

        res.status(201).json({ message: 'Enrollment created successfully', enrollment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating enrollment' });
    }
});




const getEnrol = asyncHandler(async (req, res) => {
    const userId = req.params.userId; // Assuming the route parameter is named 'userId'

    const query = `
        SELECT
            courses.courseId
        FROM enrollment
        INNER JOIN courses ON enrollment.CourseID = courses.courseId
        WHERE enrollment.StudentID = :userId
    `;

    try {
        const enrollments = await sequelize.query(query, {
            replacements: { userId },
            type: sequelize.QueryTypes.SELECT,
        });

        res.status(200).json(enrollments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching enrollments' });
    }
});

module.exports = getEnrol;




module.exports = getEnrol;



module.exports = {
    insertEnrol,
    getEnrol
};
