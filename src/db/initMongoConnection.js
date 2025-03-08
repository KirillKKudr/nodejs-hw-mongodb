const mongoose = require("mongoose");
require("dotenv").config();

const initMongoConnection = async () => {
  try {
    
    console.log("MongoDB ENV Vars:", {
      user: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD ? "***HIDDEN***" : "NOT SET",
      url: process.env.MONGODB_URL,
      db: process.env.MONGODB_DB,
    });

    
    const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

    console.log("MongoDB connecting to:", mongoURI.replace(process.env.MONGODB_PASSWORD, "***HIDDEN***"));

    
    await mongoose.connect(mongoURI);

    console.log("Mongo connection successfully established!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = initMongoConnection;
