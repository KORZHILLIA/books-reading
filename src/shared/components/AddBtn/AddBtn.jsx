import { memo } from "react";
import PropTypes from "prop-types";
import ButtonUniversal from "../ButtonUniversal";
import styles from "./addBtn.module.scss";

const AddBtn = ({ onClick, isVisible }) => {
  return (
    <ButtonUniversal
      type="button"
      iconName="plus"
      svgWidth={16}
      svgHeight={16}
      onClick={onClick}
      btnStyles={isVisible ? styles.visible : styles.invisible}
    />
  );
};

AddBtn.defaulProps = {
  onClick: () => {},
};

AddBtn.propTypes = {
  onClick: PropTypes.func,
};

export default memo(AddBtn);
