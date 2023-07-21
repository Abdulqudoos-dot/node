
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../util/errorResponse");
const sendEmail = require("../util/sendEmail");


// @desc     create user
// @route   /api/v1/auth/register
// @access   public

exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, role, password } = req.body
    const user = await User.create({ name, email, role, password })
    const token = user.getJwtToken()
    res.status(200).json({ success: true, token });
})

// @desc     login user
// @route   /api/v1/auth/login
// @access   public

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorResponse('Please enter email and password', 400))
    }


    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    const token = user.getJwtToken()
    sendTokenResponse(token, 200, res)
})



// @desc     create user
// @route   /api/v1/auth/me
// @access   private

exports.me = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({ success: true, user });
})

// @desc     logout user
// @route   /api/v1/auth/logout
// @access   private

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({ success: true, data: {} });
})



// @desc     update user
// @route   /api/v1/auth/updateuser
// @access   private

exports.updateUser = asyncHandler(async (req, res, next) => {
    const selectedFields = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id, selectedFields, {
        new: true,
        runValidators: true
    })
    const token = user.getJwtToken()
    sendTokenResponse(token, 200, res)


})



// @desc     update user password
// @route   /api/v1/auth/updateuser
// @access   private

exports.updateUserPassword = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.user.id).select('+password')

    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('the current password dont match with last password', 401))
    }

    user.password = req.body.newPassword

    user = await user.save()
    const token = user.getJwtToken()
    sendTokenResponse(token, 200, res)
})



// @desc     forgot password
// @route   /api/v1/auth/forgotpassword
// @access   public

exports.forgotpassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return (next(new ErrorResponse('the user is not available with this email')))
    }
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })

    // make redet url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetpassword/${resetToken}`

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to \n\n ${resetUrl}`

    try {
        await sendEmail({
            email: user.email,
            subject: 'password reset token',
            message
        })
        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
        console.log(err)
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorResponse('Email can not be send', 500))
    }


    res.status(200).json({ success: true, data: user });
})


// the funtion to generate cokies and send in response

const sendTokenResponse = (token, statusCode, res) => {
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({ success: true, token });
}
