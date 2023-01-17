import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyGoals from "../../modules/MyGoals";
import TrainingInterval from "../../modules/TrainingInterval/TrainingInterval";
import TrainingBooksSelector from "../../shared/components/TrainingBooksSelector";
import TrainingBooks from "../../modules/TrainingBooks";
import ActiveTrainingBooks from "../../modules/ActiveTrainingBooks";
import Countdown from "../../modules/Countdown/Countdown";
import TrainingResults from "../../modules/TrainingResults";
import Spinner from "../../shared/components/Spinner";
import InfoWindow from "../../shared/components/InfoWindow";
import ConfirmWindow from "../../shared/components/ConfirmWindow";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import {
  relocateBookFromFutureToPresent,
  relocateBookFromPresentToFuture,
} from "../../redux/library/library-operations";
import librarySelectors from "../../redux/library/library-selectors";
import trainingSelectors from "../../redux/training/training-selectors";
import {
  checkCurrentTraining,
  addNewTraining,
  cleanTraining,
  addTrainingResult,
} from "../../redux/training/training-operations";
import makeFullTime from "../../helpers/makeFullTime";
import styles from "./trainingPage.module.scss";

const TrainingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStartBtnVisible, setIsStartBtnVisible] = useState(false);
  const [trainingTimes, setTrainingTimes] = useState([]);
  const [isTrainingReady, setIsTrainingReady] = useState(false);
  const [clearTraining, setClearTraining] = useState(false);
  const [isTrainingStarted, setIsTrainingStarted] = useState(false);

  const [start, finish] = trainingTimes;

  const { loading: libraryLoading, error: libraryError } = useSelector(
    librarySelectors.library
  );
  const presentBooks = useSelector(librarySelectors.libraryPresent);
  const {
    content: training,
    loading: trainingLoading,
    error: trainingError,
  } = useSelector(trainingSelectors.training);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);

  const closeModal = () => setIsModalOpen(false);

  const addBookToPresentList = ({ id }) =>
    dispatch(relocateBookFromFutureToPresent(id));

  const addBookToFutureList = (id) =>
    dispatch(relocateBookFromPresentToFuture(id));

  const setStartBtn = (bool) => setIsStartBtnVisible(bool);

  const defineTrainingTimes = (times) => {
    const { start, finish } = times;
    const fullStart = `${start} 00:00:00`;
    const fullFinish = `${finish} 23:59:59`;
    setTrainingTimes([fullStart, fullFinish]);
  };

  const checkTraining = () => {
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
    setIsStartBtnVisible(false);
    const presentBooksIds = presentBooks.reduce(
      (acc, { _id }) => [...acc, _id],
      []
    );
    const trainingData = { start, finish, books: [...presentBooksIds] };
    dispatch(addNewTraining(trainingData));
  };

  const activateTrainingCleaning = () => {
    setClearTraining(true);
    setIsModalOpen(true);
  };

  const refuseTrainingCleaning = () => {
    setClearTraining(false);
    setIsModalOpen(false);
  };

  const agreeTrainingCleaning = () => {
    setIsTrainingStarted(false);
    setTrainingTimes([]);
    setClearTraining(false);
    setIsModalOpen(false);
    dispatch(cleanTraining());
  };

  const activateTrainingStart = () => setIsTrainingStarted(true);

  const addResult = (resultData) => {
    const { bookId, date, pages } = resultData;
    const preparedDate = makeFullTime(date);
    const preparedPages = Number(pages);
    dispatch(
      addTrainingResult({ bookId, date: preparedDate, pages: preparedPages })
    );
  };

  useEffect(() => {
    if (libraryError || trainingError || training?.isFinished) {
      setIsModalOpen(true);
      return;
    }
    if (isFirstRender.current) {
      dispatch(checkCurrentTraining());
      isFirstRender.current = false;
    }
  }, [dispatch, libraryError, trainingError]);

  return (
    <main className={styles.main}>
      <div className="container">
        {training ? (
          <ButtonUniversal
            type="button"
            text="Clear training"
            onClick={activateTrainingCleaning}
            btnStyles={styles.clearBtn}
          />
        ) : null}
        {training ? (
          <Countdown
            start={training.start}
            finish={training.finish}
            startTraining={activateTrainingStart}
          />
        ) : null}
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
        {!training ? (
          <TrainingBooks onCloseBtnClick={addBookToFutureList} />
        ) : (
          <ActiveTrainingBooks books={training.books} />
        )}
        {training && isTrainingStarted ? (
          <TrainingResults
            start={training?.start}
            finish={training?.finish}
            onSubmit={addResult}
          />
        ) : null}
      </div>
      {libraryLoading || trainingLoading ? <Spinner /> : null}
      {(libraryError || trainingError) && isModalOpen ? (
        <InfoWindow
          text={libraryError ? libraryError : trainingError}
          onClick={closeModal}
        />
      ) : null}
      {!isTrainingReady &&
      !isTrainingStarted &&
      !trainingError &&
      isModalOpen ? (
        <InfoWindow
          text="Finish date must be after start date"
          onClick={closeModal}
        />
      ) : null}
      {isTrainingReady && !clearTraining && isModalOpen ? (
        <ConfirmWindow
          text="Are you sure? You won't be able to change training conditions!"
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
      {clearTraining && isModalOpen ? (
        <ConfirmWindow
          text="Are you sure? It will be impossible to get things back!"
          onYesClick={agreeTrainingCleaning}
          onCancelClick={refuseTrainingCleaning}
        />
      ) : null}
    </main>
  );
};

export default TrainingPage;
