const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamps");
const ErrorResponse = require("../util/errorResponse");

// @desc     get all courses
// @route   /api/v1/bootcamps/:bootcampId/courses
// @route   /api/v1/courses
// @access   public

exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;
    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId })
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        })
    }

    const courses = await query
    res.status(200).json({ success: true, count: courses.length, data: courses });
})

// @desc     get one course
// @route   /api/v1/courses/:id
// @access   public

exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    })
    if (!course) {
        return next(
            new ErrorResponse(`Course not found with the id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, msg: 'show one couse', course });
})

// @desc     add one course
// @route   /api/v1/bootcamps/:bootcampId/courses
// @access   private

exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId
    req.body.user = req.user.id
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp not found with the id of ${req.params.bootcampId}`, 404))
    }
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`the user with id ${req.user.id} is not authorized to add a course with the bootcamp of id ${req.params.bootcampId}`, 401))
    }
    const course = await Course.create(req.body)
    res.status(200).json({ success: true, data: course });
})


// @desc     upate one course
// @route   /api/v1/courses/:id
// @access   private

exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id)
    if (!course) {
        return next(
            new ErrorResponse(`course not found with the id of ${req.params.id}`, 404))
    }
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`the user with id ${req.user.id} is not authorized to update the course with the course of id ${course._id}`, 401))
    }
    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ success: true, data: course });
})

// @desc     delete one course
// @route   /api/v1/courses/:id
// @access   private

exports.deleteCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id)
    if (!course) {
        return next(
            new ErrorResponse(`course not found with the id of ${req.params.id}`, 404))
    }
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`the user with id ${req.user.id} is not authorized to delete the course with the course of id ${course._id}`, 401))
    }
    await Course.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, data: {} });
})