const Label = require("./model");
const { isValidObjectId } = require("mongoose");

exports.createLabel = async (req, res) => {
    const { name, description, status, priorityOrder } = req.body;

    await Label.validate(req.body)

    const createdProductLabel = await Label.create({
        name,
        description,
        status,
        priorityOrder,
    });

    res.json({
        message: "Product Label Created",
        createdProductLabel,
    });
};

exports.readProductLabel = async (req, res) => {
    const labels = await Label.find({}).lean();
    res.json({
        message: "Product Labels fetched successfully",
        labels,
    });
};

exports.readProductLabelById = async (req, res) => {
    const labelId = isValidObjectId(req.params.id) ? req.params.id : null;

    const label = await Label.findById(labelId).lean();
    res.json({
        message: "Product Label fetched successfully",
        label,
    });
};
