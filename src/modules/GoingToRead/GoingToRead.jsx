import PropTypes from "prop-types";
import useBreakpoints from "../../shared/hooks/useBreakpoints";
import SVGCreator from "../../shared/components/SVGCreator";
import CloseBtn from "../../shared/components/CloseBtn";
import MobileBookItem from "../../shared/components/MobileBookItem";
import styles from "./goingToRead.module.scss";

const GoingToRead = ({ books, onCloseBtnClick }) => {
  const { less768px } = useBreakpoints();

  const mobileElements = books.map(({ _id, title, author, year, pages }) => (
    <MobileBookItem
      key={_id}
      id={_id}
      title={title}
      author={author}
      year={year}
      pages={pages}
      itemStyles={styles.item}
      onCloseBtnClick={onCloseBtnClick}
    />
  ));

  const largerElements = books.map(({ _id, title, author, year, pages }) => (
    <tr key={_id} className={styles.row}>
      <td className={styles.svgCell}>
        <SVGCreator iconName="library" width={22} height={22} />
      </td>
      <td className={styles.titleCell}>{title}</td>
      <td className={styles.authorCell}>{author}</td>
      <td className={styles.yearCell}>{year}</td>
      <td className={styles.pagesCell}>
        {pages}
        <CloseBtn
          onClick={() => onCloseBtnClick(_id)}
          position={{ top: 10, right: -35 }}
        />
      </td>
    </tr>
  ));

  return (
    <div className={styles.general}>
      <h2 className={styles.header}>Going to read</h2>
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

GoingToRead.defaultProps = {
  books: [],
  onCloseBtnClick: () => {},
};

GoingToRead.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      pages: PropTypes.number.isRequired,
    })
  ),
  onCloseBtnClick: PropTypes.func,
};

export default GoingToRead;
