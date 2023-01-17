import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-reducer";
import libraryReducer from "./library/library-reducer";
import trainingReducer from "./training/training-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  library: libraryReducer,
  training: trainingReducer,
});

export default rootReducer;
