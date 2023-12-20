import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes';
import conversationRoutes from './routes/conversationRoutes';
import messageRoutes from './routes/messageRoutes';


const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/message', messageRoutes);



// Socket IO
io.on('connection', (socket) => {
  console.log('Client connected with ID:', socket.id);

  // Listen for events from client
  socket.on('message', (message) => {
    console.log('Message received:', message);
    // Broadcast message to all connected clients
    io.emit('message', message);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  // Your additional event listeners and logic
  // ...
});

// Start server
server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
