const asyncHandler = require("../middleware/async");
const Bootcamps = require("../models/Bootcamps");
const ErrorResponse = require("../util/errorResponse");
const geoCoder = require("../util/geoCoder");



// @desc     get all bootcamps
// @route   /api/v1/bootcamps
// @access   public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query;

    let queryStr = JSON.stringify(req.query)

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    console.log(queryStr)
    query = Bootcamps.find(JSON.parse(queryStr));


    const bootcamps = await query
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

// @desc     get  bootcamp with in  radius
// @ route   /api/v1/bootcamps/:zipcode/:distance
// @access   public
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

    res.status(200).json({ success: true, msg: `getting the bootcamp of ${radius} radius`, bootcamp });
})