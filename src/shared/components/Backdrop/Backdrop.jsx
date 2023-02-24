import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./backdrop.module.scss";

const backdrop = document.getElementById("backdrop");

const Backdrop = ({ children, close }) => {
  const handleClose = useCallback(
    (event) => {
      if (!close) {
        return;
      }
      if (event.target === event.currentTarget) {
        close();
        return;
      }
      if (event.code === "Escape") {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    if (close) {
      document.addEventListener("keydown", handleClose);
      return () => document.removeEventListener("keydown", handleClose);
    }
  }, [close, handleClose]);
  return createPortal(
    <div className={styles.backdrop} onClick={handleClose}>
      <div className={styles.inner}>{children}</div>
    </div>,
    backdrop
  );
};

Backdrop.defaultProps = {
  close: undefined,
};

Backdrop.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func,
};

export default Backdrop;
