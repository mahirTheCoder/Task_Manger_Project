const express = require('express')
const router = express.Router()
const authControler = require('../controllers/authController')

router.post('/register', authControler.register)





module.exports = router