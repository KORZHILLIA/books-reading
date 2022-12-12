import { instance } from "./auth";

export const addNew = async (bookData) => {
  const { data } = await instance.post("/books/add", bookData);
  return data.books;
};

export const removeNew = async (bookId) => {
  const { data } = await instance.delete(`books/remove/${bookId}`);
  return data.books;
};
