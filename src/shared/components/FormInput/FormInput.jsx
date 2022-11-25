import { useMemo, memo } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

const FormInput = ({
  label,
  type,
  name,
  value,
  required,
  autocomplete,
  onChange,
  placeholder,
  labelStyle,
  inputStyle,
}) => {
  const inputId = useMemo(() => nanoid(2), []);
  return (
    <>
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
        placeholder={placeholder}
      />
    </>
  );
};

FormInput.defaultProps = {
  label: "",
  type: "text",
  required: true,
  autocomplete: "off",
  onChange: () => {},
  placeholder: "",
};

FormInput.propTypes = {
  label: PropTypes.element,
  type: PropTypes.string,
  required: PropTypes.bool,
  autocomplete: PropTypes.oneOf(["on", "off"]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  labelStyle: PropTypes.string,
  inputStyle: PropTypes.string,
};
export default memo(FormInput);
