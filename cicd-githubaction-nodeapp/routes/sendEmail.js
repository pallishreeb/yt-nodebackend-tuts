const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
var ejs = require("ejs");
const fs = require("fs");
const dotenv = require("dotenv")
dotenv.config()

const options = {
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.PASSWORD,
    },
};
const transporter = nodemailer.createTransport(options);

// send email 
router.post("/", async (req, res) => {

    let user = []
   
    // console.log(req.body)

    if(!req.body){
        return res.send("please send data")
    }else{
        user = req.body
    }
    
    try {
        let data = await ejs.renderFile(__dirname + "/index.ejs", { users: user })
        const mailOptions = {
            to: process.env.EMAIL_TO,
            from: process.env.EMAIL_FROM,
            subject: "user info and hobbies",
            html: data
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        })
        return res.status(200).send('Email sent successfully')
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error')
    }
})

module.exports = router;