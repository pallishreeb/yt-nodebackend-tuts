const sgMail = require("@sendgrid/mail")
const fs = require("fs")
require("dotenv").config()
sgMail.setApiKey(process.env.SENDGRID_KEY);

let attachments = fs.readFileSync(`${__dirname}/note.pdf`).toString("base64")

const sendEmail = () => {
    const msgConfig = {
        to: "pallishreebehera01@gmail.com",
        from: process.env.EMAIL_FROM,
        subject: "Sendgrind test mail",
        text: "This is a test mail from nodejs using sendgrid",
        attachments: [
            {
                content: attachments,
                filename:"note.pdf",
                type: "application/pdf",
                disposition: "attachment",
            }
        ]
    }


    sgMail.send(msgConfig)
    .then((res) => {
        console.log("Email Sent to: ", msgConfig.to)

    })
    .catch((err) => {
        console.log(err)
    })
}

sendEmail()