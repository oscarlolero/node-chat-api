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


['send-message', 'send-location',].forEach(e => {
    document.getElementById(e).addEventListener('click', () => {
        let messageBox = document.getElementById('message');
        switch (e) {
            case 'send-message': {
                
                socket.emit('createMessage', {
                    from: 'User',
                    text: messageBox.value
                }, () => {
                    messageBox.value = '';
                });
            }
                break;
            case 'send-location': {
                if (!navigator.geolocation) {
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
            }
            break;
        }
    });
});

document.addEventListener('keypress', (e) => {
    let messageBox = document.getElementById('message');
    if (event.keyCode === 13 || event.which === 13) { //which es para navegadores viejos o otros
        socket.emit('createMessage', {
            from: 'User',
            text: messageBox.value
        }, () => {
            messageBox.value = '';
        });
    }   
});