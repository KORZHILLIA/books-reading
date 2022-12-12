import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as libraryActions from "./library-actions";

const initialState = {
  future: [],
  present: [],
  past: [],
};

const booksReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(libraryActions.addNewSuccess, (store, { payload }) => {
      const futureBooks = payload.filter((book) => book.status === "future");
      return {
        ...store,
        future: futureBooks,
      };
    })
    .addCase(libraryActions.removeNewSuccess, (store, { payload }) => {
      const futureBooks = payload.filter((book) => book.status === "future");
      return {
        ...store,
        future: futureBooks,
      };
    })
);

const loadingReducer = createReducer(false, (builder) =>
  builder
    .addCase(libraryActions.addNewRequest, () => true)
    .addCase(libraryActions.addNewSuccess, () => false)
    .addCase(libraryActions.addNewError, () => false)
    .addCase(libraryActions.removeNewRequest, () => true)
    .addCase(libraryActions.removeNewSuccess, () => false)
    .addCase(libraryActions.removeNewError, () => false)
);

const errorReducer = createReducer(null, (builder) =>
  builder
    .addCase(libraryActions.addNewRequest, () => null)
    .addCase(libraryActions.addNewSuccess, () => null)
    .addCase(libraryActions.addNewError, (_, { payload }) => payload)
    .addCase(libraryActions.removeNewRequest, () => null)
    .addCase(libraryActions.removeNewSuccess, () => null)
    .addCase(libraryActions.removeNewError, (_, { payload }) => payload)
);

const booksPersistConfig = {
  key: "library",
  storage,
};

const booksPersistReducer = persistReducer(booksPersistConfig, booksReducer);

const libraryReducer = combineReducers({
  books: booksPersistReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default libraryReducer;
