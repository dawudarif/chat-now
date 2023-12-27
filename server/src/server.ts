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

  socket.on('join_user', (id) => {
    try {
      if (id === details?.id) {
        console.log('user connected', id);
        socket.join(id)
      }
    } catch (error) {
      console.log(error);
    }
  })

  socket.on('join_conversation', (conversationId) => {
    prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          some: {
            userId: details?.id
          }
        }
      }
    }).then((conversation) => {
      if (!conversation) {
        console.log('Conversation not found');
        return;
      } else {
        console.log('user connected to conversation', conversationId);

        socket.join(conversationId)
      }
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  })

  socket.on('send_message', (message) => {
    const conversationId = message?.conversationId;

    if (!conversationId) {
      console.log('Conversation ID not provided in the message');
      return;
    }

    prisma.conversation
      .findUnique({
        where: {
          id: conversationId,
          participants: {
            some: {
              userId: details?.id,
            },
          },
        },
        select: {
          participants: true,
        },
      })
      .then((conversation) => {
        if (!conversation) {
          console.log('Conversation not found');
          return;
        } else {
          socket.to(message.conversationId).emit('receive_message', message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  socket.on('create-conversation', (conversation) => {
    prisma.conversation.findFirst({
      where: {
        id: conversation.id,
      }, select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        latestMessage: {
          select: {
            body: true
          }
        },
        latestMessageId: true,
        participants: {
          select: {
            hasSeenLatestMessage: true,
            id: true,
            user: {
              select: {
                name: true, username: true
              }
            },
            userId: true
          }
        }
      }
    }).then((conversation) => {
      if (!conversation) {
        console.log('Conversation not found');
        return;
      } else {
        const otherParticipant = conversation.participants.find((item) => item.userId !== details?.id)
        if (otherParticipant) {
          socket.to(otherParticipant?.userId).emit('receive-new-conversation', conversation);
        }
      }
    })
      .catch((error) => {
        console.error('Error:', error);
      });
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
