const express = require("express");
const amqp = require('amqplib/callback_api');
const PORT = 3000;

const app = express()

app.get('/users', (req,res) => {
    let data = {
        id:"1",
        name:"John Doe",
    }
    amqp.connect('amqp://localhost', function (err, conn) {
        conn.createChannel(function (err, ch) {
            const queue = 'message_queue';
            const msg = JSON.stringify(data);

            ch.assertQueue(queue, { durable: false });
            ch.sendToQueue(queue, Buffer.from(msg));
            console.log(`Sent '${msg}' to ${queue}`);
        });

        setTimeout(function () { conn.close(); process.exit(0); }, 500);
    });
    
    res.send("Message from user service")
})


app.listen(PORT, () => console.log('USER SERVICE STARTED'))