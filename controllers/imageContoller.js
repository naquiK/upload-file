const Image = require('../models/imageModel');
const uploadFile = require('../helper/cloudinaryHelper');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

// Upload Image Function
const uploadImage = async (req, res) => {
    try {
        const file = req.file;

        // Checking if the file is present
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a file",
            });
        }

        // Upload file to Cloudinary
        const { url, publicId } = await uploadFile(file.path);

        // Save image details to the database
        const image = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userID,
        });

        await image.save();

        // Delete file from local storage
        fs.unlinkSync(file.path);

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            image,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Get All Images Function
const getImages = async (req, res) => {
    try {
        const page= parseInt(req.query.page) || 1
        const limit=parseInt(req.query.limit)|| 5
        const skip=(page-1)*limit

        const sortBy=req.query.sortBy || 'createdAt'
        const sortOrder=req.query.sortOrder==='asy' ?1:-1

        const totalImages= await Image.countDocuments()
        const totalPages=Math.ceil(totalImages/limit)
        
        const sortObj={}
        sortObj[sortBy]=sortOrder

        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        res.status(200).json({
            success: true,
            currentPage:page,
            totalPages,
            totalImages,
            data: images,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Delete Image Function
const deleteImage = async (req, res) => {
    try {
        const imageId = req.params.id;
        const userId = req.userInfo.userID;

        // Find the image by ID
        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }

        // Check if the logged-in user is the owner of the image
        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this image"
            });
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        // Delete from database
        await Image.findByIdAndDelete(imageId);

        res.status(200).json({
            success: true,
            message: "Image deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Export functions properly
module.exports = {
    uploadImage,
    getImages,
    deleteImage
};
