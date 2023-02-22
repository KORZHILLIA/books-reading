import PropTypes from "prop-types";
import styles from "./trainingBooksTable.module.scss";

const TrainingBooksTable = ({ children }) => {
  return (
    <div className={styles.general}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headCell} colSpan={2}>
              Book title
            </th>
            <th className={styles.headCell}>Author</th>
            <th className={styles.headCell}>Year</th>
            <th className={styles.headCell}>Pages</th>
            <th className={`${styles.headCell} ${styles.closeCell}`}></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

TrainingBooksTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default TrainingBooksTable;
