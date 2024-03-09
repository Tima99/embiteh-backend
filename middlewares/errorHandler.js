const toPascelCase = require("../utils/toPascelCase")

function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error for debugging purposes

    if (err.name === "ValidationError") {
        let errors = {};

        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors?.[key]?.message;
        });

        return res.status(400).send(errors);
    }

    // Check if the error is a duplicate key error
    if (err.code === 11000 && err.name === "MongoServerError") {
        // Extract the duplicate key field from the error message
        const duplicateKey = Object.keys(err.keyPattern)[0];
        const duplicateValue = err.keyValue[duplicateKey];

        // Construct a custom message
        const message = `${toPascelCase(duplicateKey)} already exists with value \`${duplicateValue}\`.`;

        // Return the custom message
        return res.status(400).json({ message });
    }

    // Check if the error has a `cause` object with a `status` property
    if (err.cause && err.cause.status) {
        return res.status(err.cause.status).json({ error: err.message });
    }

    // If it's not an HttpError, handle it as a generic server error
    return res.status(500).json({ message: err.message });
}

// Export the errorHandler middleware
module.exports = errorHandler;
