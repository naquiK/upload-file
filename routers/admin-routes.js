const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminAuth = require('../middleware/auth-admin-middleware');
const router = express.Router();   

router.get('/admin-dashboard',authMiddleware, adminAuth , (req,res) => {
    res.status(200).json({
        success:true,
        message:"Welcome to Admin Dashboard"
    });
})

module.exports = router;