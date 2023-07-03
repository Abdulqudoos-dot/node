const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamps");
const ErrorResponse = require("../util/errorResponse");

// @desc     get all courses
// @route   /api/v1/bootcamps/:bootcampId/courses
// @route   /api/v1/courses
// @access   public

exports.getCourses = asyncHandler(async (req, res, next) => {
    let query
    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId })
    } else {
        query = Course.find()
        // .populate({
        //     path: 'bootcamp',
        //     select: 'name description'
        // })
    }

    const courses = await query
    res.status(200).json({ success: true, count: courses.length, data: courses });
})

// @desc     get one course
// @route   /api/v1/courses/:id
// @access   public

exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate(
        {
            path: 'bootcamp',
            select: "name description"
        }
    )
    if (!course) {
        return next(
            new ErrorResponse(`Course not found with the id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, msg: 'show one bootcams', course });
})

// @desc     add one course
// @route   /api/v1/bootcamps/:bootcampId/courses
// @access   public

exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp not found with the id of ${req.params.bootcampId}`, 404))
    }
    const course = await Course.create(req.body)
    res.status(200).json({ success: true, course });
})