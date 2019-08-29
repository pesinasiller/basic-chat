const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = 8000;

const server = express()
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

const messages = [
            { "user": "Carlos C.", "message": "¡Hola! ¿Cómo estás?" },
            { "user": "John Titor.", "message": "bien bien y tú?" }
        ];

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.emit('updateMessages', { messages });
    
    socket.on('newMessage', (messageData) => {
        messages.push(messageData)
        io.emit('updateMessages', { messages })
    });
    
});
