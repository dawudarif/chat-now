import { createSlice } from "@reduxjs/toolkit";
import { IFeedItem, IMessage, IParticipant } from '../types/types';

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [] as Array<IFeedItem>,
  },
  reducers: {
    setConversationState: (state, action) => {
      state.conversations = action.payload;
    },
    addNewConversation: (state, action) => {
      const addNewConversations = [action.payload, ...state.conversations]
      state.conversations = addNewConversations
    },
    updateMessageInConversation: (state, action) => {
      const newMessage = action.payload.message as IMessage;
      const userId = action.payload.userId
      const selectedConversation = action.payload.selected

      if (!newMessage || !userId) {
        return;
      }

      const updatedConversations = state.conversations.map((item: IFeedItem) => {
        const isSelected = item.id === selectedConversation ? true : false

        if (item.id === newMessage.conversationId) {
          const newParticipants = item.participants.map(
            (participant: IParticipant) => {
              if (participant.userId === userId) {
                return { ...participant, hasSeenLatestMessage: isSelected };
              }
              return participant;
            },
          );

          return {
            ...item,
            latestMessage: { body: newMessage.body },
            latestMessageId: newMessage.id,
            participants: newParticipants,
            updatedAt: new Date().toISOString()
          }
        }

        return item;
      });


      const sortedConversations = updatedConversations.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);

        // @ts-ignore
        return dateB - dateA; // Ascending order
      });

      state.conversations = sortedConversations

    }
  },
});

export const { setConversationState, addNewConversation, updateMessageInConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
