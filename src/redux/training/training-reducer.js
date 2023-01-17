import { createReducer, combineReducers } from "@reduxjs/toolkit";
import * as trainingActions from "./training-actions";

const contentReducer = createReducer(null, (builder) =>
  builder
    .addCase(trainingActions.checkSuccess, (_, { payload }) => payload)
    .addCase(trainingActions.addNewSuccess, (_, { payload }) => payload)
    .addCase(trainingActions.cleanSuccess, (_, { payload }) => payload)
    .addCase(trainingActions.addResultSuccess, (_, { payload }) => payload)
);

const loadingReducer = createReducer(false, (builder) =>
  builder
    .addCase(trainingActions.checkRequest, () => true)
    .addCase(trainingActions.checkSuccess, () => false)
    .addCase(trainingActions.checkError, () => false)
    .addCase(trainingActions.addNewRequest, () => true)
    .addCase(trainingActions.addNewSuccess, () => false)
    .addCase(trainingActions.addNewError, () => false)
    .addCase(trainingActions.cleanRequest, () => true)
    .addCase(trainingActions.cleanSuccess, () => false)
    .addCase(trainingActions.cleanError, () => false)
    .addCase(trainingActions.addResultRequest, () => true)
    .addCase(trainingActions.addResultSuccess, () => false)
    .addCase(trainingActions.addResultError, () => false)
);

const errorReducer = createReducer(null, (builder) =>
  builder
    .addCase(trainingActions.checkRequest, () => null)
    .addCase(trainingActions.checkSuccess, () => null)
    .addCase(trainingActions.checkError, (_, { payload }) => payload)
    .addCase(trainingActions.addNewRequest, () => null)
    .addCase(trainingActions.addNewSuccess, () => null)
    .addCase(trainingActions.addNewError, (_, { payload }) => payload)
    .addCase(trainingActions.cleanRequest, () => null)
    .addCase(trainingActions.cleanSuccess, () => null)
    .addCase(trainingActions.cleanError, (_, { payload }) => payload)
    .addCase(trainingActions.addResultRequest, () => null)
    .addCase(trainingActions.addResultSuccess, () => null)
    .addCase(trainingActions.addResultError, (_, { payload }) => payload)
);

const trainingReducer = combineReducers({
  content: contentReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default trainingReducer;
