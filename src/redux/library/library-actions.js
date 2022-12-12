import { createAction } from "@reduxjs/toolkit";

export const addNewRequest = createAction("library/add/request");
export const addNewSuccess = createAction("library/add/success");
export const addNewError = createAction("library/add/error");

export const removeNewRequest = createAction("library/remove/request");
export const removeNewSuccess = createAction("library/remove/success");
export const removeNewError = createAction("library/remove/error");
