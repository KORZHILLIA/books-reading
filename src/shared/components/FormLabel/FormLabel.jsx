import PropTypes from "prop-types";
import styles from "./formLabel.module.scss";

const FormLabel = ({ text, accent }) => {
  return (
    <p>
      {text}
      {accent ? <span className={styles.accent}> *</span> : null}
    </p>
  );
};

FormLabel.defaultProps = {
  accent: false,
};

FormLabel.propTypes = {
  text: PropTypes.string.isRequired,
  accent: PropTypes.bool,
};

export default FormLabel;
