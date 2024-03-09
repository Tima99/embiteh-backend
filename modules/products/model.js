const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name cannot be blank"],
        },
        description: String, // No need for extra object here
        images: [String], // No need for extra object here
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [1, "Price value must be greater 0"],
        },
        discountPrice: {
            type: Number,
            validate: {
                validator: function (value) {
                    return value <= this.price; // Discount price should be less than or equal to price
                },
                message:
                    "Discount Price must be lesser than or equal to Price.",
            },
        },
        tags: [String],
        label: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Label"
        },
        currency: {
            type: String,
            enum: ["ruppee", "dollar"],
            default: "ruppee",
        },
        quantity: {
            type: Number,
            min: [1, "Quantity must be greater than or equals to 0"],
        }
    },
    {
        timestamps: true,
    }
);

// Correct model creation
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
