const path = require("path");
const {
    uniqueNamesGenerator,
    adjectives,
    colors,
} = require("unique-names-generator");

const uploadDir = path.join(__dirname, "../uploads");

const uploadImage = async (image, cutsom_adjectives = []) => {
    if (image && !/^image/.test(image.mimetype))
        throw new Error("Bad Image", {
            cause: {
                status: 400,
            },
        });

    const uniqueName = uniqueNamesGenerator({
        dictionaries: [cutsom_adjectives, adjectives, colors],
        separator: "-",
    });
    const imageExt = image && image.name.split(".").at(-1);
    const uploadImageName = `${uniqueName}.${imageExt}`;
    image && (await image.mv(path.join(uploadDir, uploadImageName)));

    return uploadImageName;
};

module.exports = uploadImage;
