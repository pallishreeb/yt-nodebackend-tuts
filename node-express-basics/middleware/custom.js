//custom middleware function
function middleware(request, response, next) {
  request.hello = "world";
  console.log("Logging from middleware");
  next();
}

function middleware2(request, response, next) {
  console.log("Logging from middleware two");
  // let err = new Error("It is an error");
  next();
}

module.exports = {
  middleware,
  middleware2,
};
