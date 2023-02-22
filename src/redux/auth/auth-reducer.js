import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as authActions from "./auth-actions";

const initialState = {
  name: "",
  email: "",
  verificationToken: "",
  token: "",
  isLoggedIn: false,
  isVerified: false,
};

const userReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(authActions.signupSuccess, (store, { payload }) => {
      const { name, email, verificationToken } = payload;
      return {
        ...store,
        name,
        email,
        verificationToken,
      };
    })
    .addCase(authActions.verifySuccess, (store, { payload }) => ({
      ...store,
      isVerified: payload.isVerified,
    }))
    .addCase(authActions.clearAuthVerificationToken, (store) => ({
      ...store,
      verificationToken: "",
    }))
    .addCase(authActions.loginSuccess, (store, { payload }) => {
      const { name, email, isVerified, token } = payload;
      return {
        ...store,
        name,
        email,
        isVerified,
        token,
        isLoggedIn: true,
      };
    })
    .addCase(authActions.clearAuthIsVerified, (store) => ({
      ...store,
      isVerified: false,
    }))
    .addCase(authActions.getCurrentSuccess, (store, { payload }) => {
      const { name, email, token, isVerified } = payload;
      return { ...store, name, email, token, isVerified, isLoggedIn: true };
    })
    .addCase(authActions.logoutSuccess, () => initialState)
);

const loadingReducer = createReducer(false, (builder) =>
  builder
    .addCase(authActions.signupRequest, () => true)
    .addCase(authActions.signupSuccess, () => false)
    .addCase(authActions.signupError, () => false)
    .addCase(authActions.verifyRequest, () => true)
    .addCase(authActions.verifySuccess, () => false)
    .addCase(authActions.verifyError, () => false)
    .addCase(authActions.loginRequest, () => true)
    .addCase(authActions.loginSuccess, () => false)
    .addCase(authActions.loginError, () => false)
    .addCase(authActions.getCurrentRequest, () => true)
    .addCase(authActions.getCurrentSuccess, () => false)
    .addCase(authActions.getCurrentError, () => false)
    .addCase(authActions.logoutRequest, () => true)
    .addCase(authActions.logoutSuccess, () => false)
    .addCase(authActions.logoutError, () => false)
);

const errorReducer = createReducer(null, (builder) =>
  builder
    .addCase(authActions.signupError, (_, { payload }) => payload)
    .addCase(authActions.signupRequest, () => null)
    .addCase(authActions.signupSuccess, () => null)
    .addCase(authActions.verifyError, (_, { payload }) => payload)
    .addCase(authActions.verifyRequest, () => null)
    .addCase(authActions.verifySuccess, () => null)
    .addCase(authActions.loginError, (_, { payload }) => payload)
    .addCase(authActions.loginRequest, () => null)
    .addCase(authActions.loginSuccess, () => null)
    .addCase(authActions.getCurrentError, (_, { payload }) => payload)
    .addCase(authActions.getCurrentRequest, () => null)
    .addCase(authActions.getCurrentSuccess, () => null)
    .addCase(authActions.logoutError, (_, { payload }) => payload)
    .addCase(authActions.logoutRequest, () => null)
    .addCase(authActions.logoutSuccess, () => null)
    .addCase(authActions.clearAuthError, () => null)
);

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["token"],
};

const userPersistReducer = persistReducer(userPersistConfig, userReducer);

const authReducer = combineReducers({
  user: userPersistReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default authReducer;
