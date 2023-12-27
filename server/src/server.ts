import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import conversationRoutes from './routes/conversationRoutes';
import messageRoutes from './routes/messageRoutes';
import userRoutes from './routes/userRoutes';
import { socketManager } from './socket/socketManager';


const app = express();
const server = createServer(app);
export const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

socketManager(io)

// Routes
app.use('/api/users', userRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/message', messageRoutes);


// Start server
server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
