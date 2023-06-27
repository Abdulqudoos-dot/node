const asyncHandler = require("../middleware/async");
const Bootcamps = require("../models/Bootcamps");
const ErrorResponse = require("../util/errorResponse")



// @desc     get all bootcamps
// @route   /api/v1/bootcamps
// @access   public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamps.find();
    res.status(200).json({ success: true, msg: 'show all bootcamps', bootcamps });
})



// @desc     get one bootcamp
// @route   /api/v1/bootcamps/:id
// @access   public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamps.findById(req.params.id)
    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp not found with the id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, msg: 'show one bootcams', bootcamp });
})

// @desc     creat bootcamp
// @route   /api/v1/bootcamps
// @access   public

exports.creatBootcamp = asyncHandler(async (req, res, next) => {

    const createdBootCamp = await Bootcamps.create(req.body)
    res.status(200).json({ success: true, msg: 'creat bootcam', createdBootCamp });


})

// @desc     update bootcamp
// @route   /api/v1/bootcamps/:id
// @access   public

exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamps.findById(req.params.id)

    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp not found with the id of ${req.params.id}`, 404))
    }
    const updatedbootcamp = await Bootcamps.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ success: true, msg: `updating the bootcamp of ${req.params.id} no id`, updatedbootcamp });

})

// @desc     delete bootcamp
// @ route   /api/v1/bootcamps/:id
// @access   public

exports.delBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamps.findById(req.params.id)

    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp not found with the id of ${req.params.id}`, 404))
    }
    await Bootcamps.findByIdAndDelete(req.params.id)


    res.status(200).json({ success: true, msg: `deleting the bootcamp of ${req.params.id} no id` });

})