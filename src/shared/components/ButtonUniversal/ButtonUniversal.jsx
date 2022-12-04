import { useEffect, useRef } from "react";
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
  isFocusNeeded,
  onClick,
}) => {
  const btn = useRef();

  useEffect(() => {
    if (isFocusNeeded) {
      btn.current.focus();
    }
  }, [isFocusNeeded]);

  return (
    <button ref={btn} className={btnStyles} type={type} onClick={onClick}>
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
  isFocusNeeded: false,
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
  isFocusNeeded: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(ButtonUniversal);
