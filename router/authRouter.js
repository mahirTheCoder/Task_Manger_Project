const express = require('express')
const router = express.Router()
 const authController = require('../controllers/authController')
const { verify } = require('crypto')

router.post('/register', authController.register)
router.post('/verifyOTP', authController.verifyOTP)


module.exports = router