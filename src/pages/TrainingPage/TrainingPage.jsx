import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyGoals from "../../modules/MyGoals";
import TrainingInterval from "../../modules/TrainingInterval/TrainingInterval";
import TrainingBooksSelector from "../../shared/components/TrainingBooksSelector";
import TrainingBooks from "../../modules/TrainingBooks";
import Spinner from "../../shared/components/Spinner";
import InfoWindow from "../../shared/components/InfoWindow";
import ConfirmWindow from "../../shared/components/ConfirmWindow";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import {
  relocateBookFromFutureToPresent,
  relocateBookFromPresentToFuture,
} from "../../redux/library/library-operations";
import librarySelectors from "../../redux/library/library-selectors";
import { check, add } from "../../shared/api/training";
import styles from "./trainingPage.module.scss";

const initialState = {
  initialLoading: false,
  initialError: null,
  training: null,
};

const TrainingPage = () => {
  const [state, setState] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStartBtnVisible, setIsStartBtnVisible] = useState(false);
  const [trainingTimes, setTrainingTimes] = useState([]);
  const [isTrainingReady, setIsTrainingReady] = useState(false);

  const { initialLoading, initialError, training } = state;
  const [start, finish] = trainingTimes;

  const { loading, error } = useSelector(librarySelectors.library);
  const presentBooks = useSelector(librarySelectors.libraryPresent);
  const dispatch = useDispatch();

  const closeModal = () => setIsModalOpen(false);

  const addBookToPresentList = ({ id }) =>
    dispatch(relocateBookFromFutureToPresent(id));

  const addBookToFutureList = (id) =>
    dispatch(relocateBookFromPresentToFuture(id));

  const setStartBtn = (bool) => setIsStartBtnVisible(bool);

  const defineTrainingTimes = (times) => {
    const { start, finish } = times;
    setTrainingTimes([start, finish]);
  };

  const checkTraining = () => {
    // const [start, finish] = trainingTimes;
    if (start >= finish) {
      setIsTrainingReady(false);
      setIsModalOpen(true);
    } else {
      setIsTrainingReady(true);
      setIsModalOpen(true);
    }
  };

  const cancelTraining = () => {
    setIsTrainingReady(false);
    setIsModalOpen(false);
  };

  const startTraining = async () => {
    setIsModalOpen(false);
    setState((prevState) => ({ ...prevState, initialLoading: true }));
    try {
      const presentBooksIds = presentBooks.reduce(
        (acc, { _id }) => [...acc, _id],
        []
      );
      const trainingData = { start, finish, books: [...presentBooksIds] };
      const training = await add(trainingData);
      setState((prevState) => ({
        ...prevState,
        training,
        initialLoading: false,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        training: null,
        initialLoading: false,
        initialError: error.message,
      }));
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    const checkTraining = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      try {
        const training = await check();
        setState((prevState) => ({
          ...prevState,
          training,
          initialLoading: false,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          initialError: error.message,
        }));
        setIsModalOpen(true);
      }
    };
    checkTraining();
    if (error) {
      setIsModalOpen(true);
    }
  }, [error]);

  return (
    <main className={styles.main}>
      <div className="container">
        <MyGoals
          isTrainingActive={training?.isActive}
          books={!training ? presentBooks : training.books}
          times={!training ? trainingTimes : [training.start, training.finish]}
        />
        {!training ? (
          <TrainingInterval
            setBtn={setStartBtn}
            setTimes={defineTrainingTimes}
          />
        ) : null}
        {!training ? (
          <TrainingBooksSelector onSubmit={addBookToPresentList} />
        ) : null}
        <TrainingBooks onCloseBtnClick={addBookToFutureList} />
      </div>
      {initialLoading || loading ? <Spinner /> : null}
      {(initialError || error) && isModalOpen ? (
        <InfoWindow
          text={initialError ? initialError : error}
          onClick={closeModal}
        />
      ) : null}
      {!isTrainingReady && !initialError && isModalOpen ? (
        <InfoWindow
          text="Finish date must be after start date"
          onClick={closeModal}
        />
      ) : null}
      {isTrainingReady && isModalOpen ? (
        <ConfirmWindow
          text="Are you sure? You won't be able to change training conditions"
          onYesClick={startTraining}
          onCancelClick={cancelTraining}
        />
      ) : null}
      {isStartBtnVisible ? (
        <ButtonUniversal
          type="submit"
          text="Start training"
          btnStyles={
            !Boolean(presentBooks.length) ? styles.btnDisabled : styles.btn
          }
          onClick={checkTraining}
          disabled={!Boolean(presentBooks.length)}
        />
      ) : null}
    </main>
  );
};

export default TrainingPage;
