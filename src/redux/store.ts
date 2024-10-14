import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import promptReducer from "./promptSlice";
import { editButtonReducer } from "./btnSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    prompt: promptReducer,
    editButton: editButtonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
