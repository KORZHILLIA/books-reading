import SVGCreator from "../../shared/components/SVGCreator";
import styles from "./introPageList.module.scss";

const IntroPageList = ({ items }) => {
  const arrow = <SVGCreator iconName="arrow" width={6} height={12} />;
  const elements = items.map((item, idx) => (
    <li className={styles.item} key={`item-${idx}`}>
      {arrow}
      <p className={styles.text}>{item}</p>
    </li>
  ));
  return <ul>{elements}</ul>;
};

export default IntroPageList;
