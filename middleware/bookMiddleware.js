function bookMiddleware(Book) {
  function bookFinderMiddleware(req, res, next) {
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
  }

  return { bookFinderMiddleware };
}

module.exports = bookMiddleware;
