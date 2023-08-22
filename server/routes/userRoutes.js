
const express = require('express');
const router = express.Router();
const path = require('path')
const {
    numOfUsers, register, login, profile, general, getTeacherProfile, getTeacherCourses, getAllTeachers,
    getAllVideosCounter
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleWare')
const upload = require('../middleware/multerMiddleWare'); // Import the upload middleware

router.get('/', numOfUsers)
router.post('/register', upload.single("image"), register)
router.post('/login', login);
router.get('/profile', protect, profile)
router.get('/general', protect, general)
router.get('/user/teacherProfile/:teacherId', getTeacherProfile);
router.get('/user/allTeachers', getAllTeachers);
router.get('/user/getAllVideosCounter/:teacherId', getAllVideosCounter
);

router.get('/user/teacherCourses/:teacherId', getTeacherCourses);
router.get('/validateToken', protect, (req, res) => {
    res.json({ isValid: true });
});

module.exports = router;
