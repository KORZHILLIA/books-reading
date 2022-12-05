import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../modules/LoginForm";
import LoginPageQuotes from "../../modules/LoginPageQuotes";
import Spinner from "../../shared/components/Spinner";
import InfoWindow from "../../shared/components/InfoWindow";
import loginPageQuotes from "../../data/login-page-quotes";
import {
  clearAuthError,
  clearAuthIsVerified,
} from "../../redux/auth/auth-actions";
import { verifyUser, loginUser } from "../../redux/auth/auth-operations";
import authSelectors from "../../redux/auth/auth-selectors";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
  const [isModalopen, setIsModalOpen] = useState(false);

  const isFirstRender = useRef(true);
  const { verificationToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(authSelectors.auth);
  const { loading } = auth;
  const { name, isVerified, isLoggedIn } = auth.user;
  const error = useSelector(authSelectors.defineAuthError);

  useEffect(() => {
    if (verificationToken && isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(verifyUser(verificationToken));
    }
    if (isLoggedIn || isVerified || error) {
      setIsModalOpen(true);
    }
  }, [dispatch, verificationToken, error, isVerified, isLoggedIn]);

  const closeModal = () => {
    setIsModalOpen(false);
    if (error) {
      dispatch(clearAuthError());
      return;
    }
    if (isLoggedIn) {
      navigate("/home");
      return;
    }
    if (isVerified) {
      navigate("/login");
      dispatch(clearAuthIsVerified());
    }
  };

  const onSubmit = (userData) => dispatch(loginUser(userData));

  return (
    <div className={styles.general}>
      {loading ? <Spinner /> : null}
      {isModalopen ? (
        <InfoWindow
          text={
            error
              ? error
              : isLoggedIn
              ? `Welcome, ${name}!`
              : "Your email is verified. Please login to start use the app"
          }
          onClick={closeModal}
        />
      ) : null}
      <LoginForm onSubmit={onSubmit} />
      <Link className={styles.link} to="/signup">
        Signup
      </Link>
      <LoginPageQuotes quotes={loginPageQuotes} />
    </div>
  );
};

export default LoginPage;
