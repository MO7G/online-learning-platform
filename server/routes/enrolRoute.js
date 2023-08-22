
const express = require('express');
const router = express.Router();
const path = require('path')
const {
    insertEnrol, getEnrol
} = require('../controllers/enrolController');

const { protect } = require('../middleware/authMiddleWare')
const upload = require('../middleware/multerMiddleWare'); // Import the upload middleware

router.post('/insertEnrol/:userId', insertEnrol)
router.get('/getEnrol/:userId', getEnrol)
module.exports = router;

