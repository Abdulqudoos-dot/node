const jwt = require('jsonwebtoken')
const ErrorResponse = require('../util/errorResponse')
const asyncHandler = require('./async');
const User = require('../models/User');
exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1]
    }
    else if (req.cookies) {
        token = req.cookies.token
    }

    if (!token) {
        return next(new ErrorResponse('Not Authorized', 403))
    }


    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await User.findById(decode.id)
        next()
    } catch (err) {
        return next(new ErrorResponse('Not Authorized', 403))
    }
})
