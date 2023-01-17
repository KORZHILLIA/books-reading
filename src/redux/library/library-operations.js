import * as libraryApi from "../../shared/api/library";
import * as libraryActions from "./library-actions";

export const getAllBooks = () => {
  const func = async (dispatch) => {
    dispatch(libraryActions.getAllRequest());
    try {
      const books = await libraryApi.getAll();
      dispatch(libraryActions.getAllSuccess(books));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(libraryActions.getAllError(message));
    }
  };
  return func;
};

export const addNewBook = (bookData) => {
  const func = async (dispatch) => {
    dispatch(libraryActions.addNewRequest());
    try {
      const books = await libraryApi.addNew(bookData);
      dispatch(libraryActions.addNewSuccess(books));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(libraryActions.addNewError(message));
    }
  };
  return func;
};

export const removeNewBook = (bookId) => {
  const func = async (dispatch) => {
    dispatch(libraryActions.removeNewRequest());
    try {
      const books = await libraryApi.removeNew(bookId);
      dispatch(libraryActions.removeNewSuccess(books));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(libraryActions.removeNewError(message));
    }
  };
  return func;
};

export const relocateBookFromFutureToPresent = (bookId) => {
  const func = async (dispatch) => {
    dispatch(libraryActions.relocateBookFromFutureToPresentRequest());
    try {
      const books = await libraryApi.relocateFromFutureToPresent(bookId);
      dispatch(libraryActions.relocateBookFromFutureToPresentSuccess());
      dispatch(libraryActions.getAllSuccess(books));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(libraryActions.relocateBookFromFutureToPresentError(message));
    }
  };
  return func;
};

export const relocateBookFromPresentToFuture = (bookId) => {
  const func = async (dispatch) => {
    dispatch(libraryActions.relocateBookFromPresentToFutureRequest());
    try {
      const books = await libraryApi.relocateFromPresentToFuture(bookId);
      dispatch(libraryActions.relocateBookFromPresentToFutureSuccess());
      dispatch(libraryActions.getAllSuccess(books));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(libraryActions.relocateBookFromPresentToFutureError(message));
    }
  };
  return func;
};
