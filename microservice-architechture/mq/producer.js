const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        const queue = 'message_queue';
        const msg = 'Hello World!';

        ch.assertQueue(queue, { durable: false });
        ch.sendToQueue(queue, Buffer.from(msg));
        console.log(`Sent '${msg}' to ${queue}`);
    });

    setTimeout(function () { conn.close(); process.exit(0); }, 500);
});