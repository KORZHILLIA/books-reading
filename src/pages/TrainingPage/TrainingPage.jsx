import MyTraining from "../../modules/MyTraining";
import TrainingBooksSelector from "../../shared/components/TrainingBooksSelector";
import styles from "./trainingPage.module.scss";

const TrainingPage = () => {
  const addBookToList = (book) => console.log(book);
  return (
    <main className={styles.main}>
      <div className="container">
        <MyTraining />
        <TrainingBooksSelector onSubmit={addBookToList} />
      </div>
    </main>
  );
};

export default TrainingPage;
