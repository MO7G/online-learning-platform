const asyncHandler = require('express-async-handler')
const { Course } = require('../config/db')

// @desc  Get Goals
// @route Get /api/goals
// @access Public
const ListAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.findAll();

    // Convert BLOB data to Base64 encoding for each course
    const coursesWithImages = courses.map(course => {
        const imageBase64 = Buffer.from(course.courseImage).toString("base64");
        return {
            _id: course.courseId, // Change this to the appropriate field from your course model
            name: course.courseName,
            description: course.courseDescription,
            date: course.coursedate,
            numOfVideos: course.numberofVideos,
            img: imageBase64,
            // Add more properties as needed
        };
    });

    res.status(200).json(coursesWithImages);
});





// @desc  Post Goals
// @route Post /api/goals
// @access Public
const getCourseById = asyncHandler(async (req, res) => {
    const courseId = req.params.courseId; // Assuming the route parameter is named 'id'
    console.log(courseId)
    try {
        const course = await Course.findByPk(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const imageBase64 = Buffer.from(course.courseImage).toString("base64");
        const courseWithImage = {
            _id: course.courseId, // Change this to the appropriate field from your course model
            name: course.courseName,
            description: course.courseDescription,
            date: course.coursedate,
            numOfVideos: course.numberofVideos,
            img: imageBase64,
            // Add more properties as needed
        };

        res.status(200).json(courseWithImage);
    } catch (error) {
        // Handle error
        res.status(500).json({ message: 'Internal server error' });
    }
});



// @desc  Put Goals
// @route Put /api/goals/:id
// @access private
const createCourse = asyncHandler(async (req, res) => {
    const userData = await User.findOne({
        where: {
            user_id: req.user
        }
    })
    res.status(200).json({ message: `your id is ${userData.gmail}` });
})


const editCourse = asyncHandler(async (req, res) => {
    const userData = await User.findOne({
        where: {
            user_id: req.user
        }
    })
    res.status(200).json({ message: `you are in my beloved` });
})


const deleteCourse = asyncHandler(async (req, res) => {
    const userData = await User.findOne({
        where: {
            user_id: req.user
        }
    })
    res.status(200).json({ message: `you are in my beloved` });
})






module.exports = {
    ListAllCourses,
    getCourseById,
    createCourse,
    editCourse,
    deleteCourse
};
