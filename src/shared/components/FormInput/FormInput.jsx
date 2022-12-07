import { useMemo, memo } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

const FormInput = ({
  children,
  label,
  type,
  name,
  value,
  required,
  autocomplete,
  onChange,
  onBlur,
  placeholder,
  generalStyle,
  labelStyle,
  inputStyle,
}) => {
  const inputId = useMemo(() => nanoid(2), []);
  return (
    <div className={generalStyle} style={{ position: "relative" }}>
      {label ? (
        <label className={labelStyle} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        className={inputStyle}
        id={inputId}
        type={type}
        name={name}
        value={value}
        required={required}
        autoComplete={autocomplete}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {children}
    </div>
  );
};

FormInput.defaultProps = {
  label: "",
  type: "text",
  required: true,
  autocomplete: "off",
  onChange: () => {},
  onBlur: () => {},
  placeholder: "",
};

FormInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  type: PropTypes.string,
  required: PropTypes.bool,
  autocomplete: PropTypes.oneOf(["on", "off"]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  generalStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  inputStyle: PropTypes.string,
};
export default memo(FormInput);
