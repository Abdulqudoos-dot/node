const express = require('express')
const router = express.Router()
const { getBootcamps, getBootcamp, creatBootcamp, updateBootcamp, delBootcamp, getBootCampsInRadius, uploadBootcampPhoto } = require('../controller/bootcamps')
const courseRouter = require('./courses')
const { protect, authorize } = require('../middleware/auth')
// rerouting to courses router 
router.use('/:bootcampId/courses', courseRouter)
router.route('/').get(getBootcamps).post(protect, authorize('admin', 'publisher'), creatBootcamp)

router.route('/:id').get(getBootcamp).put(protect, authorize('admin', 'publisher'), updateBootcamp).delete(protect, authorize('admin', 'publisher'), delBootcamp)
router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius)
router.route('/:id/photo').put(protect, authorize('admin', 'publisher'), uploadBootcampPhoto)

module.exports = router