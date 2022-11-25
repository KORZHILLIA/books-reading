import { memo } from "react";
import PropTypes from "prop-types";
import SVGCreator from "../SVGCreator";

const ButtonUniversal = ({
  type,
  text,
  btnStyles,
  svgStyles,
  iconName,
  svgWidth,
  svgHeight,
  onClick,
}) => {
  return (
    <button className={btnStyles} type={type} onClick={onClick}>
      {text}
      {iconName && (
        <div className={svgStyles}>
          <SVGCreator iconName={iconName} width={svgWidth} height={svgHeight} />
        </div>
      )}
    </button>
  );
};

ButtonUniversal.defaultProps = {
  type: "button",
  text: "",
  btnStyles: "",
  svgStyles: "",
  iconName: "",
  svgWidth: 0,
  svgHeight: 0,
  onClick: () => {},
};

ButtonUniversal.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  btnStyles: PropTypes.string,
  svgStyles: PropTypes.string,
  iconName: PropTypes.string,
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
  onClick: PropTypes.func,
};

export default memo(ButtonUniversal);
