import PropTypes from "prop-types";
import styles from "./myGoals.module.scss";

const MyGoals = ({ books, times, isTrainingActive }) => {
  const [start, finish] = times;
  const diff = new Date(finish) - new Date(start) + (isTrainingActive ? 0 : 1);
  const interval = Math.ceil(diff / 1000 / 3600 / 24);
  const days = !interval || interval < 0 ? 0 : interval;

  const totalQuantity = books.length;
  const pastBooksQuantity = books.filter(
    ({ status }) => status === "past"
  ).length;
  const leftQuantity = totalQuantity - pastBooksQuantity;

  const chooseItemClass = () =>
    isTrainingActive ? styles.smallItem : styles.item;

  const chooseDigitClass = () =>
    isTrainingActive ? styles.smallDigit : styles.digit;

  return (
    <div className={styles.general}>
      <h2 className={styles.header}>My goals</h2>
      <ul className={styles.list}>
        <li className={chooseItemClass()}>
          <p className={chooseDigitClass()}>{totalQuantity}</p>
          <p className={styles.text}>Amount of books</p>
        </li>
        <li className={chooseItemClass()}>
          <p className={chooseDigitClass()}>{days}</p>
          <p className={styles.text}>Amount of days</p>
        </li>
        {isTrainingActive ? (
          <li className={styles.smallItem}>
            <p style={{ color: "#f25137" }} className={styles.smallDigit}>
              {leftQuantity}
            </p>
            <p className={styles.smallText}>Books left</p>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

MyGoals.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      pages: PropTypes.number.isRequired,
      status: PropTypes.oneOf(["future", "present", "past"]),
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ),
  times: PropTypes.arrayOf(PropTypes.string),
};

export default MyGoals;
