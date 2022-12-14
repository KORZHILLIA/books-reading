import SVGCreator from "../../components/SVGCreator";
import styles from "./dateInputDecorator.module.scss";

const DateInputDecorator = ({ text }) => {
  return (
    <div className={styles.general}>
      <SVGCreator iconName="calendar" width={17} height={17} />
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default DateInputDecorator;
