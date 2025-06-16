const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/auth-admin-middleware');
const upload = require('../middleware/upload-middleware');

const { uploadImage, getImages, deleteImage } = require('../controllers/imageContoller');

const router = express.Router();


router.post('/upload-image', authMiddleware, adminMiddleware, upload.single('image'), uploadImage);

// Fetch all images
router.get('/images', authMiddleware, getImages);

// Delete an image 
router.delete('/images/:id', authMiddleware, adminMiddleware, deleteImage);

module.exports = router;
