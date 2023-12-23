import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/account";
import messageReducer from "./features/messages";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    message: messageReducer,
  },
});
