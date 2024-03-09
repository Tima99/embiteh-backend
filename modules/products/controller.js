const HTTP = require("http-status-codes");
const Product = require("./model");
const { isValidObjectId } = require("mongoose");
const uploadImage = require("../../services/uploadImage");

exports.createProduct = async (req, res) => {
    let { images } = req.files || {};
    images = (images && Array.isArray(images)) ? images : [images]

    const uploadImageNames = images && await Promise.all(images?.map(async (image) => await uploadImage(image)));

    const excludesKeysIfEmpty = ["currency", "label"];

    excludesKeysIfEmpty.map((key) => {
        if (key in req.body && !req.body[key]) {
            delete req.body[key];
        }
    });

    const createdProduct = await Product.create({
        ...req.body,
        images: uploadImageNames,
    });

    res.status(HTTP.StatusCodes.CREATED).json({
        message: "Product created successfully",
        createdProduct,
    });
};

exports.readProducts = async (req, res) => {
    const products = await Product.find({}).lean();
    res.json({
        message: "Products fetched successfully",
        products,
    });
};

exports.readProductById = async (req, res) => {
    const {images} = req.query;
    const productId = isValidObjectId(req.params.id) ? req.params.id : null;

    const product = await Product.findById(productId).select(images ? "images" : "").lean();
    res.json({
        message: "Product fetched successfully",
        product,
    });
};

exports.filterProducts = async (req, res) => {
    const { labelId } = req.query;

    if (!isValidObjectId(labelId))
        throw new Error("Invalid Id", {
            cause: {
                status: 400,
            },
        });

    const products = await Product.find({
        label: labelId,
    });

    res.json({
        message: "Products Filtered Successfully",
        products,
    });
};

exports.updateProduct = async (req, res) => {
    const { imagesOrder } = req.body
    let { images } = req.files || {};
    images = images ? Array.isArray(images) ? images : [images]: null

    imagesOrder?.length <= 0 && await Product.validate(req.body)

    const newUploadedImageNames = images && await Promise.all(images?.map(async (image) => await uploadImage(image)));

    const updatedImagesList = imagesOrder?.flatMap(img => {
        if(img === '0'){
            // replaceable image
            return [newUploadedImageNames.pop()]
        } else if (img === '-1'){
            // deleted image
            return [];
        }
        // already exists image
        return [img]; 
    })
    // combine rest of newly images
    .concat(newUploadedImageNames || [])

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: {
            ...(!imagesOrder?.length && {...req.body}),
            ...(imagesOrder?.length && { images: updatedImagesList })
        }
    }, {
        new: true
    })


    res.json({
        message: "Product Updated",
        updatedProduct
    })

}

exports.uploadProductImages = async (req, res) => {
    let { images } = req.files || {};
    images = images ? Array.isArray(images) ? images : [images]: null

    const uploadedImageNames = images && await Promise.all(images?.map(async (image) => await uploadImage(image)));


    Array.isArray(uploadedImageNames) && await Product.findByIdAndUpdate(req.params.id, {
        $push: {
            images: {$each : uploadedImageNames}
        }
    })

    res.json({
        uploadedImageNames
    })

}