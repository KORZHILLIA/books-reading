import * as authActions from "./auth-actions";
import { signup, verify, login } from "../../shared/api/auth";

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
