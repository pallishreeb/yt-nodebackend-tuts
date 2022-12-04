const Router = require("koa-router");
const router = Router({
  prefix: "/users",
});

let users = [
  {
    id: 1,
    name: "john",
    age: "20",
  },
  {
    id: 2,
    name: "Joe",
    age: "22",
  },
  {
    id: 3,
    name: "Smith",
    age: "21",
  },
  {
    id: 4,
    name: "Bob",
    age: "20",
  },
];

//routes
//get all users
router.get("/", (ctx, next) => {
  console.log("calling from get route");
  ctx.body = {
    status: "Success",
    data: users,
  };
  next();
});

//post
router.post("/add", (ctx, next) => {
  if (!ctx.request.body.name) {
    ctx.response.status = 400;
    ctx.body = {
      status: "fail",
      message: "bad request",
    };
  } else {
    let userId = users[users.length - 1].id + 1;
    users.push({
      id: userId,
      name: ctx.request.body.name,
      age: ctx.request.body.age,
    });

    ctx.body = {
      status: "success",
      data: users,
    };
    next();
  }
});

//upload file
router.post("/upload", (ctx, next) => {
  console.log(ctx.request.files);
  ctx.body = {
    data: ctx.request.files.file,
  };
});

//put
router.put("/edit/:id", (ctx, next) => {
  if (!ctx.request.body.name || !ctx.params.id) {
    ctx.response.status = 400;
    ctx.body = {
      status: "fail",
      message: "Bad request",
    };
  } else {
    let updateIndex = users
      .map(function (user) {
        return user.id;
      })
      .indexOf(parseInt(ctx.params.id));

    if (updateIndex === -1) {
      ctx.body = {
        message: "User does not exist",
      };
    } else {
      users[updateIndex] = {
        id: parseInt(ctx.params.id),
        name: ctx.request.body.name
          ? ctx.request.body.name
          : users[updateIndex].name,
        age: ctx.request.body.age
          ? ctx.request.body.age
          : users[updateIndex].age,
      };

      ctx.body = {
        messgae: "User is updated with id" + ctx.params.id,
        data: users,
      };
    }
  }
  next();
});

//delete
router.delete("/:id", (ctx, next) => {
  if (!ctx.params.id) {
    ctx.body = {
      msg: "Bad request",
    };
  }

  let removeIndex = users
    .map(function (user) {
      return user.id;
    })
    .indexOf(parseInt(ctx.params.id));

  if (removeIndex === -1) {
    ctx.body = {
      msg: "user doesnt exist",
    };
  } else {
    users.splice(removeIndex, 1);
    ctx.body = {
      message: "User is removed from dataset",
      data: users,
    };
  }

  next();
});

router.get("/:id", (ctx, next) => {
  let currentUser = users.filter(function (user) {
    if (user.id == ctx.params.id) {
      return true;
    }
  });

  if (currentUser.length === 1) {
    ctx.body = {
      user: currentUser[0],
    };
  } else {
    ctx.body = {
      message: "user not found",
    };
  }

  next();
});

module.exports = router;
