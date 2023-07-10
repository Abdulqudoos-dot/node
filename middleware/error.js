const ErrorResponse = require("../util/errorResponse")
const errorhandle = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    // console.log(err.name)
    // mongo object id  not right error this is caalled cast error
    if (err.name === 'CastError') {
        message = `resourses not found with the id of ${err.value.bootcamp}`
        error = new ErrorResponse(message, 400)
    }
    if (err.code === 11000) {
        message = 'Dublicate field entered'
        error = new ErrorResponse(message, 400)
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => { return val.message })
        console.log(message)
        error = new ErrorResponse(message, 400)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    })
}


module.exports = errorhandle
