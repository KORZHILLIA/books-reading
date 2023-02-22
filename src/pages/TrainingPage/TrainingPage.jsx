import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyGoals from "../../modules/MyGoals";
import TrainingInterval from "../../modules/TrainingInterval/TrainingInterval";
import TrainingBooksSelector from "../../shared/components/TrainingBooksSelector";
import TrainingBooks from "../../modules/TrainingBooks";
import ActiveTrainingBooks from "../../modules/ActiveTrainingBooks";
import Countdown from "../../modules/Countdown/Countdown";
import TrainingResults from "../../modules/TrainingResults";
import Chart from "../../shared/components/Chart";
import InfoWindow from "../../shared/components/InfoWindow";
import ConfirmWindow from "../../shared/components/ConfirmWindow";
import FinishedTrainingWindow from "../../modules/FinishedTrainingWindow";
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
  makeTrainingInactive,
} from "../../redux/training/training-operations";
import makeFullTime from "../../helpers/makeFullTime";
import { clearLS } from "../../helpers/LSHandling";
import useBreakpoints from "../../shared/hooks/useBreakpoints";
import styles from "./trainingPage.module.scss";

const TrainingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStartBtnVisible, setIsStartBtnVisible] = useState(false);
  const [trainingTimes, setTrainingTimes] = useState([]);
  const [isTrainingReady, setIsTrainingReady] = useState(false);
  const [clearTraining, setClearTraining] = useState(false);
  const [isTrainingStarted, setIsTrainingStarted] = useState(false);

  const [start, finish] = trainingTimes;

  const presentBooks = useSelector(librarySelectors.libraryPresent);
  const { content: training } = useSelector(trainingSelectors.training);
  const isTrainingActive = training?.isActive;
  const isTrainingFinished = training?.isFinished;

  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const { bigger1280px } = useBreakpoints();

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
    const fullStart = `${start} 00:00:00`;
    const fullFinish = `${finish} 23:59:59`;
    const trainingData = {
      start: fullStart,
      finish: fullFinish,
      books: [...presentBooksIds],
    };
    clearLS("start");
    clearLS("finish");
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

  const activateTrainingStart = () => {
    setIsTrainingReady(true);
    setIsTrainingStarted(true);
  };

  const addResult = (resultData) => {
    const { bookId, date, pages } = resultData;
    const preparedDate = makeFullTime(date);
    const preparedPages = Number(pages);
    dispatch(
      addTrainingResult({ bookId, date: preparedDate, pages: preparedPages })
    );
  };

  const makeInactive = () => {
    closeModal();
    dispatch(makeTrainingInactive());
  };

  useEffect(() => {
    if (isTrainingFinished && isTrainingActive) {
      setIsModalOpen(true);
    }
    if (isTrainingFinished && !isTrainingActive) {
      setIsTrainingReady(true);
      setIsTrainingStarted(true);
    }
    if (isFirstRender.current) {
      dispatch(checkCurrentTraining());
      isFirstRender.current = false;
    }
  }, [dispatch, isTrainingActive, isTrainingFinished]);

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
        <div className={training ? styles.generalFilled : styles.general}>
          <div className={styles.leftPart}>
            {training && !isTrainingFinished ? (
              <Countdown
                start={training.start}
                finish={training.finish}
                startTraining={activateTrainingStart}
              />
            ) : null}
            {!bigger1280px ? (
              <MyGoals
                isTrainingActive={isTrainingActive}
                books={!training ? presentBooks : training.books}
                times={
                  !training ? trainingTimes : [training.start, training.finish]
                }
              />
            ) : null}
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
            {training ? <Chart /> : null}
          </div>
          <div className={styles.rightPart}>
            {bigger1280px ? (
              <MyGoals
                isTrainingActive={isTrainingActive}
                books={!training ? presentBooks : training.books}
                times={
                  !training ? trainingTimes : [training.start, training.finish]
                }
              />
            ) : null}
            {training && (isTrainingStarted || isTrainingFinished) ? (
              <TrainingResults start={training?.start} onSubmit={addResult} />
            ) : null}
          </div>
        </div>
      </div>
      {!isTrainingReady && !isTrainingStarted && isModalOpen ? (
        <InfoWindow
          text="Finish date must be after start date"
          onClick={closeModal}
        />
      ) : null}
      {isTrainingReady &&
      !clearTraining &&
      !isTrainingFinished &&
      isModalOpen ? (
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
      {isTrainingFinished && isTrainingActive && isModalOpen ? (
        <FinishedTrainingWindow
          onNewClick={agreeTrainingCleaning}
          onBackClick={makeInactive}
        />
      ) : null}
    </main>
  );
};

export default TrainingPage;
