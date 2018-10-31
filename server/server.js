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

io.on('connection', (socket) => {//registrar eventlistener
    console.log('Client connected.');

    socket.emit('newMessage',{
        from: 'Oscar',
        text: 'Hey!',
        createAt: 123
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    });

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});