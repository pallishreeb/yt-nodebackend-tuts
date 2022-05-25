const {findAll,findOne,create,update,deletePost } = require("../controllers/post");
var express = require("express");
var router = express.Router();

//get all posts
router.get("/", findAll);
//find one post
router.get("/:id", findOne);
//create post
router.post("/", create);
//update post
router.put("/:id", update);
//delete post
router.delete("/:id", deletePost);


module.exports = router;