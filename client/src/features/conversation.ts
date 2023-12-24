import { createSlice } from "@reduxjs/toolkit";
import { IFeedItem } from '../types/types';

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [] as Array<IFeedItem>,
  },
  reducers: {
    setConversationState: (state, action) => {
      state.conversations = action.payload;
    },
  },
});

export const { setConversationState } = conversationSlice.actions;

export default conversationSlice.reducer;
