const validateReq = require("../../middlewares/validateReq");
const router = require("express").Router();
const {
    createProduct,
    readProducts,
    readProductById,
    filterProducts,
    updateProduct,
    uploadProductImages,
    readProductsByLabels,
} = require("./controller");

router.post("/", createProduct);
router.patch("/upload/images/:id", uploadProductImages);
router.put("/:id", updateProduct);
router.get("/", readProducts);
router.get("/filter", filterProducts);
router.get("/:id", readProductById);

router.get("/by/labels", readProductsByLabels);

module.exports = router;
