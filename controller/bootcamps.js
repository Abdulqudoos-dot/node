const Bootcamps = require("../models/Bootcamps");


// @desc     get all bootcamps
// @route   /api/v1/bootcamps
// @access   public

exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamps.find();

        res.status(200).json({ success: true, msg: 'show all bootcamps', bootcamps });

    }
    catch (error) {
        console.log(error)
    }
}


// @desc     get one bootcamp
// @route   /api/v1/bootcamps/:id
// @access   public

exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamps.findById(req.params.id)
        if (!bootcamp) {
            return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, msg: 'show one bootcams', bootcamp });

    } catch (error) {
        res.status(404).json(error.message)
    }

}

// @desc     creat bootcamp
// @route   /api/v1/bootcamps
// @access   public

exports.creatBootcamp = async (req, res, next) => {
    try {
        const createdBootCamp = await Bootcamps.create(req.body)

        res.status(200).json({ success: true, msg: 'creat bootcam', createdBootCamp });
    } catch (error) {
        res.status(404).json(error.message)
    }

}

// @desc     update bootcamp
// @route   /api/v1/bootcamps/:id
// @access   public

exports.updateBootcamp = async (req, res, next) => {

    try {
        const bootcamp = await Bootcamps.findById(req.params.id)

        if (!bootcamp) {
            return res.status(404).json({ success: false })
        } else {
            const updatedbootcamp = await Bootcamps.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            res.status(200).json({ success: true, msg: `updating the bootcamp of ${req.params.id} no id`, updatedbootcamp });
        }
    } catch (error) {
        res.status(404).json(error.message)

    }
}

// @desc     delete bootcamp
// @ route   /api/v1/bootcamps/:id
// @access   public

exports.delBootcamp = async (req, res, next) => {

    try {
        const bootcamp = await Bootcamps.findById(req.params.id)

        if (!bootcamp) {
            return res.status(404).json({ success: false })
        } else {
            await Bootcamps.findByIdAndDelete(req.params.id)
        }

        res.status(200).json({ success: true, msg: `deleting the bootcamp of ${req.params.id} no id` });

    } catch (error) {
        res.status(404).json(error.message)
    }
}