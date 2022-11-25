import { useNavigate } from "react-router-dom";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import styles from "./introButtons.module.scss";

const IntroButtons = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.btns}>
      <ButtonUniversal
        type="button"
        text="Log in"
        btnStyles={styles.loginBtn}
        onClick={() => navigate("/login")}
      />
      <ButtonUniversal
        type="button"
        text="Register"
        btnStyles={styles.registerBtn}
        onClick={() => navigate("/signup")}
      />
    </div>
  );
};

export default IntroButtons;
