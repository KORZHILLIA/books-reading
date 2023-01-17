import PropTypes from "prop-types";
import useBreakpoints from "../../shared/hooks/useBreakpoints";
import SVGCreator from "../../shared/components/SVGCreator";
import MobileBookItemExtended from "../../shared/components/MobileBookItemExtended";
import RatingStarsFilled from "../../shared/components/RatingStarsFilled";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import styles from "./alreadyRead.module.scss";

const AlreadyRead = ({ books, onClick }) => {
  const { less768px } = useBreakpoints();

  const mobileElements = books.map(
    ({ _id, title, author, year, pages, rating }) => (
      <MobileBookItemExtended
        key={_id}
        id={_id}
        title={title}
        author={author}
        year={year}
        pages={pages}
        rating={rating}
        itemStyles={styles.item}
        onBtnClick={onClick}
      />
    )
  );

  const largerElements = books.map(
    ({ _id, title, author, year, pages, rating }) => (
      <tr key={_id} className={styles.row}>
        <td className={styles.svgCell}>
          <SVGCreator iconName="library" width={22} height={22} />
        </td>
        <td className={styles.titleCell}>{title}</td>
        <td className={styles.authorCell}>{author}</td>
        <td className={styles.yearCell}>{year}</td>
        <td className={styles.pagesCell}>{pages}</td>
        <td className={styles.ratingCell}>
          <RatingStarsFilled totalQty={5} rating={rating} />
        </td>
        <td className={styles.resumeBtnCell}>
          <ButtonUniversal
            type="button"
            text="Resume"
            btnStyles={styles.btn}
            onClick={onClick}
          />
        </td>
      </tr>
    )
  );

  return (
    <div className={styles.general}>
      <h2 className={styles.header}>Already read</h2>
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
              <th className={styles.largerHead}>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>{largerElements}</tbody>
        </table>
      )}
    </div>
  );
};

AlreadyRead.defaultProps = {
  books: [],
  onClick: () => {},
};

AlreadyRead.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      pages: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func,
};

export default AlreadyRead;
