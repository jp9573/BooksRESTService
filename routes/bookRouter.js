const express = require("express");

function routes(Book) {
  const bookRouter = express.Router();

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

  // Middleware for /books/:bookId API
  bookRouter.use("/books/:bookId", (req, res, next) => {
    const { bookId } = req.params;
    Book.findById(bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  bookRouter
    .route("/books/:bookId")
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;

      if (req.body._id) {
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });

      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    });

  return bookRouter;
}

module.exports = routes;
