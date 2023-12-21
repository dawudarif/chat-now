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


export const getMessages = async (req: Request, res: Response) => {
  const { conversationId } = req.query;
  const userId = req.user.id;

  if (!conversationId) {
    res.status(500).json('Necessary data not provided');
    return;
  }

  const userIsParticipant = await prisma.conversation.findFirst({
    where: {
      id: conversationId as string
      ,
      participants: {
        some: {
          userId
        }
      }
    }
  })


  if (!userIsParticipant) {
    res.status(500).json('Something went wrong');
    return;
  }

  const messages = await prisma.message.findMany({
    where: {
      conversationId: conversationId as string,
    }, include: {
      sender: {
        select: {
          id: true, name: true, username: true
        }
      }
    }
    , orderBy: {
      createdAt: 'desc'
    }
  })

  res.status(200).json(messages);
};
