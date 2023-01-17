import { createAction } from "@reduxjs/toolkit";

export const getAllRequest = createAction("library/getAll/request");
export const getAllSuccess = createAction("library/getAll/success");
export const getAllError = createAction("library/getAll/error");

export const addNewRequest = createAction("library/add/request");
export const addNewSuccess = createAction("library/add/success");
export const addNewError = createAction("library/add/error");

export const removeNewRequest = createAction("library/remove/request");
export const removeNewSuccess = createAction("library/remove/success");
export const removeNewError = createAction("library/remove/error");

export const relocateBookFromFutureToPresentRequest = createAction(
  "library/fromFutureToPresent/request"
);
export const relocateBookFromFutureToPresentSuccess = createAction(
  "library/fromFutureToPresent/success"
);
export const relocateBookFromFutureToPresentError = createAction(
  "library/fromFutureToPresent/error"
);

export const relocateBookFromPresentToFutureRequest = createAction(
  "library/fromPresentToFuture/request"
);
export const relocateBookFromPresentToFutureSuccess = createAction(
  "library/fromPresentToFuture/success"
);
export const relocateBookFromPresentToFutureError = createAction(
  "library/fromPresentToFuture/error"
);
