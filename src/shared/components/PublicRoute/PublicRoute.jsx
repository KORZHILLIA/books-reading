import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "../../../redux/auth/auth-selectors";

const PublicRoute = () => {
  const auth = useSelector(authSelectors.auth);
  const { isLoggedIn } = auth.user;
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};

export default PublicRoute;
