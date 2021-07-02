const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Book = require("./models/bookModel");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connect(process.env.DATABASE_CONNECTION);
const bookRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter
  .route("/books")
  .post((req, res) => {
    const book = new Book(req.body);
    book.save();
    return res.status(201).json(book);
  })
  .get((req, res) => {
    let query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

bookRouter.route("/books/:bookId").get((req, res) => {
  const { bookId } = req.params;
  Book.findById(bookId, (err, book) => {
    if (err) {
      return res.send(err);
    }
    return res.json(book);
  });
});

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
