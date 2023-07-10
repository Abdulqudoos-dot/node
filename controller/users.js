const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../util/errorResponse");


// @desc     get users
// @route   /api/v1//users
// @access   private/Admin

exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
})

// @desc     get user
// @route   /api/v1//user
// @access   private/Admin

exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    res.status(200).json({ sucess: true, data: user })
})


// @desc     creat user
// @route   /api/v1//user
// @access   private/Admin

exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)

    res.status(201).json({ sucess: true, data: user })
})


// @desc     update user
// @route   /api/v1//user
// @access   private/Admin

exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(200).json({ sucess: true, data: user })
})

// @desc     delete user
// @route   /api/v1//user
// @access   private/Admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ sucess: true, data: {} })
})