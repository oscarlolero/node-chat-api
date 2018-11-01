let socket = io();

socket.on('connect', () => {
    console.log('Connected to server.');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});

socket.on('newMessage', (newMessage) => {
    console.log('New message:', newMessage);
    let markup = `<li>${newMessage.from}: ${newMessage.text}</li>`;
    document.getElementById('messages').insertAdjacentHTML('beforeend', markup);
});

document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.getElementById('message').value
    }, () => {

    });
});