import { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';

export const createConversation = async (req: Request, res: Response) => {
  const { id, conversationId } = req.body;

  const userId = req.user.id;
  const participantIds = [userId, id];

  if (!id && !conversationId) {
    res.status(500).json('Necessary data not provided');
    return;
  }

  const findConversation = await prisma.conversation.findFirst({
    where: {
      participants: {
        every: {
          userId: {
            in: [userId, id],
          },
        },
      },
    },
    include: {
      participants: {
        select: {
          id: true,
          userId: true,
          hasSeenLatestMessage: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      latestMessage: {
        select: {
          body: true,
        },
      },
    },
  });

  if (findConversation) {
    res.status(200).json(findConversation);
    return;
  }

  const conversation = await prisma.conversation.create({
    data: {
      id: conversationId,
      participants: {
        createMany: {
          data: participantIds.map((id) => ({
            userId: id,
            hasSeenLatestMessage: id === userId,
          })),
        },
      },
    },
    include: {
      participants: {
        select: {
          id: true,
          userId: true,
          hasSeenLatestMessage: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      latestMessage: {
        select: {
          body: true,
        },
      },
    },
  });

  res.status(201).json(conversation);
};

export const allConversations = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const getConversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      participants: {
        select: {
          id: true,
          userId: true,
          hasSeenLatestMessage: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      latestMessage: {
        select: {
          body: true,
        },
      },
    },
  });

  res.status(200).json(getConversations);
};