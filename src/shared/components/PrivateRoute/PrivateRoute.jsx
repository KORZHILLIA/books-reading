import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "../../../redux/auth/auth-selectors";

const PrivateRoute = () => {
  const auth = useSelector(authSelectors.auth);
  const { isLoggedIn } = auth.user;
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
