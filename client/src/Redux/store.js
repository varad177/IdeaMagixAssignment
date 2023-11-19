import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";
import CourseSliceReducer from "./Slices/CourseSlice";
import LecturesSliceReducer from "./Slices/LecturesSlice";
const store = configureStore({
  reducer: {
    auth : AuthSliceReducer,
    course : CourseSliceReducer,
    lectures : LecturesSliceReducer

  },
  devTools: true,
});

export default store;
