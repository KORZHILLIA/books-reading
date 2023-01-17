import PropTypes from "prop-types";
import useBreakpoints from "../../shared/hooks/useBreakpoints";
import SVGCreator from "../../shared/components/SVGCreator";
import CloseBtn from "../../shared/components/CloseBtn";
import MobileBookItem from "../../shared/components/MobileBookItem";
import styles from "./readingNow.module.scss";

const ReadingNow = ({ books }) => {
  const { less768px } = useBreakpoints();

  const mobileElements = books.map(({ _id, title, author, year, pages }) => (
    <MobileBookItem
      key={_id}
      id={_id}
      iconName="library-orange"
      title={title}
      author={author}
      year={year}
      pages={pages}
      itemStyles={styles.item}
      isCloseBtnNeeded={false}
    />
  ));

  const largerElements = books.map(({ _id, title, author, year, pages }) => (
    <tr key={_id} className={styles.row}>
      <td className={styles.svgCell}>
        <SVGCreator iconName="library-orange" width={22} height={22} />
      </td>
      <td className={styles.titleCell}>{title}</td>
      <td className={styles.authorCell}>{author}</td>
      <td className={styles.yearCell}>{year}</td>
      <td className={styles.pagesCell}>{pages}</td>
    </tr>
  ));

  return (
    <div className={styles.general}>
      <h2 className={styles.header}>Reading now</h2>
      {less768px ? (
        <ul className={styles.list}>{mobileElements}</ul>
      ) : (
        <table className={styles.largerTable}>
          <thead>
            <tr>
              <th className={styles.largerHead} colSpan={2}>
                Book title
              </th>
              <th className={styles.largerHead}>Author</th>
              <th className={styles.largerHead}>Year</th>
              <th className={styles.largerHead}>Pages</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>{largerElements}</tbody>
        </table>
      )}
    </div>
  );
};

ReadingNow.defaultProps = {
  books: [],
  //   onCloseBtnClick: () => {},
};

ReadingNow.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      pages: PropTypes.number.isRequired,
    })
  ),
  //   onCloseBtnClick: PropTypes.func,
};

export default ReadingNow;
