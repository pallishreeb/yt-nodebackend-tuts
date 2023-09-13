const express = require("express");
const amqp = require('amqplib/callback_api');
const PORT = 3001;

const app = express()

app.get('/orders', (req, res) => {
    let data ;
    amqp.connect('amqp://localhost', function (err, conn) {
        conn.createChannel(function (err, ch) {
            const queue = 'message_queue';

            ch.assertQueue(queue, { durable: false });
            console.log(`Waiting for messages in ${queue}`);

            ch.consume(queue, function (msg) {
                console.log(`Received '${msg.content.toString()}' from ${queue}`);
                data = msg.content.toString()
                res.send(data)
            }, { noAck: true });
        });
    });

})
app.get('/orders/me', (req, res) => {
    res.send("Message from Order  - Me service")
})

app.listen(PORT, () => console.log('ORDER SERVICE STARTED'))