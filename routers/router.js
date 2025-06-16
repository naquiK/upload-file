const express=require('express')
const {registration , login , changePassword} = require('../controllers/usercontroller')
const authMiddleware = require('../middleware/auth-middleware')
const router=express.Router()

router.post("/registration",registration)
router.post("/log-in" ,login)
router.post("/change-password",authMiddleware ,changePassword)

module.exports = router