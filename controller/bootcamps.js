// @desc     get all bootcamps
// @route   /api/v1/bootcamps
// @access   public

exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'show all bootcams' });
}

// @desc     get one bootcamp
// @route   /api/v1/bootcamps/:id
// @access   public

exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'show one bootcams' });
}

// @desc     creat bootcamp
// @route   /api/v1/bootcamps
// @access   public

exports.creatBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'creat bootcam' });
}

// @desc     update bootcamp
// @route   /api/v1/bootcamps/:id
// @access   public

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `updating the bootcamp of ${req.params.id} no id` });
}

// @desc     delete bootcamp
// @ route   /api/v1/bootcamps/:id
// @access   public

exports.delBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `deleting the bootcamp of ${req.params.id} no id` });
}