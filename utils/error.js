module.exports = errorHandler = async (res, message) => {
    await res.status(500).json({
        success: false,
        message: message.message ? message.message : message
    })
}