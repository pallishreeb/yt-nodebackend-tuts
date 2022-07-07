const express = require("express");
const app = express();
const ejs = require("ejs");
const session = require("express-session");
const cookeiParser = require("cookie-parser");

const PORT = 5000;

const userData = require("./models/users.json");
const { middleware, middleware2 } = require("./middleware/custom");
const errorHandler = require("./middleware/errHandler");

//imports all routes
const users = require("./routes/users");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookeiParser());
//session middleware
app.use(
  session({
    secret: "mysecret123ghjkk",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000, //1hr
    },
  })
);
app.use(middleware);
app.use(middleware2);

app.set("view engine", "ejs");

//set cookies
app.get("/cookie", (req, res) => {
  console.log(req.cookies);
  res.cookie("name", "express-cookie", { expire: 3600000 });
  res.send("cookie sent to client");
});
//clear cookies
app.get("/clear", (req, res) => {
  console.log(req.cookies);
  res.clearCookie("name");
  res.send("cookie sent to client");
});

//authentication with session
app.get("/auth/:name", (req, res) => {
  // console.log("Session object", req.session);
  console.log("session ID", req.sessionID);

  if (req.session.isAuth == true) {
    return res.json(req.session);
  } else {
    if (req.params.name) {
      req.session.isAuth = true;
      req.session.username = req.params.name;
      return res.json(req.session);
    } else {
      res.json({
        message: "bad Request",
      });
    }
  }
});

//logout
//set cookies
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("ok");
});


//
app.post("/pic", (req,res) => {
  console.log(req.body)
})

//simple html file
app.get("/home", (req, res) => {
  // res.sendFile(process.cwd() + "/views/index.html")
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
