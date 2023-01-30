import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import RatingStarsAdjustible from "../RatingStarsAdjustable";
import Backdrop from "../../shared/components/Backdrop";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import librarySelectors from "../../redux/library/library-selectors";
import styles from "./resumeWindow.module.scss";

const initialState = {
  rating: 0,
  resume: "",
  activateWarn: false,
};

const ResumeWindow = ({ bookId, onBackClick, onSaveClick }) => {
  const [state, setState] = useState(initialState);
  const { rating, resume, activateWarn } = state;

  const { resume: currentResume } = useSelector(
    librarySelectors.libraryPast
  ).find(({ _id }) => _id === bookId);

  useEffect(() => {
    if (currentResume) {
      setState((prevState) => ({ ...prevState, resume: currentResume }));
    }
  }, []);

  const setRating = (rating) => {
    setState((prevState) => ({ ...prevState, rating }));
  };

  const setResume = ({ target }) => {
    const { value } = target;
    setState((prevState) => ({ ...prevState, resume: value }));
  };

  const setFullInfo = () => {
    if (!rating) {
      setState((prevState) => ({ ...prevState, activateWarn: true }));
      setTimeout(
        () => setState((prevState) => ({ ...prevState, activateWarn: false })),
        1000
      );
      return;
    } else {
      onSaveClick({ rating, resume });
    }
  };

  return (
    <Backdrop close={onBackClick}>
      <div className={styles.general}>
        <h2 className={styles.ratingHeader}>Choose rating of the book</h2>
        <RatingStarsAdjustible
          bookId={bookId}
          qty={5}
          defineRating={setRating}
          activateWarn={activateWarn}
        />
        <label htmlFor="resume" className={styles.textareaLabel}>
          Resume
        </label>
        <textarea
          id="resume"
          className={styles.textarea}
          name="resume"
          value={resume}
          rows={10}
          placeholder="..."
          required
          onChange={setResume}
        ></textarea>
        <div className={styles.btnsContainer}>
          <ButtonUniversal
            type="button"
            text="Back"
            btnStyles={styles.backBtn}
            onClick={onBackClick}
          />
          <ButtonUniversal
            type="button"
            text="Save"
            btnStyles={styles.saveBtn}
            onClick={setFullInfo}
          />
        </div>
      </div>
    </Backdrop>
  );
};

ResumeWindow.propTypes = {
  bookId: PropTypes.string.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
};

export default ResumeWindow;
