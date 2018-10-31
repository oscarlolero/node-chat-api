const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));
//socket.emi=one connection, io.emit=every connection
io.on('connection', (socket) => {//registrar eventlistener
    console.log('Client connected.');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat.',
        createAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'An user joined to the chat',
        createAt: new Date().getTime()
    });    


    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });

        // socket.broadcast.emit('newMessage', { //que todos vean el mensaje menos el usuario que lo manda
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // });
    });

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});