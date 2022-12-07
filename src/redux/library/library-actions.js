import { createAction } from "@reduxjs/toolkit";

export const addNewRequest = createAction("library/add/request");
export const addNewSuccess = createAction("library/add/success");
export const addNewError = createAction("library/add/error");
