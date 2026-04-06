const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource ID";
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        const errors = Object.values(err.errors);
        const messages = [];

        for (let i = 0; i < errors.length; i++) {
            messages.push(errors[i].message);
        }

        message = messages.join(", ");
    }

    res.status(statusCode).json({
        success: false,
        status: err.status || "error",
        message: message
    });
};

module.exports = errorHandler;