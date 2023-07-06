const express = require('express')
const router = express.Router()
const { protect } = require("../middleware/auth")
const { register, login, me, forgotpassword } = require('../controller/auth')
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect, me)
router.route('/forgotpassword').post(forgotpassword)

module.exports = router