const express = require('express');
const router = express.Router();
const path = require('path')
const {
    getCourseVideos, getVideosById, createVideo, editVideo, deleteVideo, getVideoComments
} = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleWare')
const upload = require('../middleware/multerMiddleWare'); // Import the upload middleware


router.get('/videos/:courseId', getCourseVideos);
router.get('/video/:videoId', getVideosById);
router.get('/video/:videoId/comments', getVideoComments);
router.post('/videos/create', upload.single("image"), createVideo)
router.put('/videos/:videos/edit', editVideo)
router.delete('/videos/:videosId/delete', deleteVideo)



module.exports = router;