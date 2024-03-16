const mongoose = require("mongoose");


function ReadCollection({ modelName, populate = "" }) {
  return async (req, res) => {
    const model = mongoose.model(modelName);

    const docs = await model.find().populate(populate);

    res.json({
        message: `${modelName} fetched successfully`,
        docs,
    });
  };
}

exports.ReadCollection = ReadCollection;
