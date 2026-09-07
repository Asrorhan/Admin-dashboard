import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filters/filterSlice";

const store = configureStore({
  reducer: {
    filters: filterReducer,
  },
});

export default store;
