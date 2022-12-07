import PropTypes from "prop-types";
import useForm from "../../shared/hooks/useForm";
import FormInput from "../../shared/components/FormInput";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import styles from "./addBookForm.module.scss";

const initialState = {
  title: "",
  author: "",
  year: "",
  pages: "",
};

const AddBookForm = ({ onClose, onSubmit }) => {
  const { formState, onInputChange, onFormSubmit } = useForm({
    initialState,
    onSubmit,
    reset: true,
  });
  const { title, author, year, pages } = formState;
  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <FormInput
        label="Book title"
        type="text"
        name="title"
        value={title}
        required={true}
        autocomplete="off"
        placeholder="..."
        onChange={onInputChange}
        generalStyle={`${styles.general} ${styles.title}`}
        labelStyle={styles.label}
        inputStyle={styles.input}
      />
      <FormInput
        label="Author"
        type="text"
        name="author"
        value={author}
        required={true}
        autocomplete="off"
        placeholder="..."
        onChange={onInputChange}
        generalStyle={`${styles.general} ${styles.author}`}
        labelStyle={styles.label}
        inputStyle={styles.input}
      />
      <FormInput
        label="Publication year"
        type="text"
        name="year"
        value={year}
        required={true}
        autocomplete="off"
        placeholder="2004"
        onChange={onInputChange}
        generalStyle={styles.general}
        labelStyle={styles.label}
        inputStyle={styles.input}
      />
      <FormInput
        label="Amount of pages"
        type="number"
        name="pages"
        value={pages}
        required={true}
        autocomplete="off"
        placeholder="..."
        onChange={onInputChange}
        generalStyle={styles.general}
        labelStyle={styles.label}
        inputStyle={styles.input}
      />
      <ButtonUniversal type="submit" text="Add" btnStyles={styles.btn} />
      <ButtonUniversal
        type="button"
        iconName="cross"
        svgWidth={10}
        svgHeight={10}
        onClick={onClose}
        btnStyles={styles.closeBtn}
        svgStyles={styles.close}
      />
    </form>
  );
};

AddBookForm.defaultProps = {
  onClose: () => {},
};

AddBookForm.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default AddBookForm;
