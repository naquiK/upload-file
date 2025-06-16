const express = require('express');
const { route } = require('./router');
const authMiddleware = require('../middleware/auth-middleware');
const router = express.Router();

router.get('/get-home', authMiddleware , (req,res) => {
    const userInfo = req.userInfo;
    res.status(200).json({
        success:true,
        message:"Welcome to Home Page",
        data:userInfo
    });
})

module.exports = router;