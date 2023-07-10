const express = require('express')
const router = express.Router({ mergeParams: true })
const advancedResults = require('../middleware/advanceResults')
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controller/courses')
const { protect, authorize } = require('../middleware/auth')
const Bootcamps = require('../models/Bootcamps')
const Course = require('../models/Course')
router.route('/').get(advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description'
}), getCourses).post(protect, authorize('admin', 'publisher'), addCourse)
router.route('/:id').get(getCourse).put(protect, authorize('admin', 'publisher'), updateCourse).delete(protect, authorize('admin', 'publisher'), deleteCourse)


// router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius)
module.exports = router