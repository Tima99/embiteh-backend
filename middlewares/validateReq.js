const { validationResult } = require("express-validator");

// Middleware to handle validation errors
const validateReq = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }
    next();
};

module.exports = validateReq