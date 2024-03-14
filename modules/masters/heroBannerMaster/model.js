const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const heroBannerSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Hero Banner Name cann't be blank"],
        },
        description: String,
        images: [String],
        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Inactive",
        },
    },
    {
        timestamps: true,
    }
);


const HeroBanner = mongoose.model("HeroBanner", heroBannerSchema);


module.exports = HeroBanner;
