const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const labelSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Label Name cann't be blank"],
        },
        description: String,
        priorityOrder: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },
    },
    {
        timestamps: true,
    }
);


labelSchema.pre("save", async function (next) {
    if (!this.isNew) {
        // Check if the document is being updated
        return next(); // If it's an update, skip incrementing priorityOrder
    }

    try {
        // Find the highest priorityOrder value
        const highestPriority = await Label.findOne({}, { priorityOrder: 1 })
            .sort({ priorityOrder: -1 })
            .limit(1);

        // If there are no documents in the collection, set priorityOrder to 1
        if (!highestPriority) {
            this.priorityOrder = 1;
        } else {
            // Increment the priorityOrder by one
            this.priorityOrder = highestPriority.priorityOrder + 1;
        }

        next(); // Continue with the save operation
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

const Label = mongoose.model("Label", labelSchema);


module.exports = Label;
