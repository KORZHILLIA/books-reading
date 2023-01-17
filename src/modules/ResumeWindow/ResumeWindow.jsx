import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RatingStarsAdjustible from "../RatingStarsAdjustable";
import Backdrop from "../../shared/components/Backdrop";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import styles from "./resumeWindow.module.scss";

const initialState = {
  rating: 0,
  resume: "",
};

const ResumeWindow = ({ onBackClick, onSaveClick }) => {
  const [state, setState] = useState(initialState);
  const { resume } = state;

  const setRating = (rating) => {
    setState((prevState) => ({ ...prevState, rating }));
  };

  const setResume = ({ target }) => {
    const { value } = target;
    setState((prevState) => ({ ...prevState, resume: value }));
  };

  const setFullInfo = () => onSaveClick(state);

  return (
    <Backdrop close={onBackClick}>
      <div className={styles.general}>
        <h2 className={styles.ratingHeader}>Choose rating of the book</h2>
        <RatingStarsAdjustible qty={5} defineRating={setRating} />
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

export default ResumeWindow;
