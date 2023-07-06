const express = require('express')
const router = express.Router({ mergeParams: true })
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controller/courses')
const { protect, authorize } = require('../middleware/auth')
router.route('/').get(getCourses).post(protect, authorize('admin', 'publisher'), addCourse)
router.route('/:id').get(getCourse).put(protect, authorize('admin', 'publisher'), updateCourse).delete(protect, authorize('admin', 'publisher'), deleteCourse)


// router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius)
module.exports = router