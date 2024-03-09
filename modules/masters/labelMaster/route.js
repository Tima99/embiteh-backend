const router = require("express").Router();
const { createLabel, readProductLabel, readProductLabelById } = require("./controller")

router.post("/", createLabel)
router.get("/", readProductLabel)
router.get("/:id", readProductLabelById)


module.exports = router;