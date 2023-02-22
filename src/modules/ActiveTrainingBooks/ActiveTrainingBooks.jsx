import PropTypes from "prop-types";
import useBreakpoints from "../../shared/hooks/useBreakpoints";
import TrainingBooksTable from "../../shared/components/TrainingBooksTable";
import BookStatusCheckmark from "../../shared/components/BookStatusCheckmark";
import SVGCreator from "../../shared/components/SVGCreator";
import styles from "./activeTrainingBooks.module.scss";

const ActiveTrainingBooks = ({ books }) => {
  const { less768px } = useBreakpoints();

  const pastBooks = books.filter(({ status }) => status === "past");
  const presentBooks = books.filter(({ status }) => status === "present");
  const orderedBooks = [...pastBooks, ...presentBooks];

  const mobileElements = orderedBooks.map(
    ({ _id, title, author, year, pages, status }) => (
      <li key={_id} className={styles.mobileItem}>
        <BookStatusCheckmark status={status} />
        <table className={styles.table}>
          <caption className={styles.title}>{title}</caption>
          <tbody>
            <tr>
              <th className={styles.head}>Author:</th>
              <td className={styles.provision}>{author}</td>
            </tr>
            <tr>
              <th className={styles.head}>Year:</th>
              <td className={styles.provision}>{year}</td>
            </tr>
            <tr>
              <th className={styles.head}>Pages:</th>
              <td className={styles.provision}>{pages}</td>
            </tr>
          </tbody>
        </table>
      </li>
    )
  );

  const elements = orderedBooks.map(
    ({ _id, title, author, year, pages, status }) => (
      <tr key={_id}>
        <td className={styles.svgCell}>
          <BookStatusCheckmark status={status} />
        </td>
        <td className={styles.titleCell}>{title}</td>
        <td className={styles.authorCell}>{author}</td>
        <td className={styles.yearCell}>{year}</td>
        <td colSpan={2} className={styles.pagesCell}>
          {pages}
        </td>
      </tr>
    )
  );

  return less768px ? (
    <ul className={styles.list}>{mobileElements}</ul>
  ) : (
    <TrainingBooksTable>{elements}</TrainingBooksTable>
  );
};

export default ActiveTrainingBooks;
