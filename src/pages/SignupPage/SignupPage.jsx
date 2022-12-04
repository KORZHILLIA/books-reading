import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignupForm from "../../modules/SignupForm";
import InfoWindow from "../../shared/components/InfoWindow";
import Spinner from "../../shared/components/Spinner/Spinner";
import {
  clearAuthError,
  clearAuthVerificationToken,
} from "../../redux/auth/auth-actions";
import { signupNewUser } from "../../redux/auth/auth-operations";
import authSelectors from "../../redux/auth/auth-selectors";
import styles from "./signupPage.module.scss";

const SignupPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(authSelectors.auth);
  const { loading } = auth;
  const { email, verificationToken } = auth.user;
  const error = useSelector(authSelectors.defineAuthError);

  useEffect(() => {
    if (error || verificationToken) {
      setIsModalOpen(true);
    }
  }, [error, verificationToken]);

  const onSubmit = async (userData) => {
    const { name, email, password } = userData;
    dispatch(signupNewUser({ name, email, password }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (error) {
      dispatch(clearAuthError());
      return;
    }
    if (verificationToken) {
      navigate("/login");
      dispatch(clearAuthVerificationToken());
    }
  };

  return (
    <div className={styles.general}>
      {loading ? <Spinner /> : null}
      {isModalOpen ? (
        <InfoWindow
          text={
            error
              ? `${error}, try again`
              : `Signup is successfull. Please check ${email} to verify registration`
          }
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
  );
};

export default SignupPage;
