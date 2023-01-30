import PropTypes from "prop-types";
import Backdrop from "../../shared/components/Backdrop";
import SVGCreator from "../../shared/components/SVGCreator";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import styles from "./finishedTrainingWindow.module.scss";

const FinishedTrainingWindow = ({ onNewClick, onBackClick }) => {
  const text =
    "Well done! But you need to be a little bit faster. You can do it)";

  return (
    <Backdrop close={onBackClick}>
      <div className={styles.general}>
        <div className={styles.svg}>
          <SVGCreator iconName="thumb" width={50} height={50} />
        </div>
        <p className={styles.text}>{text}</p>
        <div className={styles.btnsContainer}>
          <ButtonUniversal
            type="button"
            text="New training"
            btnStyles={styles.newBtn}
            onClick={onNewClick}
          />
          <ButtonUniversal
            type="button"
            text="Back"
            btnStyles={styles.backBtn}
            onClick={onBackClick}
          />
        </div>
      </div>
    </Backdrop>
  );
};

FinishedTrainingWindow.propTypes = {
  onNewClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default FinishedTrainingWindow;
