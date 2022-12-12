import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-reducer";
import libraryReducer from "./library/library-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  library: libraryReducer,
});

export default rootReducer;
