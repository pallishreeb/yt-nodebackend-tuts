const express = require("express");
const nodemailer = require("nodemailer");
var ejs = require("ejs");
const dotenv = require("dotenv")
dotenv.config()

const app = express()
app.use(express.json())

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
app.post("/", async (req, res) => {

    let user = []

    // console.log(req.body)

    if (!req.body.users) {
        return res.send("please send data")
    } else {
        user = req.body.users
    }

    try {
        let data = await ejs.renderFile(__dirname + "/index.ejs", { users: user })
        const mailOptions = {
            to: process.env.EMAIL_TO,
            from: process.env.EMAIL_FROM,
            subject: "User details",
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

app.listen(3000, () => {
    console.log("Server is runninng on port 3000")
})