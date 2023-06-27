const Bootcamps = require("../models/Bootcamps");
const ErrorResponse = require("../util/errorResponse")


// @desc     get all bootcamps
// @route   /api/v1/bootcamps
// @access   public

exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamps.find();

        res.status(200).json({ success: true, msg: 'show all bootcamps', bootcamps });

    }
    catch (err) {
        next(err)
    }
}


// @desc     get one bootcamp
// @route   /api/v1/bootcamps/:id
// @access   public

exports.getBootcamp = async (req, res, next) => {
    try {

        const bootcamp = await Bootcamps.findById(req.params.id)
        if (!bootcamp) {
            return next(
                new ErrorResponse(`bootcamp not found with the id of ${req.params.id}`, 404))
        }
        res.status(200).json({ success: true, msg: 'show one bootcams', bootcamp });

    } catch (err) {
        next(err)
    }

}

// @desc     creat bootcamp
// @route   /api/v1/bootcamps
// @access   public

exports.creatBootcamp = async (req, res, next) => {
    try {
        const createdBootCamp = await Bootcamps.create(req.body)
        res.status(200).json({ success: true, msg: 'creat bootcam', createdBootCamp });
    } catch (err) {
        next(err)
    }

}

// @desc     update bootcamp
// @route   /api/v1/bootcamps/:id
// @access   public

exports.updateBootcamp = async (req, res, next) => {

    try {
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

    } catch (err) {
        next(err)

    }
}

// @desc     delete bootcamp
// @ route   /api/v1/bootcamps/:id
// @access   public

exports.delBootcamp = async (req, res, next) => {

    try {
        const bootcamp = await Bootcamps.findById(req.params.id)

        if (!bootcamp) {
            return next(
                new ErrorResponse(`bootcamp not found with the id of ${req.params.id}`, 404))
        }
        await Bootcamps.findByIdAndDelete(req.params.id)


        res.status(200).json({ success: true, msg: `deleting the bootcamp of ${req.params.id} no id` });

    } catch (err) {
        next(err)
    }
}