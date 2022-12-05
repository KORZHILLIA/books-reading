import * as authActions from "./auth-actions";
import {
  signup,
  verify,
  login,
  getCurrent,
  logout,
} from "../../shared/api/auth";

export const signupNewUser = (userData) => {
  const func = async (dispatch) => {
    dispatch(authActions.signupRequest());
    try {
      const data = await signup(userData);
      dispatch(authActions.signupSuccess(data));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(authActions.signupError({ message }));
    }
  };
  return func;
};

export const verifyUser = (verificationToken) => {
  const func = async (dispatch) => {
    dispatch(authActions.verifyRequest());
    try {
      const data = await verify(verificationToken);
      dispatch(authActions.verifySuccess(data));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(authActions.verifyError({ message }));
    }
  };
  return func;
};

export const loginUser = (userData) => {
  const func = async (dispatch) => {
    dispatch(authActions.loginRequest());
    try {
      const data = await login(userData);
      dispatch(authActions.loginSuccess(data));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(authActions.loginError({ message }));
    }
  };
  return func;
};

export const getCurrentUser = (token) => {
  const func = async (dispatch) => {
    dispatch(authActions.getCurrentRequest());
    try {
      const data = await getCurrent(token);
      dispatch(authActions.getCurrentSuccess(data));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(authActions.getCurrentError(message));
    }
  };
  return func;
};

export const logoutUser = () => {
  const func = async (dispatch) => {
    dispatch(authActions.logoutRequest());
    try {
      await logout();
      dispatch(authActions.logoutSuccess());
    } catch (error) {
      const { message } = error.response.data;
      dispatch(authActions.logoutError(message));
    }
  };
  return func;
};
