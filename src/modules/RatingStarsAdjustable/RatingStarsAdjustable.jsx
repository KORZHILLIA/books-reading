import { useState, useEffect } from "react";
import SVGCreator from "../../shared/components/SVGCreator";
import sprite from "../../assets/svg/sprite.svg";
import styles from "./ratingStarsAdjustable.module.scss";

const RatingStarsAdjustable = ({ qty, defineRating }) => {
  const [rating, setRating] = useState(0);

  const baseArray = new Array(qty).fill("");

  const onItemClick = (idx) => {
    const increasedIdx = idx + 1;
    setRating((prevState) => {
      return prevState === increasedIdx ? prevState - 1 : increasedIdx;
    });
  };

  useEffect(() => defineRating(rating), [rating]);

  const elements = baseArray.map((_, idx) => (
    <li
      className={idx + 1 <= rating ? styles.svgFilled : styles.svgEmpty}
      key={`id-${idx}`}
      onClick={() => onItemClick(idx)}
    >
      <SVGCreator iconName="star" width={17} height={17} />
    </li>
  ));
  return <ul className={styles.list}>{elements}</ul>;
};

export default RatingStarsAdjustable;
