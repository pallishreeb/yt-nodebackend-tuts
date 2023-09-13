const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        const queue = 'message_queue';

        ch.assertQueue(queue, { durable: false });
        console.log(`Waiting for messages in ${queue}`);

        ch.consume(queue, function (msg) {
            console.log(`Received '${msg.content.toString()}' from ${queue}`);
        }, { noAck: true });
    });
});