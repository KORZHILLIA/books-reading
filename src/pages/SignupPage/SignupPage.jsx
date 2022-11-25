import { Link } from "react-router-dom";
import SignupForm from "../../modules/SignupForm";
import styles from "./signupPage.module.scss";

const SignupPage = () => {
  const onSubmit = (state) => {
    console.log(state);
  };

  return (
    <div className={styles.general}>
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
