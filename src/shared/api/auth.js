import axios from "axios";

const instance = axios.create({
  baseURL: "https://books-reading.onrender.com/api",
});

const setToken = (token) => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = "";
};

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
  const { token } = data;
  setToken(token);
  return data;
};

export const getCurrent = async (token) => {
  try {
    setToken(token);
    const { data } = await instance("/auth/current");
    return data;
  } catch (error) {
    setToken("");
    throw error;
  }
};

export const logout = async () => {
  await instance.post("/auth/logout");
  setToken("");
};
