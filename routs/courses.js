const express = require('express')
const router = express.Router({ mergeParams: true })
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controller/courses')
const { protect } = require('../middleware/auth')
router.route('/').get(getCourses).post(protect, addCourse)
router.route('/:id').get(getCourse).put(protect, updateCourse).delete(protect, deleteCourse)


// router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius)
module.exports = router