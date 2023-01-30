export const setLS = (key, value) => localStorage.setItem(key, value);

export const getLS = (key) => {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key);
  }
};

export const clearLS = (key) => localStorage.removeItem(key);
