import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { industrialAreaApiSlice } from "./slice/industrialAreaApiSlice";
import { videoApiSlice } from "./slice/videoApiSlice";
import { newsApiSlice } from "./slice/newsApiSlice";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      industrialAreaApiSlice.middleware,
      videoApiSlice.middleware,
      newsApiSlice.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
