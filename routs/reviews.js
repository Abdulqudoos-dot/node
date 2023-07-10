const express = require('express')
const router = express.Router({ mergeParams: true })
const Bootcamps = require('../models/Bootcamps')
const Reviews = require('../models/Reviews')
const { getReviews, getReview, createReview, updateReview, deleteReview } = require('../controller/reviews')
const { protect, authorize } = require('../middleware/auth')

const advancedResults = require('../middleware/advanceResults')
router.route('/').get(advancedResults(Reviews, {
    path: 'bootcamp',
    select: 'name description'
}), getReviews).post(protect, authorize('user', 'admin'), createReview)
router.route('/:id').get(getReview).put(protect, authorize('user', 'admin'), updateReview).delete(protect, authorize('user', 'admin'), deleteReview)
// router.route('/').get(advancedResults(Bootcamps, 'bootcamps'), getCourses).post(protect, authorize('admin', 'publisher'), addCourse)

module.exports = router