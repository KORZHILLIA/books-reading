import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useForm from "../../shared/hooks/useForm";
import ArchiveResults from "../ArchiveResults";
import FormInput from "../../shared/components/FormInput";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import SVGCreator from "../../shared/components/SVGCreator";
import trainingSelectors from "../../redux/training/training-selectors";
import styles from "./trainingResults.module.scss";

const TrainingResults = ({ start, finish, onSubmit }) => {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), [start]);
  const initialState = {
    bookId: "",
    date: today,
    pages: 0,
  };
  const preparedStart = start?.slice(0, 10);
  const selectRef = useRef(null);

  const training = useSelector(trainingSelectors.training);
  const presentBooks = training?.content.books.filter(
    ({ status }) => status === "present"
  );
  const results = training?.content.results;
  const { formState, onInputChange, onFormSubmit } = useForm({
    initialState,
    onSubmit,
    reset: true,
  });

  const selectorElements = presentBooks.map(({ _id, title }) => (
    <option key={_id} value={_id}>
      {title}
    </option>
  ));

  const { date, pages } = formState;

  const resetSelect = () => {
    selectRef.current.selectedIndex = 0;
  };

  return (
    <div className={styles.general}>
      <h2 className={styles.header}>Results</h2>
      <div className={styles.selectWrapper}>
        <select
          ref={selectRef}
          className={styles.select}
          name="bookId"
          onChange={onInputChange}
        >
          <option key="ownId" value="">
            Choose the book
          </option>
          {selectorElements}
        </select>
        <div className={styles.selectArrow}>
          <SVGCreator iconName="triangle" width={13} height={7} />
        </div>
      </div>
      <form onSubmit={onFormSubmit} className={styles.form}>
        <FormInput
          label="Date"
          type="date"
          name="date"
          value={date}
          min={preparedStart}
          max={today}
          onChange={onInputChange}
          generalStyle={styles.box}
          labelStyle={styles.label}
          inputStyle={styles.input}
        >
          <div className={styles.arrow}>
            <SVGCreator iconName="triangle" width={13} height={7} />
          </div>
        </FormInput>
        <FormInput
          label="Amount of pages"
          type="number"
          name="pages"
          value={pages}
          min="1"
          max="1000"
          onChange={onInputChange}
          generalStyle={styles.box}
          labelStyle={styles.label}
          inputStyle={styles.input}
        />
        <ButtonUniversal
          type="submit"
          text="Add result"
          btnStyles={styles.btn}
          onClick={resetSelect}
        />
      </form>
      <h2 className={styles.subHeader}>Statistics</h2>
      {results ? <ArchiveResults items={results} /> : null}
    </div>
  );
};

TrainingResults.defaultProps = {
  onSubmit: () => {},
};

TrainingResults.propTypes = {
  start: PropTypes.string.isRequired,
  finish: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

export default TrainingResults;
