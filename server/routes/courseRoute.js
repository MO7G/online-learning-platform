const express = require('express');
const router = express.Router();
const path = require('path')
const {
    ListAllCourses, getCourseById, createCourse, editCourse, deleteCourse, getCourseTeacherInfo
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleWare')
const upload = require('../middleware/multerMiddleWare'); // Import the upload middleware

router.get('/courses', ListAllCourses)
router.get('/courses/:courseId', getCourseById);
router.get('/courses/:courseId/:teacherId', getCourseTeacherInfo);
router.post('/courses/create', upload.single("image"), createCourse)
router.put('/courses/:courseId/edit', editCourse)
router.delete('/courses/:courseId/delete', deleteCourse)


module.exports = router;
