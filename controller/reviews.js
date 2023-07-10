const asyncHandler = require("../middleware/async");
const Bootcamps = require("../models/Bootcamps");
const Reviews = require("../models/Reviews");
const ErrorResponse = require("../util/errorResponse");

// @desc     get all reviews
// @route   /api/v1/bootcamps/:bootcampId/reviews
// @route   /api/v1/reviews
// @access   public

exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const reviews = await Reviews.findById({ bootcamp: req.params.bootcampId })
        return res.status(200).json({ success: true, data: reviews })
    }
    res.status(200).json(res.advancedResults);
})

// @desc     get single review
// @route   /api/v1/reviews/:id
// @access   public

exports.getReview = asyncHandler(async (req, res, next) => {

    const reviews = await Reviews.findById(req.params.id)
    if (!reviews) {
        return next(new ErrorResponse(`No review found with the ${req.params.id} ID`, 404))
    }
    res.status(200).json({ success: true, data: reviews })

})


// @desc     create single review
// @route   /api/v1/bootcamps/:bootcampId/reviews
// @access   private

exports.createReview = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId
    req.body.user = req.user.id
    const bootcamp = await Bootcamps.findById(req.params.bootcampId)
    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp not found with the id of ${req.params.bootcampId}`, 404))
    }
    const review = await Reviews.create(req.body)
    res.status(201).json({ success: true, data: review });
})


// @desc     update single review
// @route   /api/v1/reviews/:id
// @access   private

exports.updateReview = asyncHandler(async (req, res, next) => {
    let review = await Reviews.findById(req.params.id)
    if (!review) {
        return next(
            new ErrorResponse(`review not found with the id of ${req.params.id}`, 404))
    }

    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`the review with id ${req.user.id} is not authorized to update the review with the review of id ${review._id}`, 401))
    }

    review = await Reviews.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({ success: true, data: review });
})


// @desc     delete single review
// @route   /api/v1/reviews/:id
// @access   private

exports.deleteReview = asyncHandler(async (req, res, next) => {
    let review = await Reviews.findById(req.params.id)
    if (!review) {
        return next(
            new ErrorResponse(`review not found with the id of ${req.params.id}`, 404))
    }

    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`the review with id ${req.user.id} is not authorized to delete the review`, 401))
    }

    await Reviews.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true, data: {} });
})
