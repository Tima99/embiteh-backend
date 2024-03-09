const mongoose = require("mongoose");

/** DB Connection **/
(async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DB Connected Successfully!");
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });
        
        await mongoose.connect(process.env.DB_URL);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();
