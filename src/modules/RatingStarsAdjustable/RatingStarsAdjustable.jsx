import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import SVGCreator from "../../shared/components/SVGCreator";
import librarySelectors from "../../redux/library/library-selectors";
import styles from "./ratingStarsAdjustable.module.scss";

const RatingStarsAdjustable = ({ bookId, qty, defineRating, activateWarn }) => {
  const [rating, setRating] = useState(0);
  const firstRenderRef = useRef(true);

  const { rating: currentRating } = useSelector(
    librarySelectors.libraryPast
  ).find(({ _id }) => _id === bookId);

  const baseArray = new Array(qty).fill("");

  const onItemClick = (idx) => {
    const increasedIdx = idx + 1;
    setRating((prevState) => {
      return prevState === increasedIdx ? prevState - 1 : increasedIdx;
    });
  };

  const chooseItemClass = (idx, activateWarn) => {
    if (activateWarn) {
      return styles.svgEmptyAnimated;
    } else {
      return idx + 1 <= rating ? styles.svgFilled : styles.svgEmpty;
    }
  };

  useEffect(() => {
    if (currentRating && firstRenderRef.current) {
      setRating(currentRating);
      defineRating(rating);
      firstRenderRef.current = false;
    }
    defineRating(rating);
  }, [rating, currentRating, defineRating]);

  const elements = baseArray.map((_, idx) => (
    <li
      style={{
        animationDelay: `${idx * 75}ms`,
      }}
      className={chooseItemClass(idx, activateWarn)}
      key={`id-${idx}`}
      onClick={() => onItemClick(idx)}
    >
      <SVGCreator iconName="star" width={17} height={17} />
    </li>
  ));
  return <ul className={styles.list}>{elements}</ul>;
};

RatingStarsAdjustable.defaultProps = {
  qty: 5,
};

RatingStarsAdjustable.propTypes = {
  bookId: PropTypes.string.isRequired,
  qty: PropTypes.number,
  defineRating: PropTypes.func.isRequired,
};

export default RatingStarsAdjustable;
