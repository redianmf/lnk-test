// Import Mongoose
const mongoose = require("mongoose");

const URI =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : "mongodb://127.0.0.1/lnk";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = mongoose;
