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

socketIO.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`);
	socket.on('disconnect', () => {
		console.log(`User disconnected: ${socket.id}`);
	});
});

http.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
