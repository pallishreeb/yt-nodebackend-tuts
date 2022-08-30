const http = require("http");
const URL = require("url");

let server = http.createServer(function (request, response) {
  let urlStr = URL.parse(request.url, true);
  console.log(urlStr);
  response.write(
    `Hello from http server--> ${urlStr.query.year} ${urlStr.query.month} `
  );
  response.end();
});

let port = 3000;
server.listen(port, () => {
  console.log("server is started on port 3000");
});
