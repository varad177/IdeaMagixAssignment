import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import axiosinstance from "../../helpers/axiosInstance";

const initialState = {
  lectures: [],
};

export const getCourseLectures = createAsyncThunk(
  "/course/lectures/get",
  async (cid) => {
    try {
      const response = axiosinstance.get(`/course/${cid}`);
      toast.promise(response, {
        loading: "fetching lectures",
        success: "lectures loaded",
        error: "failed to load the lectures",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLectures = createAsyncThunk(
  "/course/lectures/add",
  async (data) => {
    try {
      const response = axiosinstance.post(`/course/${data.id}`, data);
      console.log(response);
      toast.promise(response, {
        loading: "adding lecture",
        success: "lectures added successfully",
        error: "failed to add the lecture",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCourseLectures = createAsyncThunk(
  "/course/lectures/delete",
  async (data) => {
    console.log(data);
    try {
      const response = axiosinstance.delete(
        `/course/?courseid=${data.courseid}&lectureid=${data.lectureid}`
      );
      toast.promise(response, {
        loading: "deleting lecture",
        success: "lectures deleted",
        error: "failed to delete the lecture",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const assignLecture = createAsyncThunk(
  "/course/lectures/asignlecture",
  async (data) => {
    console.log(data);
    try {
      const response = axiosinstance.put(
        `/course/?cid=${data.cid}&lid=${data.lid}` ,data.data
      );
      toast.promise(response, {
        loading: "assigning lecture",
        success: "lectures Assigned",
        error: "failed to assign the lecture",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lecturesSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseLectures.fulfilled, (state, action) => {
      console.log(action.payload);
      state.lectures = action?.payload?.lectures;
    });
    builder.addCase(addCourseLectures.fulfilled, (state, action) => {
      console.log(action.payload);
      state.lectures = action?.payload?.course?.lectures;
    });
  },
});

export default lecturesSlice.reducer;
