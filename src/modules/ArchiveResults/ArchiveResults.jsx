import styles from "./archiveResults.module.scss";

const ArchiveResults = ({ items }) => {
  const elements = items.map(({ _id, date, pages }) => {
    const day = date.slice(0, 10);
    const hms = date.slice(-8);
    return (
      <tr key={_id}>
        <td className={styles.dayCell}>{day}</td>
        <td className={`${styles.hmsCell} ${styles.pale}`}>{hms}</td>
        <td className={styles.pagesCell}>
          {pages} <span className={styles.pale}>pages</span>
        </td>
      </tr>
    );
  });

  return (
    <div className={styles.general}>
      <table className={styles.table}>
        <tbody>{elements}</tbody>
      </table>
    </div>
  );
};

export default ArchiveResults;
