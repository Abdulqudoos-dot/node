const path = require("path")
const asyncHandler = require("../middleware/async");
const Bootcamps = require("../models/Bootcamps");
const ErrorResponse = require("../util/errorResponse");
const geoCoder = require("../util/geoCoder");



// @desc     get all bootcamps
// @route   /api/v1/bootcamps
// @access   public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
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
    res.status(200).json({ success: true, msg: 'show one bootcams', data: bootcamp });
})

// @desc     creat bootcamp
// @route   /api/v1/bootcamps
// @access   private

exports.creatBootcamp = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id
    const publishedBootCamp = await Bootcamps.findById(req.user.id)
    if (publishedBootCamp && req.user.role != 'admin') {
        return next(
            new ErrorResponse(`the user with id ${req.user.id} is already published a bootcamp`, 400))
    }
    const createdBootCamp = await Bootcamps.create(req.body)
    res.status(200).json({ success: true, msg: 'creat bootcam', data: createdBootCamp });
})

// @desc     update bootcamp
// @route   /api/v1/bootcamps/:id
// @access   private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamps.findById(req.params.id)
    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp not found with the id of ${req.params.id}`, 404))
    }
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`the user with id ${req.user.id} is not authorized to update the bootcamp`, 401))
    }
    const updatedbootcamp = await Bootcamps.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ success: true, msg: `updating the bootcamp of ${req.params.id} no id`, data: updatedbootcamp });

})

// @desc     delete bootcamp
// @ route   /api/v1/bootcamps/:id
// @access   private

exports.delBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamps.findById(req.params.id)

    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp not found with the id of ${req.params.id}`, 404))
    }
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`the user with id ${req.user.id} is not authorized to delete the bootcamp`, 401))
    }
    await bootcamp.deleteOne()
    res.status(200).json({ success: true, msg: `deleting the bootcamp of ${req.params.id} no id` });

})

// @desc     get  bootcamp with in  radius
// @ route   /api/v1/bootcamps/:zipcode/:distance
// @access   private
exports.getBootCampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params
    const loc = await geoCoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lon = loc[0].longitude
    // get radius of earth
    // formula of radius 
    // radius = distance /radius
    const radius = distance / 3963
    const bootcamp = await Bootcamps.find({
        location: {
            $geoWithin: { $centerSphere: [[lon, lat], radius] }
        }
    })

    if (bootcamp.length === 0) {
        return next(
            new ErrorResponse(`bootcamp not found with in ${radius} radius `, 404))
    }

    res.status(200).json({ success: true, msg: `getting the bootcamp of ${radius} radius`, data: bootcamp });
})

// @desc     upload photo in bootcamp
// @ route   /api/v1/bootcamps/:id/photo
// @access   private

exports.uploadBootcampPhoto = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamps.findById(req.params.id)

    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp not found with the id of ${req.params.id}`, 404))
    }
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`the user with id ${req.user.id} is not authorized to update the bootcamp`, 401))
    }

    if (!req.files) {
        return next(
            new ErrorResponse(`Please Upload a file`, 400))
    }

    const file = req.files.files
    if (!file.mimetype.startsWith("image")) {
        return next(
            new ErrorResponse(`Please Upload an image`, 400))

    }
    if (file.size > process.env.FILE_UPLOAD_MAX_SIZE) {
        return next(
            new ErrorResponse(`Please Upload an image with less than ${FILE_UPLOAD_MAX_SIZE} size`, 400))
    }
    file.name = `photo${bootcamp._id}${path.parse(file.name).ext}`

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.log(err)
            return next(
                new ErrorResponse(`Problem with file upload`, 500))

        }
    })
    await Bootcamps.findByIdAndUpdate(req.params.id, { photo: file.name })

    res.status(200).json({ success: true, data: file.name });

})