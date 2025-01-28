import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import { PORT } from '../config/envs';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: ['http://localhost:3000', 'http://localhost:5173'] },
});

const userSocketMap: { [userId: string]: any } = {};

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

io.on('connection', socket => {
  console.log('A user connected', socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);

    delete userSocketMap[userId];

    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId];
}

export { io, app, server };
