const express = require("express");
const bookController = require("../controller/booksController");
const bookMiddleware = require("../middleware/bookMiddleware");

function routes(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);
  const middleware = bookMiddleware(Book);

  bookRouter.route("/books").post(controller.post).get(controller.get);

  // Middleware for /books/:bookId API
  bookRouter.use("/books/:bookId", middleware.bookFinderMiddleware);

  bookRouter
    .route("/books/:bookId")
    .get((req, res) => {
      const returnBook = req.book.toJSON();
      returnBook.links = {};
      const genre = req.book.genre.replace(" ", "%20");
      returnBook.links.filterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
      res.json(returnBook);
    })
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
    })
    .delete((req, res) => {
      const { book } = req;

      book.remove((err) => {
        if (err) {
          return res.json(err);
        }
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}

module.exports = routes;
