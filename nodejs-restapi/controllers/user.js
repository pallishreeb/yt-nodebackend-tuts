const User = require("../models/user");
const { getPostData } = require("../utils");
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single User
// @route   GET /api/user/:id
async function getUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "user Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Create a user
// @route   POST /api/users
async function createUser(req, res) {
  try {
    const body = await getPostData(req);



    const { id, name, age } = JSON.parse(body);

    const user = {
      id,
      name,
      age,
    };

    const newuser = await User.create(user);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newuser));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update a user
// @route   PUT /api/users/:id
async function updateUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "user Not Found" }));
    } else {
      const body = await getPostData(req);

      const { name, age } = JSON.parse(body);

      const userData = {
        name: name || user.name,
        age: age || user.age,
      };

      const upduser = await User.update(id, userData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(upduser));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete User
// @route   DELETE /api/user/:id
async function deleteUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "user Not Found" }));
    } else {
      await User.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `user ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

//create a user
async function addUser(req, res) {
  try {
    
    let body = ""; //initialize an variable to store the body of the request

    //listen to the data event of the request
    req.on("data", (data) => {
      body += data.toString(); //add the data to the body
    });

    //listen to the end event of the request
    req.on("end", async () => {
      //parse the body of the request
      body = JSON.parse(body);

      //create a new user
      const user = await User.create(body);

      //send the response
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    });




  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addUser
};
