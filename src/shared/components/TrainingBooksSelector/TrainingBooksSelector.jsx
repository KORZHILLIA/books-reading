import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useForm from "../../hooks/useForm";
import SVGCreator from "../SVGCreator";
import ButtonUniversal from "../ButtonUniversal";
import librarySelectors from "../../../redux/library/library-selectors";
import styles from "./trainingBooksSelector.module.scss";

const initialState = {
  book: "",
};

const TrainingBooksSelector = ({ onSubmit }) => {
  const books = useSelector(librarySelectors.libraryFuture);

  const { formState, onInputChange, onFormSubmit } = useForm({
    initialState,
    onSubmit,
    reset: true,
  });
  const { book } = formState;

  const elements = books.map(({ _id, title }) => (
    <option key={_id} className={styles.option} value={_id}>
      {title}
    </option>
  ));

  return (
    <form onSubmit={onFormSubmit} className={styles.form}>
      <select
        style={{ backgroundColor: `${!book ? "white" : "transparent"}` }}
        name="book"
        className={styles.select}
        onChange={onInputChange}
      >
        {elements}
      </select>
      {!book ? (
        <p className={styles.label}>Choose book from the library</p>
      ) : null}
      <div className={styles.arrow}>
        <SVGCreator iconName="triangle" width={13} height={7} />
      </div>
      <ButtonUniversal type="submit" text="Add" btnStyles={styles.btn} />
    </form>
  );
};

TrainingBooksSelector.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TrainingBooksSelector;
