import { memo } from "react";
import PropTypes from "prop-types";
import ButtonUniversal from "../ButtonUniversal";
import styles from "./closeBtn.module.scss";

const CloseBtn = ({ onClick, position }) => {
  const [verticalPosition, horizontalPosition] = Object.keys(position);
  return (
    <div
      style={{
        [verticalPosition]: `${position[verticalPosition]}px`,
        [horizontalPosition]: `${position[horizontalPosition]}px`,
      }}
      className={styles.general}
      onClick={onClick}
    >
      <ButtonUniversal
        type="button"
        iconName="cross"
        svgWidth={10}
        svgHeight={10}
        btnStyles={styles.closeBtn}
        svgStyles={styles.close}
      />
    </div>
  );
};

CloseBtn.defaultProps = {
  onClick: () => {},
  position: { top: 0, left: 0 },
};

CloseBtn.propTypes = {
  onClick: PropTypes.func,
  position: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,
};

export default memo(CloseBtn);
