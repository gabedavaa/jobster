import customFetch from "../../utils/axios";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";
import { logoutUser } from "../user/userSlice";
import authHeader from "../../utils/authHeader";

export const createJobThunk = async (job, thunkAPI) => {
  console.log("add");
  try {
    const res = await customFetch.post("/jobs", job);
    thunkAPI.dispatch(clearValues());
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  console.log("delete");
  thunkAPI.dispatch(showLoading());
  try {
    const res = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return res.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  console.log("edit");
  try {
    const res = await customFetch.patch(`/jobs/${jobId}`, job);

    thunkAPI.dispatch(clearValues());
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
