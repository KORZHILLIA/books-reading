import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import authSelectors from "./redux/auth/auth-selectors";
import { getCurrentUser } from "./redux/auth/auth-operations";
import GeneralRoutes from "./GeneralRoutes";
import Header from "./shared/components/Header";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(authSelectors.auth);
  const { token } = auth.user;

  useEffect(() => {
    dispatch(getCurrentUser(token));
  }, []);

  return (
    <>
      <Header />
      <GeneralRoutes />
    </>
  );
}

export default App;
