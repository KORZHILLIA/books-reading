import { instance } from "./auth";

export const check = async () => {
  const { data } = await instance("/training/check");
  return data.training;
};

export const add = async (trainingData) => {
  const { data } = await instance.post("/training/add", trainingData);
  return data.training;
};

export const remove = async () => {
  const { data: trainingData } = await instance.post("/training/remove");
  const { data: booksData } = await instance.get("books/getAll");
  const { training } = trainingData;
  const { books } = booksData;
  return { books, training };
};

export const addResult = async (resultData) => {
  const { data } = await instance.post("/training/addresult", resultData);
  return data;
};

export const makeInactive = async () => {
  const { data } = await instance.patch("training/stop");
  return data.training;
};
