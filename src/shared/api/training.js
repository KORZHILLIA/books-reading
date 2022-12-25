import { instance } from "./auth";

export const check = async () => {
  const { data } = await instance("/training/check");
  return data.training;
};

export const add = async (trainingData) => {
  const { data } = await instance.post("/training/add", trainingData);
  return data.training;
};
