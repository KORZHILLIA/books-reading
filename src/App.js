import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authSelectors from "./redux/auth/auth-selectors";
import librarySelectors from "./redux/library/library-selectors";
import trainingSelectors from "./redux/training/training-selectors";
import * as authActions from "./redux/auth/auth-actions";
import { clearLibraryError } from "./redux/library/library-actions";
import { clearTrainingError } from "./redux/training/training-actions";
import { getCurrentUser } from "./redux/auth/auth-operations";
import GeneralRoutes from "./GeneralRoutes";
import Header from "./shared/components/Header";
import Spinner from "./shared/components/Spinner";
import InfoWindow from "./shared/components/InfoWindow";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user,
    loading: authLoading,
    error: authError,
  } = useSelector(authSelectors.auth);
  const { loading: libraryLoading, error: libraryError } = useSelector(
    librarySelectors.library
  );
  const { loading: trainingLoading, error: trainingError } = useSelector(
    trainingSelectors.training
  );
  const { token } = user;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (authError || libraryError || trainingError) {
      if (
        authError === "Not authorized" ||
        libraryError === "Not authorized" ||
        trainingError === "Not authorized"
      ) {
        dispatch(
          authError
            ? authActions.clearAuthError
            : libraryError
            ? clearLibraryError
            : clearTrainingError
        );
        dispatch(authActions.logoutSuccess());
        return;
      }
      openModal();
      return;
    }
    if (!token) {
      navigate("/");
      return;
    }
    dispatch(getCurrentUser(token));
    navigate("/home");
  }, [authError, libraryError, trainingError]);

  return (
    <>
      <Header />
      <GeneralRoutes />
      {(authError || libraryError || trainingError) && isModalOpen ? (
        <InfoWindow
          text={
            authError ? authError : libraryError ? libraryError : trainingError
          }
          onClick={closeModal}
        />
      ) : null}
      {authLoading || libraryLoading || trainingLoading ? <Spinner /> : null}
    </>
  );
}

export default App;
