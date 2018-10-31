let socket = io();

socket.on('connect', () => {
    console.log('Connected to server.');

    socket.emit('createMessage', {
        to: 'jen',
        text: 'huevos'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});

socket.on('newMessage', (newMessage) => {
    console.log('New msg.', newMessage);
});