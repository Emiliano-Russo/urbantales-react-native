import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import newTaleReducer from "./newTaleSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    newTale: newTaleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
