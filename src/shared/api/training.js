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
  const { data } = await instance.post("/training/remove");
  return data;
};

export const addResult = async (resultData) => {
  const { data } = await instance.post("/training/addresult", resultData);
  console.log(data);
  return data;
};
