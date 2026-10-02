import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // Temporary placeholder reducer to prevent the console error
    _tmp: (state = null) => state, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;