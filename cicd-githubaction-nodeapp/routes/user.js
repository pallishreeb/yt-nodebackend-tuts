const express = require("express");
const User = require("../model/user");
const router = express.Router();
const isEmail = require("validator/lib/isEmail");
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, email, phone, hobbies } = req.body;
        if (!isEmail(email)) return res.status(401).send("Invalid Email");
        const user = await User.create({
            name,
            phone,
            email,
            hobbies
        });
        if (user) {
            return res.status(201).json(user);
        } else {
            return res.status(400).send("Invalid user data");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
})

router.put("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).send("user doesn't exist");
        }
        if (req.body.email && !isEmail(req.body.email)){
            return res.status(401).send("Invalid Email");
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body, }, {
            new: true
        });
        if (updatedUser) {
            return res.status(201).json(updatedUser);
        }
        else {
            return res.status(400).send("Invalid user data");
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }

});

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.remove();
            return res.status(200).send("user data deleted");
        } else {
            res.status(404).send("user not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
})

module.exports = router;