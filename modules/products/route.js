const validateReq = require("../../middlewares/validateReq");
const router = require("express").Router();
const { createProduct, readProducts, readProductById, filterProducts, updateProduct } = require("./controller")

router.post("/", createProduct)
router.put("/:id", updateProduct)
router.get("/", readProducts)
router.get("/filter", filterProducts)
router.get("/:id", readProductById)


module.exports = router;