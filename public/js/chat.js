let socket = io();

const scrollToBottom = () => {
    //Selectors VIDEO AUTOSCROLLING LECTURE 120
    let messages = document.querySelector('.top-chat');
    // let newMessage = messages.children('li:last-child');
    // //Heights
    // let clientHeight = messages.prop('clientHeight');
    // let scrollTop = messages.prop('scrollTop');
    // let scrollHeight = messages.prop('scrollHeight');
    // let newMessageHeight = newMessage.innerHeight();
    // let lastMessageHeight = newMessage.prev().innerHeight();

    // if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    //     console.log('should scroll');
    // }
    messages.scrollTop = messages.scrollHeight;
}

socket.on('connect', () => {
    let params = $.deparam(window.location.search);
    socket.emit('join', params, (error) => {
        if(error) {
            alert(error);
            window.location.href = '/';
        }
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});

socket.on('updateUserList', (users) => {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
      ol.append(jQuery('<li></li>').text(user));
    });
  
    jQuery('#users-list').html(ol);
});

socket.on('newMessage', (newMessage) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document.getElementById('message-template').innerHTML;
    let html = Mustache.render(template, {
        text: newMessage.text,
        from: newMessage.from,
        createdAt: formattedTime
    });
    document.getElementById('messages').insertAdjacentHTML('beforeend', html);
    scrollToBottom();
    // // console.log('New message:', newMessage);
    // let markup = `<li>${newMessage.from} ${formattedTime}: ${newMessage.text}</li>`;
    // document.getElementById('messages').insertAdjacentHTML('beforeend', markup);
});

socket.on('newLocationMessage', (newMessage) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document.getElementById('location-message-template').innerHTML;
    let html = Mustache.render(template, {
        text: newMessage.text,
        from: newMessage.from,
        url: newMessage.url,
        createdAt: formattedTime
    });

    document.getElementById('messages').insertAdjacentHTML('beforeend', html);
    scrollToBottom();
    // let markup = `<li>${newMessage.from} ${formattedTime}: <a target="_blank" href="${newMessage.url}">My current location</a></li>`;
    // document.getElementById('messages').insertAdjacentHTML('beforeend', markup);
});


['send-message', 'send-location', ].forEach(e => {
    document.getElementById(e).addEventListener('click', () => {
        let messageBox = document.getElementById('message');
        switch (e) {
            case 'send-message':
                {

                    socket.emit('createMessage', {
                        text: messageBox.value
                    }, () => {
                        messageBox.value = '';
                    });
                }
                break;
            case 'send-location':
                {
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
            text: messageBox.value
        }, () => {
            messageBox.value = '';
        });
    }
});