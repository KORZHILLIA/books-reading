import Backdrop from "../Backdrop";
import SVGCreator from "../SVGCreator";
import styles from "./spinner.module.scss";

function Spinner() {
  return (
    <Backdrop>
      <div className={styles.spinner}>
        <SVGCreator iconName="library" width={64} height={64} />
      </div>
    </Backdrop>
  );
}
export default Spinner;
