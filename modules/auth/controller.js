const User = require("./user.model");
const HTTP = require("http-status-codes");
const jwt = require("jsonwebtoken")

const Register = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({
        email,
    });

    if (user) {
        throw new Error("User Already Exists", {
            cause: { status: 404 },
        });
    }

    const createdUser = await User.create(req.body);

    res.status(HTTP.StatusCodes.CREATED).json({
        message: "Registered Sucessfully",
        user: createdUser,
    });
};

const Login = async (req, res) => {
    const { email , password } = req.body;

    const user = await User.findOne({
        email,
    });

    if(!user){
        throw new Error("Admin Not Found", {
            cause: { status: HTTP.StatusCodes.NOT_FOUND },
        });
    }
    
    if(user.password !== password){
        throw new Error("Incorrect Password", {
            cause: { status: HTTP.StatusCodes.BAD_REQUEST },
        });
    }

    const token = jwt.sign({email}, process.env.AUTH_SECRET_KEY)

    res.json({
        message: "Login Successfully",
        token
    })

};

module.exports = {
    Register,
    Login
}