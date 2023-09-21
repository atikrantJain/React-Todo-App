import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice/index";

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export default store;
