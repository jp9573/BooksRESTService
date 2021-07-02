const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Book = require("./models/bookModel");
const dotenv = require("dotenv");
const bookRouter = require("./routes/bookRouter")(Book);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connect(process.env.DATABASE_CONNECTION);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
