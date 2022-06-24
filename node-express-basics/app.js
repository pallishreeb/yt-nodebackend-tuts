const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = 5000;

const userData = require("./models/users.json");
const { middleware, middleware2 } = require("./middleware/custom");
const errorHandler = require("./middleware/errHandler");

//imports all routes
const users = require("./routes/users");

//middlewares
app.use(express.json());

app.use(middleware);
app.use(middleware2);

app.set("view engine", "ejs");

//simple html file
app.get("/home", (req, res) => {
  // res.sendFile(process.cwd() + "/views/index.html")
  console.log(req.hello);
  res.render("index", { users: userData });
});
//routes
app.use("/api/users", users);

//catch 404 invalid route error
function invalidError(req, res, next) {
  const error = new Error("URL not supported Or invalid Route");
  error.status = 404;

  next(error);
}
app.use(invalidError);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is started");
});
