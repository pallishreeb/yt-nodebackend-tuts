const express = require("express");
const fs = require("fs"),
  xml2js = require("xml2js");
const PORT = 5000;

var parser = new xml2js.Parser();
const app = express();

app.get("/xml", function (req, res) {
  res.sendFile(__dirname + "/sitemap.xml");
});

app.get("/sitemap", function (req, res) {
  fs.readFile(__dirname + "/sitemap.xml", function (err, data) {
    parser.parseString(data, function (err, result) {
      console.dir(JSON.stringify(result));
      console.log("Done");
      res.json({
        result,
      });
    });
  });
});

app.listen(PORT, () => {
  console.log("Server started");
});
