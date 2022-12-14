import Backdrop from "../../shared/components/Backdrop";
import AddBookForm from "../AddBookForm";
import styles from "./addBookFormWindow.module.scss";

const AddBookFormWindow = ({ close, onClose, onSubmit }) => {
  return (
    <Backdrop close={close}>
      <div className={styles.general}>
        <AddBookForm onClose={onClose} onSubmit={onSubmit} />
      </div>
    </Backdrop>
  );
};

export default AddBookFormWindow;
