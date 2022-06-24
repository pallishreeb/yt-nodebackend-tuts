let users = require("../models/users.json");

//get all users function

const getAllUsers = (req, res) => {
  console.log(req.hello);
  res.json({ users });
};

const addUser = (req, res) => {
  let { id, name, email, mob } = req.body;

  let newUser = {
    id,
    name,
    email,
    mob,
  };

  if (!id || !name || !email || !mob) {
    return res.status(400).json({
      message: "Please add all values. Filed can not be empty...",
    });
  }

  let newUsers = users.push(newUser);

  res.status(200).json({
    message: "User has added successfully",
    data: users,
  });
};

const getSingleUser = (req, res) => {
  let { userId } = req.params;
  //let userid = req.params.userId

  let user = users.findIndex((user) => user.id == userId);

  let singleUser = users[user];

  res.status(200).json({
    singleUser,
  });
};

const editUser = (req, res) => {
  let { userId } = req.params;
  let { name, mob, email } = req.body;
  console.log(userId);

  let user = users.findIndex((user) => user.id == userId);

  let newdata = {
    id: userId,
    name,
    email,
    mob,
  };

  if (user != -1) {
    users[user] = newdata;
  } else {
    return res.status(400).json({
      message: "user not found with this id.",
    });
  }

  res.status(200).json({
    message: "Updated successfully",
    users,
  });
};

const deleteUser = (req, res) => {
  let { userId } = req.params;

  let user = users.filter((user) => user.id != userId);

  res.status(200).json({
    message: "deleted successfully",
    user,
  });
};

module.exports = {
  getAllUsers,
  addUser,
  getSingleUser,
  editUser,
  deleteUser,
};
