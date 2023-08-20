
const express = require('express');
const router = express.Router();
const path = require('path')
const {
    getReviews, getFacts
} = require('../controllers/aboutController');
const { protect } = require('../middleware/authMiddleWare')
const upload = require('../middleware/multerMiddleWare'); // Import the upload middleware

router.get('/reviews', getReviews)
router.get('/facts', getFacts)
module.exports = router;

