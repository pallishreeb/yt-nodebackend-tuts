//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();

chai.use(chaiHttp);
// Our main block
describe("users", () => {
  // Consts
  const id = "3",
    successCode = 200,
    user = {
      id: "10",
      name: "hello",
      age: "20",
    },
    testName = "C",
    testAge = "20";

  /*
   * Test for /GET
   */
  describe("/GET user", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("array");

          done();
        });
    });
  });
  /*
   * Test for /POST
   */
  describe("/POST user", () => {
    it("it should POST a user ", (done) => {
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("age");
          res.body.should.have.property("id");

          done();
        });
    });
  });
  /*
   * Test for /GET:id
   */
  describe("/GET/:id user", () => {
    it("it should GET a book by the given id", (done) => {
      chai
        .request(server)
        .get(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eql(id);
          res.body.should.have.property("age");
          res.body.should.have.property("name").eql(testName);
          done();
        });
    });
  });
  /*
   * Test for /PUT:id
   */
  describe("/PUT/:id user", () => {
    it("it should UPDATE a user given the id", (done) => {
      chai
        .request(server)
        .put(`/api/users/${id}`)
        .send(testAge)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eql(id);
          res.body.should.have.property("name").eql(testName);
          res.body.should.have.property("age");

          done();
        });
    });
  });
  /*
   * Test for /DELETE:id
   */
  describe("/DELETE/:id user", () => {
    it("it should DELETE a user given the id", (done) => {
      chai
        .request(server)
        .delete(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql(`user ${id} removed`);
          done();
        });
    });
  });
});
