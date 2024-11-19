const logger = require('./logger/logger');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(cors()); // Allow CORS for HTTP routes
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Define a simple HTTP route for testing
app.get('/', (req, res) => {
    res.send('WebSocket server is running!');
});

// Create an HTTP server with Express
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
});

// WebSocket logic for chat rooms
const MAX_USERS = 5;
const roomQueue = [];
const roomCounts = {};

io.on('connection', (socket) => {
    logger.info('A user connected:', socket.id);

    // Assign user to a room with available space or create a new room
    socket.on('joinRoom', () => {
        const room = findAvailableRoom();
        logger.info(`User ${socket.id} is joining room: ${room}`);
        socket.join(room);

        // Update room count
        roomCounts[room] = (roomCounts[room] || 0) + 1;
        io.to(socket.id).emit('roomCount', roomCounts[room]);
        io.to(room).emit('message', `User joined room ${room}`);
    });

    // Handle message sending
    socket.on('sendMessage', (message) => {
        const room = Array.from(socket.rooms)[1];
        logger.info(`Message from ${socket.id} in room ${room}: ${message}`);
        io.to(room).emit('message', message);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        logger.info(roomCounts);
        const room = Array.from(socket.rooms)[1];
        if (room) {
            roomCounts[room] -= 1;
            logger.info(roomCounts[room]);
            if (roomCounts[room] === 0) {
                // Remove empty rooms from the queue
                const roomIndex = roomQueue.indexOf(room);
                if (roomIndex > -1) roomQueue.splice(roomIndex, 1);
                delete roomCounts[room];
            }
        }
        logger.info(`User ${socket.id} disconnected`);
    });
});

// Function to find or create a room with space available
function findAvailableRoom() {
    for (const room of roomQueue) {
        if (roomCounts[room] < MAX_USERS) return room;
    }
    const newRoom = `room-${Math.random().toString(36).substring(7)}`;
    roomQueue.push(newRoom);
    roomCounts[newRoom] = 0;
    return newRoom;
}

// Start the server on port 3001
const PORT = 3001;
server.listen(PORT, '0.0.0.0', () => {
    logger.info(`Socket.IO server running on http://localhost:${PORT}`);
});