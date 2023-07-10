const express = require('express')
const app = express()
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advanceResults')
// const { protect } = require("../middleware/auth")
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controller/users')
const User = require('../models/User')
router.use(protect)
router.use(authorize('admin'))
router.route('/').get(advancedResults(User), getUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)




module.exports = router