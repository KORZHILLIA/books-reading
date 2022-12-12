import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HowToUseWindow from "../../modules/HowToUseWindow";
import AddBookForm from "../../modules/AddBookForm";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import GoingToRead from "../../modules/GoingToRead";
import Spinner from "../../shared/components/Spinner";
import InfoWindow from "../../shared/components/InfoWindow";
import {
  addNewBook,
  removeNewBook,
} from "../../redux/library/library-operations";
import librarySelectors from "../../redux/library/library-selectors";
import styles from "./homePage.module.scss";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch = useDispatch();

  const { loading } = useSelector(librarySelectors.library);
  const books = useSelector(librarySelectors.libraryFuture);
  const error = useSelector(librarySelectors.defineLibraryError);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleForm = () => setIsFormOpen((prevState) => !prevState);
  const closeForm = () => setIsFormOpen(false);

  const addBook = (book) => dispatch(addNewBook(book));
  const deleteBook = (bookId) => dispatch(removeNewBook(bookId));

  return (
    <main className={styles.home}>
      <div className="container">
        <ButtonUniversal
          type="button"
          text="How to use the app"
          onClick={openModal}
          btnStyles={styles.upperBtn}
        />
        <ButtonUniversal
          type="button"
          text="Add books"
          onClick={toggleForm}
          btnStyles={styles.formBtn}
        />
        {isFormOpen ? (
          <AddBookForm onClose={closeForm} onSubmit={addBook} />
        ) : null}
        {isModalOpen ? <HowToUseWindow onClick={closeModal} /> : null}
        {books.length ? (
          <GoingToRead books={books} onCloseBtnClick={deleteBook} />
        ) : null}
      </div>
      {loading ? <Spinner /> : null}
      {error ? <InfoWindow text={error} onClick={closeModal} /> : null}
    </main>
  );
};

export default HomePage;
