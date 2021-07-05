require("should");

const request = require("supertest");
const mongoose = require("mongoose");

process.env.ENV = "Test";

const app = require("../index.js");

const Book = mongoose.model("Book");
const agent = request.agent(app);

describe("Book CRUD Test", () => {
  it('should allow a new book to be posted and return "read" and "_id"', (done) => {
    const bookPost = { title: "Jay's Book", author: "Jay", genre: "Fiction" };

    agent
      .post("/api/books")
      .send(bookPost)
      .expect(200)
      .end((err, res) => {
        res.body.read.should.not.equal(true);
        res.body.should.have.property("_id");
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
