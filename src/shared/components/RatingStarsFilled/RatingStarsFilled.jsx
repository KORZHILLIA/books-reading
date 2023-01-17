import PropTypes from "prop-types";
import SVGCreator from "../SVGCreator";
import styles from "./ratingStarsFilled.module.scss";

const RatingStarsFilled = ({ totalQty, rating }) => {
  const baseArray = new Array(totalQty).fill("");
  const elements = baseArray.map((_, idx) => (
    <li
      key={`id-${idx}`}
      className={idx + 1 <= rating ? styles.svgFilled : styles.svgEmpty}
    >
      <SVGCreator iconName="star" width={17} height={17} />
    </li>
  ));

  return <ul className={styles.list}>{elements}</ul>;
};

RatingStarsFilled.defaultProps = {
  totalQty: 5,
};

RatingStarsFilled.propTypes = {
  totalQty: PropTypes.number,
  rating: PropTypes.number,
};

export default RatingStarsFilled;
