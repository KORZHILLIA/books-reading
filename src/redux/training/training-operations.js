import * as trainingApi from "../../shared/api/training";
import * as trainingActions from "./training-actions";
import * as libraryActions from "../library/library-actions";

export const checkCurrentTraining = () => {
  const func = async (dispatch) => {
    dispatch(trainingActions.checkRequest());
    try {
      const training = await trainingApi.check();
      dispatch(trainingActions.checkSuccess(training));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(trainingActions.checkError(message));
    }
  };
  return func;
};

export const addNewTraining = (trainingData) => {
  const func = async (dispatch) => {
    dispatch(trainingActions.addNewRequest());
    try {
      const training = await trainingApi.add(trainingData);
      dispatch(trainingActions.addNewSuccess(training));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(trainingActions.addNewError(message));
    }
  };
  return func;
};

export const cleanTraining = () => {
  const func = async (dispatch) => {
    dispatch(trainingActions.cleanRequest());
    try {
      const { books, training } = await trainingApi.remove();
      dispatch(trainingActions.cleanSuccess(training));
      dispatch(libraryActions.getAllSuccess(books));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(trainingActions.cleanError(message));
    }
  };
  return func;
};

export const addTrainingResult = (resultData) => {
  const func = async (dispatch) => {
    dispatch(trainingActions.addResultRequest());
    try {
      const { training } = await trainingApi.addResult(resultData);
      dispatch(trainingActions.addResultSuccess(training));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(trainingActions.addResultError(message));
    }
  };
  return func;
};
