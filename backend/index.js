import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const PORT = 8080;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('server is running');
});

io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);
    
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        socket.broadcast.emit('callEnded');
    });

    socket.on('callUser', ({ userToCall, signalData, from, name }) => {
        console.log(`Call from ${from} to ${userToCall}`);
        io.to(userToCall).emit('callUser', { signal: signalData, from, name });
    });

    socket.on('answerCall', (data) => {
        console.log(`Call answered, sending to ${data.to}`);
        io.to(data.to).emit('callAccepted', data.signal);
    });
});

// CRITICAL: Must use server.listen(), not app.listen()
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});