const { findAll, findAllUsersWithPosts,findOne,update,deleteUserWithPosts,create } = require("../controllers/user");
var express = require("express");
var router = express.Router();


//get all users with their posts
router.get("/", findAllUsersWithPosts);
//find all users
router.get("/", findAll);
//find one user
router.get("/:id", findOne);
//create user
router.post("/", create);
//update user
router.put("/:id", update);
//delete user
router.delete("/:id", deleteUserWithPosts);


module.exports = router;