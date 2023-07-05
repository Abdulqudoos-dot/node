const express = require('express')
const router = express.Router()
const { getBootcamps, getBootcamp, creatBootcamp, updateBootcamp, delBootcamp, getBootCampsInRadius, uploadBootcampPhoto } = require('../controller/bootcamps')
const courseRouter = require('./courses')
const { protect } = require('../middleware/auth')
// rerouting to courses router 
router.use('/:bootcampId/courses', courseRouter)
router.route('/').get(getBootcamps).post(protect, creatBootcamp)

router.route('/:id').get(getBootcamp).put(protect, updateBootcamp).delete(protect, delBootcamp)
router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius)
router.route('/:id/photo').put(protect, uploadBootcampPhoto)

module.exports = router