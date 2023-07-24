const jwt = require('jsonwebtoken')
const ErrorResponse = require('../util/errorResponse')
const asyncHandler = require('./async');
// const User = require('../models/User');
const User = require('../sequelizeModel/index').user
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
        req.user = await User.findByPk(decode.id)
        next()
    } catch (err) {
        return next(new ErrorResponse('Not Authorized with id', 403))
    }
})

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`user role ${req.user.role} is not authorized to access the route`, 403))
        }
        next()
    }
}
