const uploadImage = require("../../../services/uploadImage");
const HeroBanner = require("./model");

exports.create = async (req, res) => {
    let { images } = req.files || {};
    images = images && Array.isArray(images) ? images : [images];

    const uploadImageNames =
        images &&
        (await Promise.all(
            images?.map(async (image) => await uploadImage(image))
        ));

    const createdHeroBanner = await HeroBanner.create({
        ...req.body,
        images: uploadImageNames,
    });

    res.json({
        message: "Hero Banner Created",
        createdHeroBanner,
        uploadedImageNames: uploadImageNames
    });
};
