
const express = require('express');
const router = express.Router();
const path = require('path')
const {
    register, login, profile, general
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleWare')
const upload = require('../middleware/multerMiddleWare'); // Import the upload middleware

router.post('/register', upload.single("image"), register)
router.post('/login', login);
router.get('/profile', protect, profile)
router.get('/general', protect, general)


module.exports = router;
