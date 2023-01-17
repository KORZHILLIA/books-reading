import PropTypes from "prop-types";
import SVGCreator from "../SVGCreator";
import CloseBtn from "../CloseBtn";
import styles from "./mobileBookItem.module.scss";

const MobileBookItem = ({
  id,
  iconName,
  title,
  author,
  year,
  pages,
  itemStyles,
  isCloseBtnNeeded,
  onCloseBtnClick,
}) => {
  return (
    <li className={itemStyles}>
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
        </tbody>
      </table>
      {isCloseBtnNeeded ? (
        <CloseBtn
          onClick={() => onCloseBtnClick(id)}
          position={{ top: 10, right: 12 }}
        />
      ) : null}
    </li>
  );
};

MobileBookItem.defaultProps = {
  iconName: "library",
  title: "...",
  author: "...",
  year: "...",
  pages: "...",
  isCloseBtnNeeded: true,
  onCloseBtnClick: () => {},
};

MobileBookItem.propTypes = {
  id: PropTypes.string,
  iconName: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  itemStyles: PropTypes.string.isRequired,
  isCloseBtnNeeded: PropTypes.bool,
  onCloseBtnClick: PropTypes.func,
};

export default MobileBookItem;
