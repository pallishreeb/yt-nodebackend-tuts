const http = require("http");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  addUser
} = require("./controllers/user");

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.write("<h1>Hello World</h1>");
//   res.end();
//   // res.writeHead(200,{'Content-Type':'text/plain'});
//   // res.end('Hello World');
// });

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    getUsers(req, res);
  } else if (req.url.match(/\/api\/users\/\w+/) && req.method === "GET") {
    //matching the url with the regex /api/users/any number
    const id = req.url.split("/")[3];
    getUser(req, res, id);
  } else if (req.url === "/api/user" && req.method === "POST") {
    addUser(req, res);
  } else if (req.url.match(/\/api\/users\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateUser(req, res, id);
  } else if (req.url.match(/\/api\/users\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 5000;
module.exports = server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
