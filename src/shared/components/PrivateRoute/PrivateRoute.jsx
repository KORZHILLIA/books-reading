import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "../../../redux/auth/auth-selectors";

const PrivateRoute = () => {
  const { user } = useSelector(authSelectors.auth);
  const { isLoggedIn } = user;
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
