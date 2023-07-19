import { combineReducers } from "@reduxjs/toolkit";
import CounterReducer from "./reducers/CounterReducer";
import userSlice from "./slices/UserSlice";
import getAllUserSlice from "./slices/GetAllUserSlice";

const rootReducer = combineReducers({
  userSlice,
  getAllUserSlice,
});

export default rootReducer;
