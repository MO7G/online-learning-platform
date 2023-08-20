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
    res.status(200).json({ message: 'done here from get facts' });
});

module.exports = {
    getReviews,
    getFacts
};
