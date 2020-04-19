const morgan = require('morgan')

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

const unknownEndpoint = (request, response) => {
    response.status(404).json({
        error: 'unknown endpoint'
    });
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({
            error: error.message
        })
    }
    next(error)
}


module.exports = { morgan, unknownEndpoint, errorHandler}