const express = require('express')
const router = express.Router()
const { getBootcamps, getBootcamp, creatBootcamp, updateBootcamp, delBootcamp, getBootCampsInRadius, uploadBootcampPhoto } = require('../controller/bootcamps')
const courseRouter = require('./courses')
router.use('/:bootcampId/courses', courseRouter)
router.route('/').get(getBootcamps).post(creatBootcamp)

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(delBootcamp)
router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius)
router.route('/:id/photo').put(uploadBootcampPhoto)

module.exports = router