const asyncHandler = require('express-async-handler')
const { Interactions } = require('../config/db')
const { db, sequelize } = require('../config/db.js')
const Videos = db.Videos
const Interaction = db.Interactions
// @desc  Get Goals
// @route Get /api/goals
// @access Public
const getCourseVideos = asyncHandler(async (req, res) => {
    const courseId = req.params.courseId; // Get the courseId from the request params

    // Fetch videos that are associated with the given courseId
    const videos = await Videos.findAll({
        where: {
            courseIdFk: courseId
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
    const videoId = req.params.videoId;

    try {
        const video = await Videos.findByPk(videoId, {
            attributes: { exclude: ['image'] } // Exclude the 'image' property from the result
        });

        res.status(200).json(video);
    } catch (error) {
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

const getVideoComments = asyncHandler(async (req, res) => {
    const videoId = req.params.videoId;
    try {
        const query = `
            SELECT user.user_id, interaction.InteractionID, user.image , user.user_name, interaction.comment, interaction.InteractionDate
            FROM user
            JOIN interaction ON interaction.StudentID = user.user_id
            WHERE interaction.videoid = :videoId
        `;


        const query1 = `SELECT COUNT(*) as rowCount
FROM user
JOIN interaction ON interaction.StudentID = user.user_id
WHERE interaction.videoid = :videoId;
`;

        const comments = await sequelize.query(query, {
            replacements: { videoId: videoId },
            type: sequelize.QueryTypes.SELECT
        });

        const numberOfComments = await sequelize.query(query1, {
            replacements: { videoId: videoId },
            type: sequelize.QueryTypes.SELECT
        });



        // Convert BLOB data to Base64 encoding for each video
        const commentsWithPics = comments.map(comment => {
            const imageBase64 = Buffer.from(comment.image).toString("base64");
            return {
                user_id: comment.user_id, // Change this to the appropriate field from your video model
                user_name: comment.user_name,
                comment: comment.comment,
                InteractionID: comment.InteractionID,
                InteractionDate: comment.InteractionDate,
                image: imageBase64,
                // Add more properties as needed
            };
        });

        const finalData = {
            comments: commentsWithPics,
            numberOfComments: numberOfComments
        }


        res.status(200).json(finalData);
    } catch (error) {
        console.error(error); // Print the error to the console
        res.status(500).json({ message: 'Internal sad erver error' });
    }
});



const deleteComment = asyncHandler(async (req, res) => {
    const interactionId = req.params.interactionId;

    // Check if the comment exists
    const interaction = await Interaction.findByPk(interactionId);
    if (!interaction) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    console.log("-----------------------------------------------------")
    console.log("-----------------------------------------------------")
    console.log("-----------------------------------------------------")
    console.log("-----------------------------------------------------")
    console.log(interaction)

    // Delete the comment
    await interaction.destroy();
    res.status(200).json({ message: 'Comment deleted successfully' });
});



const addComment = asyncHandler(async (req, res) => {
    const courseId = req.body.courseId;
    const userId = req.body.userId;
    const comment = req.body.comment;
    const videoId = req.body.videoId;

    try {
        // Create a new interaction record with the provided data
        const newInteraction = await Interaction.create({
            CourseID: courseId,
            StudentID: userId,
            comment: comment,
            videoid: videoId,
            InteractionDate: new Date(), // You can use the current date/time
        });

        const interactionId = newInteraction.InteractionID; // Get the interaction ID

        console.log(`Comment added by ${userId} for course ${courseId}`);
        res.status(200).json({ message: `Comment added by ${userId} for course ${courseId}`, interactionId: interactionId });
    } catch (error) {
        // Handle error
        res.status(500).json({ message: 'Error adding comment' });
    }
});


module.exports = addComment;




module.exports = {
    getCourseVideos,
    getVideosById,
    createVideo,
    editVideo,
    deleteVideo,
    getVideoComments,
    deleteComment,
    addComment
};
