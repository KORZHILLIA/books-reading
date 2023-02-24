const patterns = {
  name: {
    regExp: /^\w{4,30}$/,
  },
  email: {
    regExp: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //regExp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    regExp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/,
  },
};

export default patterns;
