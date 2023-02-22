import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../modules/LoginForm";
import LoginPageQuotes from "../../modules/LoginPageQuotes";
import InfoWindow from "../../shared/components/InfoWindow";
import loginPageQuotes from "../../data/login-page-quotes";
import { clearAuthIsVerified } from "../../redux/auth/auth-actions";
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
  const { name, isVerified, isLoggedIn } = auth.user;

  useEffect(() => {
    if (verificationToken && isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(verifyUser(verificationToken));
    }
    if (isLoggedIn || isVerified) {
      setIsModalOpen(true);
    }
  }, [dispatch, verificationToken, isVerified, isLoggedIn]);

  const closeModal = () => {
    setIsModalOpen(false);
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
      <LoginForm onSubmit={onSubmit} />
      <LoginPageQuotes quotes={loginPageQuotes} isPsnAdjustNeeded={true} />
      {isModalopen ? (
        <InfoWindow
          text={
            isLoggedIn
              ? `Welcome, ${name}!`
              : "Your email is verified. Please login to start use the app"
          }
          onClick={closeModal}
        />
      ) : null}
    </div>
  );
};

export default LoginPage;
