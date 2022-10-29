const successResponse = (res, data, message) => {
    res.status(200).json({
        message,
        content: data
    })
}

const failedResponse = (res, data, message) => {
    res.status(400).json({
        message,
        content: data
    })
}

const errorResponse = (res, message) => {
    res.status(500).json(message);
}

module.exports = { successResponse, failedResponse, errorResponse }