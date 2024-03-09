require("dotenv").config();
require("express-async-errors");
require("./dbConnect");

const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const cors = require("cors")
const fileUpload = require("express-fileupload");
const errorHandler = require("./middlewares/errorHandler");
const AuthRoutes = require("./modules/auth/route");
const ProductRoutes = require("./modules/products/route");
const ProductLabelRoutes = require("./modules/masters/labelMaster/route");

const app = express();

app.use(express.static(path.join(__dirname, "uploads")))
app.use(cors())
app.use(express.json());
// entry routes
app.use("/api/auth", AuthRoutes);

// auth routes
app.use("/api/master/product-label", ProductLabelRoutes);

app.use(fileUpload());
app.use("/api/product", ProductRoutes);

/** **/
app.get("/api/test", (req, res) => {
    res.json({
        message: "Server is started",
    });
});

app.use(errorHandler);

app.listen(process.env.PORT, async () => {
    try {
        console.log(`Server is listening on ${process.env.PORT}`);
        await fs.readdir("uploads");
    } catch {
        // if no uploads folder create one
        await fs.mkdir("uploads"); 
    }
});
