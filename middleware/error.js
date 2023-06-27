const ErrorResponse = require("../util/errorResponse")

const errorhandle = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    // console.log(err.name)
    // mongo object id  not right error this is caalled cast error
    if (err.name === 'CastError') {
        message = `bootcamp not found with the id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    })
}


module.exports = errorhandle
