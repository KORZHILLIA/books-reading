import PropTypes from "prop-types";
import SVGCreator from "../SVGCreator";
import RatingStarsFilled from "../RatingStarsFilled";
import ButtonUniversal from "../ButtonUniversal";
import styles from "./mobileBookItemExtended.module.scss";

const MobileBookItemExtended = ({
  id,
  iconName,
  title,
  author,
  year,
  pages,
  rating,
  itemStyles,
  onBtnClick,
}) => {
  return (
    <li className={itemStyles}>
      <div className={styles.general}>
        <SVGCreator iconName={iconName} width={22} height={22} />
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
            <tr>
              <th className={styles.head}>Rating:</th>
              <td className={styles.provision}>
                <RatingStarsFilled rating={rating} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ButtonUniversal
        type="button"
        text="Resume"
        onClick={onBtnClick}
        btnStyles={styles.btn}
      />
    </li>
  );
};

MobileBookItemExtended.defaultProps = {
  iconName: "library",
  title: "...",
  author: "...",
  year: "...",
  pages: "...",
  onBtnClick: () => {},
};

MobileBookItemExtended.propTypes = {
  id: PropTypes.string,
  iconName: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rating: PropTypes.number.isRequired,
  itemStyles: PropTypes.string.isRequired,
  onBtnClick: PropTypes.func,
};

export default MobileBookItemExtended;
