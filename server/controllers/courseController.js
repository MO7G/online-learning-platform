const asyncHandler = require('express-async-handler')
const { db, sequelize } = require('../config/db.js')
const Course = db.Course
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
        const query = ` SELECT  courses.courseId,courses.courseName,courses.courseDescription,courses.coursedate, courses.numberofVideos,courses.TeacherID,courses.courseImage,
            user.user_id , user.image, user.user_name
            FROM courses
            JOIN user ON courses.teacherId = user.user_id where courses.courseId=:courseId;`

        let playlistDetails = await sequelize.query(query, {
            replacements: { courseId: courseId },
            type: sequelize.QueryTypes.SELECT
        });


        if (!playlistDetails) {
            return res.status(404).json({ message: 'Course not found' });
        }


        playlistDetails = playlistDetails[0]

        const courseImage = Buffer.from(playlistDetails.courseImage).toString("base64");
        const teacherImage = Buffer.from(playlistDetails.image).toString("base64");

        const finalplaylistDetails = {
            courseId: playlistDetails.courseId, // Change this to the appropriate field from your course model
            courseName: playlistDetails.courseName,
            description: playlistDetails.courseDescription,
            date: playlistDetails.coursedate,
            numOfVideos: playlistDetails.numberofVideos,
            teacherId: playlistDetails.user_id,
            teacherName: playlistDetails.user_name,
            teacherImage: teacherImage,
            courseImage: courseImage
            // Add more properties as needed
        };


        res.status(200).json(finalplaylistDetails);
    } catch (error) {
        // Handle error
        console.error(error)
        res.status(500).json({ message: 'Internal server error' });
    }
});


const getCourseTeacherInfo = asyncHandler(async (req, res) => {
    const courseId = req.params.courseId; // Assuming the route parameter is named 'id'
    const teacherId = req.params.teacherId;
    console.log("this is the course id ", courseId)
    console.log("this is the teahcer id ", teacherId);
    res.status(200).json({ message: "good connection to here" })
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
    deleteCourse,
    getCourseTeacherInfo
};
