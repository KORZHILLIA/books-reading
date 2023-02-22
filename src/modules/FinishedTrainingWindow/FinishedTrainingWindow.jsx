import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Backdrop from "../../shared/components/Backdrop";
import SVGCreator from "../../shared/components/SVGCreator";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import trainingSelectors from "../../redux/training/training-selectors";
import styles from "./finishedTrainingWindow.module.scss";

const FinishedTrainingWindow = ({ onNewClick, onBackClick }) => {
  const { content } = useSelector(trainingSelectors.training);
  const { books, results } = content;
  const totalPages = books.reduce((acc, { pages }) => acc + pages, 0);
  const pagesRead = results.reduce((acc, { pages }) => acc + pages, 0);
  const result = pagesRead / totalPages;
  const text =
    result <= 0.6
      ? "Quite poor! Try read faster next time"
      : result <= 0.8
      ? "Well done! But you need to be a little bit faster. You can do it)"
      : "Perfect! The goal is reached!";
  return (
    <Backdrop close={onBackClick}>
      <div className={styles.general}>
        <div
          style={{
            transform: `rotate(${
              result <= 0.6 ? "180" : result <= 0.8 ? "90" : "0"
            }deg)`,
          }}
          className={styles.svg}
        >
          <SVGCreator iconName="thumb" width={50} height={50} />
        </div>
        <p className={styles.text}>{text}</p>
        <div className={styles.btnsContainer}>
          <ButtonUniversal
            type="button"
            text="New training"
            btnStyles={styles.newBtn}
            onClick={onNewClick}
          />
          <ButtonUniversal
            type="button"
            text="Back"
            btnStyles={styles.backBtn}
            onClick={onBackClick}
          />
        </div>
      </div>
    </Backdrop>
  );
};

FinishedTrainingWindow.propTypes = {
  onNewClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default FinishedTrainingWindow;
