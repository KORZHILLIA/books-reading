import axios from "axios";

const instance = axios.create({
  baseURL: "https://books-reading.onrender.com/api",
});

export const signup = async (userData) => {
  const { data } = await instance.post("/auth/signup", { ...userData });
  return data;
};

export const verify = async (verificationToken) => {
  const { data } = await instance(`auth/verify/${verificationToken}`);
  return data;
};

export const login = async (userData) => {
  const { data } = await instance.post("/auth/signin", { ...userData });
  return data;
};
