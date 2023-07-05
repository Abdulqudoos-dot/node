const express = require('express')
const router = express.Router()
const { protect } = require("../middleware/auth")
const { register, login, me } = require('../controller/auth')
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect, me)

module.exports = router