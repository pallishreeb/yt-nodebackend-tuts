var express = require("express");
var app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

//port
const port = process.env.PORT || 3000;

//route
app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));

app.listen(port, function () {
  console.log("Node app is running on port 3000");
});
