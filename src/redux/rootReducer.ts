import { combineReducers } from "@reduxjs/toolkit";
import { industrialAreaApiSlice } from "./slice/industrialAreaApiSlice";
import { videoApiSlice } from "./slice/videoApiSlice";
import { newsApiSlice } from "./slice/newsApiSlice";

export const rootReducer = combineReducers({
    [industrialAreaApiSlice.reducerPath]: industrialAreaApiSlice.reducer,
    [videoApiSlice.reducerPath]: videoApiSlice.reducer,
    [newsApiSlice.reducerPath]: newsApiSlice.reducer,
});