import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HowToUseWindow from "../../modules/HowToUseWindow";
import AddBookForm from "../../modules/AddBookForm";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import AlreadyRead from "../../modules/AlreadyRead";
import GoingToRead from "../../modules/GoingToRead";
import ReadingNow from "../../modules/ReadingNow";
import Spinner from "../../shared/components/Spinner";
import InfoWindow from "../../shared/components/InfoWindow";
import AddBtn from "../../shared/components/AddBtn";
import AddBookFormWindow from "../../modules/AddBookFormWindow";
import ResumeWindow from "../../modules/ResumeWindow";
import { getAllBooks } from "../../redux/library/library-operations";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(librarySelectors.library);
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
    setIsFormWindowVisible(false);
  };
  const deleteBook = (bookId) => dispatch(removeNewBook(bookId));

  const scrollHandler = ({ target }) => {
    if (target.scrollTop >= 106 && !isFormOpen) {
      setIsAddBtnVisible(true);
    } else {
      setIsAddBtnVisible(false);
    }
  };

  const showResumeWindow = () => {
    openResumeWindow();
    openModal();
  };

  const saveResume = (resumeData) => {
    closeModal();
    closeResumeWindow();
    console.log(resumeData);
  };

  const hideResumeWindow = () => {
    closeResumeWindow();
    closeModal();
  };

  return (
    <main className={styles.main} onScroll={scrollHandler}>
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
      {loading ? <Spinner /> : null}
      {!error && !isResumeWindowOpen && isModalOpen ? (
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
      {error && isModalOpen ? (
        <InfoWindow text={error} onClick={closeModal} />
      ) : null}
      {!error && isResumeWindowOpen && isModalOpen ? (
        <ResumeWindow onBackClick={hideResumeWindow} onSaveClick={saveResume} />
      ) : null}
    </main>
  );
};

export default HomePage;
