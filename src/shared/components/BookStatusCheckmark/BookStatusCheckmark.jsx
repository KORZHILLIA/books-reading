import PropTypes from "prop-types";
import SVGCreator from "../SVGCreator";
import styles from "./bookStatusCheckmark.module.scss";

const BookStatusCheckmark = ({ status }) => {
  return (
    <div
      style={{
        border: `1px solid ${status === "present" ? "#A6ABB9" : "#FF6B08"}`,
        fill: "#FF6B08",
      }}
      className={styles.checkbox}
    >
      {status === "past" ? (
        <SVGCreator iconName="checkmark" width={12} height={8} />
      ) : null}
    </div>
  );
};

BookStatusCheckmark.propTypes = {
  status: PropTypes.string.isRequired,
};

export default BookStatusCheckmark;
