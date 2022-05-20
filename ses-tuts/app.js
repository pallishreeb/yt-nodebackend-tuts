const express = require('express');
const app = express()   
const sendEmail = require('./ses.js');

const port =  3000;

app.get("/", (req,res) => {
    sendEmail()
    res.send("welcome")
})

app.listen(port , () =>{
    console.log(`server is running on port ${port}`)
})