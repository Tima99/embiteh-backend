const router = require("express").Router();
const { ReadCollection } = require("../../../utils/ReadCollection");
const { create } = require("./controller");

router.post("/", create);
router.get("/", ReadCollection({ modelName: "HeroBanner"}));

module.exports = router;
