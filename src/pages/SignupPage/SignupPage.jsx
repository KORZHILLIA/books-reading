import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignupForm from "../../modules/SignupForm";
import InfoWindow from "../../shared/components/InfoWindow";
import LoginPageQuotes from "../../modules/LoginPageQuotes";
import { clearAuthVerificationToken } from "../../redux/auth/auth-actions";
import { signupNewUser } from "../../redux/auth/auth-operations";
import authSelectors from "../../redux/auth/auth-selectors";
import loginPageQuotes from "../../data/login-page-quotes";
import styles from "./signupPage.module.scss";

const SignupPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(authSelectors.auth);
  const { email, verificationToken } = auth.user;

  useEffect(() => {
    if (verificationToken) {
      setIsModalOpen(true);
    }
  }, [verificationToken]);

  const onSubmit = async (userData) => {
    const { name, email, password } = userData;
    dispatch(signupNewUser({ name, email, password }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (verificationToken) {
      navigate("/login");
      dispatch(clearAuthVerificationToken());
    }
  };

  return (
    <div>
      <div className={styles.general}>
        {isModalOpen ? (
          <InfoWindow
            text={`Signup is successfull. Please check ${email} to verify registration`}
            onClick={closeModal}
          />
        ) : null}
        <SignupForm onSubmit={onSubmit} />
        <p className={styles.lowerText}>
          Already have an account?
          <Link className={styles.link} to="/login">
            Log in
          </Link>
        </p>
      </div>
      <LoginPageQuotes quotes={loginPageQuotes} />
    </div>
  );
};

export default SignupPage;
