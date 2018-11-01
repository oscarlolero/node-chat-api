let socket = io();

socket.on('connect', () => {
    console.log('Connected to server.');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});

socket.on('newMessage', (newMessage) => {
    // console.log('New message:', newMessage);
    let markup = `<li>${newMessage.from}: ${newMessage.text}</li>`;
    document.getElementById('messages').insertAdjacentHTML('beforeend', markup);
});

socket.on('newLocationMessage', (newMessage) => {
    let markup = `<li>${newMessage.from}: <a target="_blank" href="${newMessage.url}">My current location</a></li>`;
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

var locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        alert('Unable to fetch location.')
    });

});




