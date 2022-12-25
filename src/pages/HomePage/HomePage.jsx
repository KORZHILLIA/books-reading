import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HowToUseWindow from "../../modules/HowToUseWindow";
import AddBookForm from "../../modules/AddBookForm";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import GoingToRead from "../../modules/GoingToRead";
import Spinner from "../../shared/components/Spinner";
import InfoWindow from "../../shared/components/InfoWindow";
import AddBtn from "../../shared/components/AddBtn";
import AddBookFormWindow from "../../modules/AddBookFormWindow";
import { getAll } from "../../shared/api/library";
import * as libraryActions from "../../redux/library/library-actions";
import {
  addNewBook,
  removeNewBook,
} from "../../redux/library/library-operations";
import librarySelectors from "../../redux/library/library-selectors";
import styles from "./homePage.module.scss";

const initialState = {
  initialBooks: [],
  initialLoading: false,
  initialError: null,
};

const HomePage = () => {
  const [state, setState] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAddBtnVisible, setIsAddBtnVisible] = useState(false);
  const [isFormWindowVisible, setIsFormWindowVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { initialLoading, initialError } = state;
  const { loading, error } = useSelector(librarySelectors.library);
  const books = useSelector(librarySelectors.libraryFuture);
  // const error = useSelector(librarySelectors.defineLibraryError);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleForm = () => setIsFormOpen((prevState) => !prevState);
  const closeForm = () => setIsFormOpen(false);
  const openFormWindow = () => setIsFormWindowVisible(true);
  const closeFormWindow = () => setIsFormWindowVisible(false);

  useEffect(() => {
    const getAllBooks = async () => {
      setState((prevState) => ({
        ...prevState,
        initialLoading: true,
        initialError: null,
      }));
      try {
        const initialBooks = await getAll();
        setState((prevState) => ({
          ...prevState,
          initialBooks,
          initialLoading: false,
          initialError: null,
        }));
        dispatch(libraryActions.getAll(initialBooks));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          initialLoading: false,
          initialError: error.message,
        }));
        setIsModalOpen(true);
      }
    };
    getAllBooks();
  }, []);

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
        {!initialError && !error && isModalOpen ? (
          <HowToUseWindow onClick={closeModal} />
        ) : null}
        {books.length ? (
          <GoingToRead books={books} onCloseBtnClick={deleteBook} />
        ) : null}
        {books.length ? (
          <ButtonUniversal
            type="button"
            text="My training"
            onClick={() => navigate("/training")}
            btnStyles={styles.trainingBtn}
          />
        ) : null}
      </div>
      <AddBtn onClick={openFormWindow} isVisible={isAddBtnVisible} />
      {isFormWindowVisible ? (
        <AddBookFormWindow
          close={closeFormWindow}
          onClose={closeFormWindow}
          onSubmit={addBookFromWindow}
        />
      ) : null}
      {initialLoading || loading ? <Spinner /> : null}
      {(initialError || error) && isModalOpen ? (
        <InfoWindow text={initialError ?? error} onClick={closeModal} />
      ) : null}
    </main>
  );
};

export default HomePage;
