const express = require('express')
const router = express.Router()
const { getBootcamps, getBootcamp, creatBootcamp, updateBootcamp, delBootcamp } = require('../controller/bootcamps')
router.route('/').get(getBootcamps).post(creatBootcamp)

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(delBootcamp)

module.exports = router