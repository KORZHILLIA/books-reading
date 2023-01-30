import { instance } from "./auth";

export const getAll = async () => {
  const { data } = await instance("/books/getAll");
  return data.books;
};

export const addNew = async (bookData) => {
  const { data } = await instance.post("/books/add", bookData);
  return data.books;
};

export const removeNew = async (bookId) => {
  const { data } = await instance.delete(`books/remove/${bookId}`);
  return data.books;
};

export const relocateFromFutureToPresent = async (bookId) => {
  const { data } = await instance.post(`/books/relocate/ftpr/${bookId}`);
  return data.books;
};

export const relocateFromPresentToFuture = async (bookId) => {
  const { data } = await instance.post(`books/relocate/prtf/${bookId}`);
  return data.books;
};

export const changeResume = async (bookId, resumeData) => {
  const { data } = await instance.patch(`books/resume/${bookId}`, resumeData);
  return data.books;
};
