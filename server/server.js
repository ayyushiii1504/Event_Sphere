import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import Message from './models/Message.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// allow frontend origin (set CLIENT_URL in .env). Fallback '*' for quick local testing.
const CLIENT_URL = process.env.CLIENT_URL || '*';
app.use(cors({ origin: CLIENT_URL, credentials: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/chat', chatRoutes);

// error handler middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({ message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack });
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// socket.io for event chat
const io = new Server(server, {
  cors: { origin: CLIENT_URL, methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('joinEvent', (eventId) => {
    if (!eventId) return;
    socket.join(eventId);
    console.log(`${socket.id} joined ${eventId}`);
  });

  // payload: { eventId, senderId, senderName, text }
  socket.on('sendMessage', async (payload) => {
    try {
      const { eventId, senderId, senderName, text } = payload || {};
      if (!eventId || !text) return;

      // create and save message to DB
      const msgDoc = new Message({
        eventId,
        senderId: senderId || null,
        senderName: senderName || 'Anonymous',
        text,
        timestamp: new Date(),
      });
      const saved = await msgDoc.save();

      // Broadcast saved message to everyone in the room
      const broadcastMsg = {
        _id: saved._id,
        eventId: saved.eventId,
        senderId: saved.senderId,
        senderName: saved.senderName,
        text: saved.text,
        timestamp: saved.timestamp,
      };

      io.to(eventId).emit('receiveMessage', broadcastMsg);
    } catch (err) {
      console.error('Socket sendMessage error:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`.cyan.bold));
