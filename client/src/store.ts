import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/account";
import messageReducer from "./features/messages";
import conversationReducer from "./features/conversation";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    message: messageReducer,
    conversation: conversationReducer
  },
});
