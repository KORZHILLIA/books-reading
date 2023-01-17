import { createAction } from "@reduxjs/toolkit";

export const checkRequest = createAction("training/check/request");
export const checkSuccess = createAction("training/check/success");
export const checkError = createAction("training/check/error");

export const addNewRequest = createAction("training/add/request");
export const addNewSuccess = createAction("training/add/success");
export const addNewError = createAction("training/add/error");

export const cleanRequest = createAction("training/clean/request");
export const cleanSuccess = createAction("training/clean/success");
export const cleanError = createAction("training/clean/error");

export const addResultRequest = createAction("training/addResult/request");
export const addResultSuccess = createAction("training/addResult/success");
export const addResultError = createAction("training/addResult/error");
