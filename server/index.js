// @ts-nocheck
const express = require('express');
const app = express();
const PORT = 5000;
const LOCAL_PORT_VITE = 5173;

const http = require('http').createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');
const socketIO = new Server(http, {
	cors: {
		origin: `http://localhost:${LOCAL_PORT_VITE}`,
	},
});

app.get('/api', (req, res) => {
	res.json({
		message: 'Hello',
	});
});

const users = []

socketIO.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`);
	socket.on('sendMessage', (data) => {
		socketIO.emit('response', data);
	});
	
	socket.on('typing', (data) => { 
		socket.broadcast.emit('responseTyping', data);
	})
	
	socket.on('newUser', (data) => {
		users.push(data)
		socketIO.emit('responseNewUser', users);
	})
	
	socket.on('disconnect', () => {
		console.log(`User disconnected: ${socket.id}`);
	});
});

http.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
