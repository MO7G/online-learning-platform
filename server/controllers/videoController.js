const asyncHandler = require('express-async-handler')
const { Videos } = require('../config/db')

// @desc  Get Goals
// @route Get /api/goals
// @access Public
const getCourseVideos = asyncHandler(async (req, res) => {
    const courseId = req.params.courseId; // Get the courseId from the request params

    // Fetch videos that are associated with the given courseId
    const videos = await Videos.findAll({
        where: {
            courseId: courseId
        }
    });

    // Convert BLOB data to Base64 encoding for each video
    const videosWithImages = videos.map(video => {
        const imageBase64 = Buffer.from(video.image).toString("base64");
        return {
            _id: video.videoId, // Change this to the appropriate field from your video model
            name: video.videoName,
            link: video.videoLink,
            date: video.videoDate,
            description: video.description,
            likes: video.likes_counter,
            img: imageBase64,
            // Add more properties as needed
        };
    });

    res.status(200).json(videosWithImages);

});






// @desc  Post Goals
// @route Post /api/goals
// @access Public
const getVideosById = asyncHandler(async (req, res) => {
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
const createVideo = asyncHandler(async (req, res) => {
    const userData = await User.findOne({
        where: {
            user_id: req.user
        }
    })
    res.status(200).json({ message: `your id is ${userData.gmail}` });
})


const editVideo = asyncHandler(async (req, res) => {
    const userData = await User.findOne({
        where: {
            user_id: req.user
        }
    })
    res.status(200).json({ message: `you are in my beloved` });
})


const deleteVideo = asyncHandler(async (req, res) => {
    const userData = await User.findOne({
        where: {
            user_id: req.user
        }
    })
    res.status(200).json({ message: `you are in my beloved` });
})





module.exports = {
    getCourseVideos,
    getVideosById,
    createVideo,
    editVideo,
    deleteVideo
};
