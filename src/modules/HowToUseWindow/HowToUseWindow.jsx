import PropTypes from "prop-types";
import Backdrop from "../../shared/components/Backdrop";
import SVGCreator from "../../shared/components/SVGCreator";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import styles from "./howToUseWindow.module.scss";

const HowToUseWindow = ({ onClick }) => {
  return (
    <Backdrop close={onClick}>
      <div className={styles.general}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <h2 className={styles.header}>Step 1.</h2>
            <div className={styles.subheader}>
              <SVGCreator iconName="library" width={22} height={22} />
              <p>Create your own library</p>
            </div>
            <div className={styles.text}>
              <SVGCreator iconName="enter" width={22} height={22} />
              <p>Add there books which you are going to read.</p>
            </div>
          </li>
          <li className={styles.item}>
            <h2 className={styles.header}>Step 2.</h2>
            <div className={styles.subheader}>
              <SVGCreator iconName="flag" width={22} height={22} />
              <p>Create your first training</p>
            </div>
            <div className={styles.text}>
              <SVGCreator iconName="enter" width={22} height={22} />
              <p>Set a goal, choose period, start training.</p>
            </div>
          </li>
        </ul>
        <ButtonUniversal
          type="button"
          text="Ok"
          isFocusNeeded={true}
          onClick={onClick}
          btnStyles={styles.btn}
        />
      </div>
    </Backdrop>
  );
};

HowToUseWindow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HowToUseWindow;
