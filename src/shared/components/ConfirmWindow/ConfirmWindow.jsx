import PropTypes from "prop-types";
import Backdrop from "../Backdrop";
import ButtonUniversal from "../ButtonUniversal";
import styles from "./confirmWindow.module.scss";

const ConfirmWindow = ({ text, onYesClick, onCancelClick }) => {
  return (
    <Backdrop close={onCancelClick}>
      <div className={styles.general}>
        <p className={styles.text}>{text}</p>
        <div className={styles.btnsContainer}>
          <ButtonUniversal
            type="button"
            text="Yes"
            btnStyles={styles.yesBtn}
            onClick={onYesClick}
          />
          <ButtonUniversal
            type="button"
            text="Cancel"
            btnStyles={styles.cancelBtn}
            onClick={onCancelClick}
          />
        </div>
      </div>
    </Backdrop>
  );
};

ConfirmWindow.propTypes = {
  text: PropTypes.string.isRequired,
  onYesClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

export default ConfirmWindow;
