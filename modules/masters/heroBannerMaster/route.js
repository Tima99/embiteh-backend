const router = require("express").Router();
const { create } = require("./controller");

router.post("/", create);

module.exports = router;
