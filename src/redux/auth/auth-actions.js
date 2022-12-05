import { createAction } from "@reduxjs/toolkit";

export const signupRequest = createAction("auth/signup/request");
export const signupSuccess = createAction("auth/signup/success");
export const signupError = createAction("auth/signup/error");

export const verifyRequest = createAction("auth/verify/request");
export const verifySuccess = createAction("auth/verify/success");
export const verifyError = createAction("auth/verify/error");

export const loginRequest = createAction("auth/login/request");
export const loginSuccess = createAction("auth/login/success");
export const loginError = createAction("auth/login/error");

export const getCurrentRequest = createAction("auth/getCurrent/request");
export const getCurrentSuccess = createAction("auth/getCurrent/success");
export const getCurrentError = createAction("auth/getCurrent/error");

export const logoutRequest = createAction("auth/logout/request");
export const logoutSuccess = createAction("auth/logout/success");
export const logoutError = createAction("auth/logout/error");

export const clearAuthError = createAction("auth/clearError");
export const clearAuthVerificationToken = createAction(
  "auth/clearVerificationToken"
);
export const clearAuthIsVerified = createAction("auth/clearIsVerified");
