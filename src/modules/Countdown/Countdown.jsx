import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import makeCountdown from "../../helpers/makeCountdown";
import styles from "./countdown.module.scss";

const Countdown = ({ start, finish, startTraining }) => {
  const startMs = new Date(start);
  const finishMs = new Date(finish);
  const nowMs = new Date();

  const startNotCommenced = useRef(true);
  const isTrainingStarted = nowMs > startMs;
  const initialTime = isTrainingStarted ? finishMs : startMs;
  const [ms, setMs] = useState(initialTime - nowMs);
  const { days, hours, minutes, seconds } = makeCountdown(ms);
  // console.log(initialTime - new Date().getTime());
  useEffect(() => {
    if (startNotCommenced.current && isTrainingStarted) {
      startTraining();
      startNotCommenced.current = false;
    }
    const timeId = setInterval(
      () => setMs(initialTime - new Date().getTime()),
      1000
    );
    return () => clearInterval(timeId);
  }, [ms, initialTime, isTrainingStarted]);

  return (
    <div className={styles.general}>
      <p className={styles.header}>
        {isTrainingStarted ? "Goals countdown" : "Training will start in"}
      </p>
      <ul className={styles.countdown}>
        <li className={styles.item}>
          <span className={styles.digit}>{days} :</span>
          <span className={styles.text}>days</span>
        </li>
        <li className={styles.item}>
          <span className={styles.digit}>{hours} :</span>
          <span className={`${styles.text} ${styles.days}`}>hrs</span>
        </li>
        <li className={styles.item}>
          <span className={styles.digit}>{minutes} :</span>
          <span className={styles.text}>mins</span>
        </li>
        <li className={styles.item}>
          <span className={styles.digit}>{seconds}</span>
          <span className={styles.text}>secs</span>
        </li>
      </ul>
    </div>
  );
};

Countdown.propTypes = {
  start: PropTypes.string.isRequired,
  finish: PropTypes.string.isRequired,
  startTraining: PropTypes.func.isRequired,
};

export default Countdown;
