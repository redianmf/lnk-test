require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./src/routes");

const app = express();
const port = process.env.PORT || 5000;

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

app.use(express.json());

app.use(cors());

app.get("/", function (req, res) {
  res.send({
    message: "Hello World",
  });
});

app.use("/api/v1/", router);

app.listen(port, () => console.log(`Listening on port ${port}!`));
