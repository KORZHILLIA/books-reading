import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HowToUseWindow from "../../modules/HowToUseWindow";
import AddBookForm from "../../modules/AddBookForm";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import AlreadyRead from "../../modules/AlreadyRead";
import GoingToRead from "../../modules/GoingToRead";
import ReadingNow from "../../modules/ReadingNow";
import AddBtn from "../../shared/components/AddBtn";
import AddBookFormWindow from "../../modules/AddBookFormWindow";
import ResumeWindow from "../../modules/ResumeWindow";
import {
  getAllBooks,
  changeBookResume,
} from "../../redux/library/library-operations";
import {
  addNewBook,
  removeNewBook,
} from "../../redux/library/library-operations";
import librarySelectors from "../../redux/library/library-selectors";
import styles from "./homePage.module.scss";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAddBtnVisible, setIsAddBtnVisible] = useState(false);
  const [isFormWindowVisible, setIsFormWindowVisible] = useState(false);
  const [isResumeWindowOpen, setIsResumeWindowOpen] = useState(false);
  const [bookId, setBookId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const futureBooks = useSelector(librarySelectors.libraryFuture);
  const presentBooks = useSelector(librarySelectors.libraryPresent);
  const pastBooks = useSelector(librarySelectors.libraryPast);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleForm = () => setIsFormOpen((prevState) => !prevState);
  const closeForm = () => setIsFormOpen(false);
  const openFormWindow = () => setIsFormWindowVisible(true);
  const closeFormWindow = () => setIsFormWindowVisible(false);
  const openResumeWindow = () => setIsResumeWindowOpen(true);
  const closeResumeWindow = () => setIsResumeWindowOpen(false);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const addBook = (book) => dispatch(addNewBook(book));
  const addBookFromWindow = (book) => {
    dispatch(addNewBook(book));
    closeFormWindow();
  };
  const deleteBook = (bookId) => dispatch(removeNewBook(bookId));

  const showResumeWindow = (bookId) => {
    setBookId(bookId);
    openResumeWindow();
    openModal();
  };

  const hideResumeWindow = () => {
    setBookId(null);
    closeResumeWindow();
    closeModal();
  };

  const saveResume = (resumeData) => {
    dispatch(changeBookResume(bookId, resumeData));
    hideResumeWindow();
  };
  return (
    <main className={styles.main}>
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
        {pastBooks.length ? (
          <AlreadyRead books={pastBooks} onClick={showResumeWindow} />
        ) : null}
        {presentBooks.length ? <ReadingNow books={presentBooks} /> : null}
        {futureBooks.length ? (
          <GoingToRead books={futureBooks} onCloseBtnClick={deleteBook} />
        ) : null}
        {futureBooks.length ? (
          <ButtonUniversal
            type="button"
            text="My training"
            onClick={() => navigate("/training")}
            btnStyles={styles.trainingBtn}
          />
        ) : null}
      </div>
      {!isResumeWindowOpen && isModalOpen ? (
        <HowToUseWindow onClick={closeModal} />
      ) : null}
      <AddBtn onClick={openFormWindow} isVisible={isAddBtnVisible} />
      {isFormWindowVisible ? (
        <AddBookFormWindow
          close={closeFormWindow}
          onClose={closeFormWindow}
          onSubmit={addBookFromWindow}
        />
      ) : null}
      {isResumeWindowOpen && isModalOpen ? (
        <ResumeWindow
          bookId={bookId}
          onBackClick={hideResumeWindow}
          onSaveClick={saveResume}
        />
      ) : null}
    </main>
  );
};

export default HomePage;
