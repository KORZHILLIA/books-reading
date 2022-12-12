import { memo } from "react";
import PropTypes from "prop-types";
import sprite from "../../../assets/svg/sprite.svg";

const SVGCreator = ({ iconName, width, height }) => {
  return (
    <svg
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      width={width}
      height={height}
    >
      <use href={`${sprite}#icon-${iconName}`}></use>
    </svg>
  );
};

SVGCreator.defaultProps = {
  width: 32,
  height: 32,
};

SVGCreator.propTypes = {
  iconName: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default memo(SVGCreator);
