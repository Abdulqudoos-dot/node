const express = require('express')
const router = express.Router()
const { protect } = require("../middleware/auth")
const { register, login, me, forgotpassword, updateUser, updateUserPassword, logout } = require('../controller/auth')
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect, me)
router.route('/logout').get(protect, logout)
router.route('/forgotpassword').post(forgotpassword)
router.route('/updateuser').put(protect, updateUser)
router.route('/updateuserpassword').put(protect, updateUserPassword)

module.exports = router