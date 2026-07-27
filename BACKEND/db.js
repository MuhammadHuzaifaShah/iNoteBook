const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};

module.exports = connectToMongo;