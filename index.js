const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

bookRouter.route("/books").get((req, res) => {
  const response = { hello: "World!" };

  res.json(response);
});

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
