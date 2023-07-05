
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../util/errorResponse");


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
    const isMath = user.matchPassword(password)

    if (!isMath) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    const token = user.getJwtToken()
    sendTokenResponse(token, 200, res)
})

const sendTokenResponse = (token, statusCode, res) => {
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({ success: true, token });
}

// @desc     create user
// @route   /api/v1/auth/me
// @access   public

exports.me = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({ success: true, user });
})
