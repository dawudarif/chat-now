import { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';

export const sendMessage = async (req: Request, res: Response) => {
  const { body, conversationId, messageId } = req.body;
  const userId = req.user.id;

  if (!body && !conversationId && !messageId) {
    res.status(500).json('Necessary data not provided');
    return;
  }

  const newMessage = await prisma.message.create({
    data: {
      conversationId,
      id: messageId,
      senderId: userId,
      body,
    },
  });



  const participant = await prisma.conversationParticipant.findFirst({
    where: {
      userId,
      conversationId,
    },
  });

  if (!participant) {
    res.status(500).json('Internal server error');
    return;
  }

  const conversation = await prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      latestMessageId: newMessage.id,
      participants: {
        update: {
          where: {
            id: participant?.id,
          },
          data: {
            hasSeenLatestMessage: true,
          },
        },
        updateMany: {
          where: {
            NOT: {
              userId,
            },
          },
          data: {
            hasSeenLatestMessage: false,
          },
        },
      },
    },
    include: {
      participants: {
        where: {
          NOT: {
            userId: userId,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      latestMessage: {
        include: {
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  });

  if (conversation && newMessage) {
    res.status(200).json({
      "status": true,
      "messageId": newMessage.id
    });
  } else {
    res.status(500).json('something went wrong')
  }

};
