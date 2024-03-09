const mongoose = require("mongoose");
const validateEmail = require("../../utils/validations");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: validateEmail,
            message: "Invalid email format",
        },
    },
    password: {
        type: String,
        as: "pwd"
    }
}, {
    timestamps: true
});

// Export the schema
module.exports = mongoose.model("User", userSchema);
