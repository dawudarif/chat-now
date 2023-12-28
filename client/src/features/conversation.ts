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
    updateConversations: (state, action) => {
      const newConversations = state.conversations.map((item: IFeedItem) => {

        const message = action.payload.message
        const userId = action.payload.userId


        if (item.id === message.conversationId) {
          const newParticipants = item.participants.map(
            (participant: IParticipant) => {
              if (participant.userId === userId) {
                return { ...participant, hasSeenLatestMessage: true };
              }
              return participant;
            },
          );

          return {
            ...item,
            latestMessage: { body: message.body },
            latestMessageId: message.id,
            participants: newParticipants,
          };
        }
        return item;
      });


      state.conversations = newConversations
    },
    addNewConversation: (state, action) => {
      const addNewConversations = [action.payload, ...state.conversations]
      state.conversations = addNewConversations
    },
    updateMessageInConversation: (state, action) => {
      const newMessage = action.payload.message as IMessage;
      const userId = action.payload.userId
      console.log(newMessage, userId);



      if (!newMessage || !userId) {
        return;
      }

      console.log(newMessage, userId);

      state.conversations = state.conversations.map((item: IFeedItem) => {
        if (item.id === newMessage.conversationId) {
          const newParticipants = item.participants.map(
            (participant: IParticipant) => {
              if (participant.userId === userId) {
                return { ...participant, hasSeenLatestMessage: false };
              }
              return participant;
            },
          );

          return {
            ...item,
            latestMessage: { body: newMessage.body },
            latestMessageId: newMessage.id,
            participants: newParticipants,
          }
        }

        return item;
      });

    }
  },
});

export const { setConversationState, updateConversations, addNewConversation, updateMessageInConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
