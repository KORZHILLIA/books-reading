import LoginForm from "../../modules/LoginForm";
import LoginPageQuotes from "../../modules/LoginPageQuotes";
import loginPageQuotes from "../../data/login-page-quotes";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
  const onSubmit = (state) => console.log(state);
  return (
    <div className={styles.general}>
      <LoginForm onSubmit={onSubmit} />
      <LoginPageQuotes quotes={loginPageQuotes} />
    </div>
  );
};

export default LoginPage;
