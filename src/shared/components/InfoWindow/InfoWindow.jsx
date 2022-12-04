import PropTypes from "prop-types";
import Backdrop from "../Backdrop";
import ButtonUniversal from "../ButtonUniversal";
import styles from "./infoWindow.module.scss";

const InfoWindow = ({ text, onClick }) => {
  return (
    <Backdrop close={onClick}>
      <div className={styles.general}>
        <p className={styles.text}>{text}</p>
        <ButtonUniversal
          type="button"
          text="OK"
          btnStyles={styles.btn}
          isFocusNeeded={true}
          onClick={onClick}
        />
      </div>
    </Backdrop>
  );
};

InfoWindow.defaultProps = {
  onClick: () => {},
};

InfoWindow.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default InfoWindow;
