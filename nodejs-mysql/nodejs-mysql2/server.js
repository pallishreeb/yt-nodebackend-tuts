var express = require("express");
var app = express();
var mysql = require("mysql2");
app.use(express.json());

//ALTER TABLE users ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST
// default route
app.get("/", function (req, res) {
  return res.send({ error: true, message: "hello" });
});
// connection configurations
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "******",
  database: "node_mysql_api",
});
// connect to database
dbConn.connect();
// Retrieve all users
app.get("/users", function (req, res) {
  dbConn.query("SELECT * FROM users", function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "users list." });
  });
});
// Retrieve user with id
app.get("/user/:id", function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  dbConn.query(
    "SELECT * FROM users where id=?",
    user_id,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "users list.",
      });
    }
  );
});
// Add a new user
app.post("/user", function (req, res) {
  // let user = req.body.user;

  let user = {
    name: "John",
    email: "john@gmail.com",
    address: "abcd",
  };

  let values = [[user.name, user.email, user.address]];
  console.log(user);
  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user" });
  }
  dbConn.query(
    "INSERT INTO users (name,email, address) VALUES ? ",
    [values],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "New user has been created successfully.",
      });
    }
  );
});
//  Update user with id
app.put("/user/:id", function (req, res) {
  let user_id = req.params.id;
  // let user = req.body.user;
  let user = {
    name: "John1",
    email: "john@gmail.com",
    address: "abcd",
  };

  if (!user_id || !user) {
    return res
      .status(400)
      .send({ error: user, message: "Please provide user and user_id" });
  }
  dbConn.query(
    "UPDATE users SET ? WHERE id = ?",
    [user, user_id],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "user has been updated successfully.",
      });
    }
  );
});
//  Delete user
app.delete("/user/:id", function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  dbConn.query(
    "DELETE FROM users WHERE id = ?",
    [user_id],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "User has been updated successfully.",
      });
    }
  );
});
// set port
app.listen(3000, function () {
  console.log("Node app is running on port 3000");
});
module.exports = app;
