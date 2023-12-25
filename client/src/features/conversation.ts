import { createSlice } from "@reduxjs/toolkit";
import { IFeedItem, IParticipant } from '../types/types';

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
      const filterConversation = state.conversations.map((item: IFeedItem) => {

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


      state.conversations = filterConversation
    }
  },
});

export const { setConversationState, updateConversations } = conversationSlice.actions;

export default conversationSlice.reducer;
