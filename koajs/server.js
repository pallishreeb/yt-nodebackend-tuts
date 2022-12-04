const Koa = require("koa");
const app = new Koa();
const { koaBody } = require("koa-body");
const users = require("./users");

//bodypaser
app.use(
  koaBody({
    multipart: true,
  })
);

//middlware
app.use(async (ctx, next) => {
  console.log("middleware hit");
  await next();
});

//
app.use(users.routes());

app.listen(8000, () => console.log("server is running on port 8000"));
