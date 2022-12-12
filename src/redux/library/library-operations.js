import { addNew, removeNew } from "../../shared/api/library";
import * as libraryActions from "./library-actions";

export const addNewBook = (bookData) => {
  const func = async (dispatch) => {
    dispatch(libraryActions.addNewRequest());
    try {
      const books = await addNew(bookData);
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
    dispatch(libraryActions.addNewRequest());
    try {
      const books = await removeNew(bookId);
      dispatch(libraryActions.removeNewSuccess(books));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(libraryActions.removeNewError(message));
    }
  };
  return func;
};
