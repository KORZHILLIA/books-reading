import { createReducer, combineReducers } from "@reduxjs/toolkit";
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
    .addCase(authActions.clearAuthError, () => null)
);
const authReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default authReducer;
