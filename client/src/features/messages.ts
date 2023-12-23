import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from '../types/types';

const messageSlice = createSlice({
  name: "user",
  initialState: {
    messages: [] as Array<IMessage>,
  },
  reducers: {
    setMessagesState: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setMessagesState } = messageSlice.actions;

export default messageSlice.reducer;
