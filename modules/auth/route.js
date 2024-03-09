const validateReq = require("../../middlewares/validateReq");
const router = require("express").Router();

const { Register, Login } = require("./controller");
const { loginValidator } = require("./validators");


router.post("/create/admin", loginValidator, validateReq,  Register);
router.post("/login", loginValidator, validateReq, Login);

module.exports = router;
