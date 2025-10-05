import express from 'express';
import http, { METHODS } from 'http';
import cors from 'cors';
import { Server, Socket } from 'socket.io';

const PORT = 8080;
const app = express();
const server = http.createServer(app);

const io  = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }

});


app.use(cors())

app.get('/', (req, res) => {
    res.send('server is running');
})

io.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit('Callended');
    })

    socket.on('calluser', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('calluser', {signal: signalData, from, name});
    })

    socket.on('answercall', (data) => {
        io.to(data.to).emil('callaccpeted', data.signal);
    })
})


app.listen(PORT)