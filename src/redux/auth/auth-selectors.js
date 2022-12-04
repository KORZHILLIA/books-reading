const auth = ({ auth }) => auth;

const defineAuthError = ({ auth }) => auth.error?.message;

const authSelectors = {
  auth,
  defineAuthError,
};

export default authSelectors;
