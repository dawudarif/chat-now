import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from '../types/types';


const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [] as Array<IMessage>,
  },
  reducers: {
    setMessagesState: (state, action) => {
      state.messages = action.payload;
    },
    addNewMessage: (state, action) => {
      const newMessage = action.payload as IMessage
      const newMessages = [newMessage, ...state.messages]
      state.messages = newMessages
    }
  },
});

export const { setMessagesState, addNewMessage } = messageSlice.actions;

export default messageSlice.reducer;
