import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as libraryActions from "./library-actions";
import distributeBooks from "../../helpers/distributeBooks";

const initialState = {
  future: [],
  present: [],
  past: [],
};

const booksReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(libraryActions.getAllSuccess, (store, { payload }) => {
      return {
        ...store,
        future: distributeBooks(payload, "future"),
        present: distributeBooks(payload, "present"),
        past: distributeBooks(payload, "past"),
      };
    })
    .addCase(libraryActions.addNewSuccess, (store, { payload }) => {
      return {
        ...store,
        future: distributeBooks(payload, "future"),
      };
    })
    .addCase(libraryActions.removeNewSuccess, (store, { payload }) => {
      return {
        ...store,
        future: distributeBooks(payload, "future"),
      };
    })
);

const loadingReducer = createReducer(false, (builder) =>
  builder
    .addCase(libraryActions.getAllRequest, () => true)
    .addCase(libraryActions.getAllSuccess, () => false)
    .addCase(libraryActions.getAllError, () => false)
    .addCase(libraryActions.addNewRequest, () => true)
    .addCase(libraryActions.addNewSuccess, () => false)
    .addCase(libraryActions.addNewError, () => false)
    .addCase(libraryActions.removeNewRequest, () => true)
    .addCase(libraryActions.removeNewSuccess, () => false)
    .addCase(libraryActions.removeNewError, () => false)
    .addCase(libraryActions.relocateBookFromFutureToPresentRequest, () => true)
    .addCase(libraryActions.relocateBookFromFutureToPresentSuccess, () => false)
    .addCase(libraryActions.relocateBookFromFutureToPresentError, () => false)
    .addCase(libraryActions.relocateBookFromPresentToFutureRequest, () => true)
    .addCase(libraryActions.relocateBookFromPresentToFutureSuccess, () => false)
    .addCase(libraryActions.relocateBookFromPresentToFutureError, () => false)
);

const errorReducer = createReducer(null, (builder) =>
  builder
    .addCase(libraryActions.getAllRequest, () => null)
    .addCase(libraryActions.getAllSuccess, () => null)
    .addCase(libraryActions.getAllError, (_, { payload }) => payload)
    .addCase(libraryActions.addNewRequest, () => null)
    .addCase(libraryActions.addNewSuccess, () => null)
    .addCase(libraryActions.addNewError, (_, { payload }) => payload)
    .addCase(libraryActions.removeNewRequest, () => null)
    .addCase(libraryActions.removeNewSuccess, () => null)
    .addCase(libraryActions.removeNewError, (_, { payload }) => payload)
    .addCase(libraryActions.relocateBookFromFutureToPresentRequest, () => null)
    .addCase(libraryActions.relocateBookFromFutureToPresentSuccess, () => null)
    .addCase(
      libraryActions.relocateBookFromFutureToPresentError,
      (_, { payload }) => payload
    )
    .addCase(libraryActions.relocateBookFromPresentToFutureRequest, () => null)
    .addCase(libraryActions.relocateBookFromPresentToFutureSuccess, () => null)
    .addCase(
      libraryActions.relocateBookFromPresentToFutureError,
      (_, { payload }) => payload
    )
);

// const booksPersistConfig = {
//   key: "library",
//   storage,
// };

// const booksPersistReducer = persistReducer(booksPersistConfig, booksReducer);

const libraryReducer = combineReducers({
  // books: booksPersistReducer,
  books: booksReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default libraryReducer;
