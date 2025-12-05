import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { industrialAreaApiSlice } from "./slice/industrialAreaApiSlice";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(industrialAreaApiSlice.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
