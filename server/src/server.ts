import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes';
import conversationRoutes from './routes/conversationRoutes';
import messageRoutes from './routes/messageRoutes';
import { getUserDetails } from './utils/getUserDetails';
import { prisma } from './prisma/prisma';


const app = express();
const server = createServer(app);
export const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/message', messageRoutes);



// Socket IO
io.on('connection', async (socket) => {
  console.log('Client connected with ID:', socket.id);
  const cookies = socket.request.headers.cookie;
  const details = await getUserDetails(cookies!); // Assuming this function retrieves user details

  // Listen for events from client
  socket.on('message', async (message) => {

    console.log('Message received:', message); // Moved the log here for synchronous logging
    // Broadcast message to the sender as well
    socket.emit('message', message);

  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


// Start server
server.listen(4000, () => {
  console.log('Server listening on port 4000');
});




// const conversationId = message?.conversationId;

// if (!conversationId) {
//   console.log('Conversation ID not provided in the message');
//   return;
// }

// try {
//   const conversation = await prisma.conversation.findUnique({
//     where: {
//       id: conversationId,
//     },
//     select: {
//       participants: true,
//     },
//   });

//   if (!conversation) {
//     console.log('Conversation not found');
//     return;
//   }

//   const recipients = conversation.participants.filter(participant => participant.id !== details?.id);

//   // Emit the message to individual sockets of other participants
//   recipients.forEach(async recipient => {
//     const recipientSocket = await io.to(recipient.id).fetchSockets(); // Fetch recipient's socket
//     recipientSocket.forEach(socket => {
//       socket.emit('message', message);
//     });
//   });
