const express = require("express");
const router = express.Router();

const { getAllUsers,addUser ,getSingleUser ,editUser,deleteUser} = require("../controllers/users");

//Define all end points for user route

//get all users
router.get("/", getAllUsers);

//add user to users data
router.post("/add",addUser)

//get single user
router.get('/single/:userId', getSingleUser)

//update user
router.put("/edit/:userId", editUser)

//delete user
router.delete("/delete/:userId",deleteUser)

module.exports = router;
