let users = require("../data/users");
const { writeDataToFile } = require("../utils");

function find() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

function create(user) {
  return new Promise((resolve, reject) => {
    const newUser = { ...user };
    users.push(newUser);
    // resolve(users);

    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/users.json", users);
    }
    resolve(newUser);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const user = users.find((p) => p.id === id);
    resolve(user);
  });
}
function update(id, user) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((p) => p.id === id);
    users[index] = { id, ...user };
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/users.json", users);
    }
    resolve(users[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    users = users.filter((p) => p.id !== id);
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("./data/users.json", users);
    }
    resolve();
  });
}
module.exports = {
  find,
  create,
  findById,
  update,
  remove,
};
