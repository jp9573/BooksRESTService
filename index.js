const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/bookModel");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connect(process.env.DATABASE_CONNECTION);
const bookRouter = express.Router();

bookRouter.route("/books").get((req, res) => {
  Book.find((err, books) => {
    if (err) {
      return res.send(err);
    }
    return res.json(books);
  });
});

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
