const express = require('express')
const router = express.Router({ mergeParams: true })
const { getCourses, getCourse, addCourse } = require('../controller/courses')
router.route('/').get(getCourses).post(addCourse)
router.route('/:id').get(getCourse)


// router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius)
module.exports = router