const { body } = require("express-validator");

// Define a reusable validator function for login route
exports.loginValidator = [
    // Validate email field
    body("email").isEmail().withMessage("Invalid email address"),

    // Validate password field
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/)
        .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one digit"),
];
