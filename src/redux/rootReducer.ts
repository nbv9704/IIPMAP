import { combineReducers } from "@reduxjs/toolkit";
import { industrialAreaApiSlice } from "./slice/industrialAreaApiSlice";

export const rootReducer = combineReducers({
    [industrialAreaApiSlice.reducerPath]: industrialAreaApiSlice.reducer
});